import { ref, computed } from 'vue'
import { useSupabaseClient, useSupabaseUser } from '#imports'

export const useCompany = () => {
  const client = useSupabaseClient()
  const user = useSupabaseUser()

  const companies = ref([])
  const currentCompany = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Fetch user's companies
  const fetchCompanies = async () => {
    try {
      loading.value = true
      error.value = null

      const { data, error: err } = await client
        .from('companies')
        .select(`
          *,
          company_members!inner (
            role
          )
        `)
        .eq('company_members.user_id', user.value.id)

      if (err) throw err
      companies.value = data || []
    } catch (err) {
      error.value = err.message
      console.error('Error fetching companies:', err)
    } finally {
      loading.value = false
    }
  }

  // Create a new company
  const createCompany = async (companyData) => {
    try {
      loading.value = true
      error.value = null

      // Start a transaction
      const { data: company, error: companyError } = await client
        .from('companies')
        .insert({
          name: companyData.name,
          domain: companyData.domain,
          logo_url: companyData.logo_url
        })
        .select()
        .single()

      if (companyError) throw companyError

      // Add creator as admin
      const { error: memberError } = await client
        .from('company_members')
        .insert({
          company_id: company.id,
          user_id: user.value.id,
          role: 'admin'
        })

      if (memberError) {
        // If member creation fails, delete the company
        await client
          .from('companies')
          .delete()
          .eq('id', company.id)
        throw memberError
      }

      await fetchCompanies()
      return company
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Add user to company
  const addUserToCompany = async (companyId, email, role = 'member') => {
    try {
      loading.value = true
      error.value = null

      // First, get the user ID from their email
      const { data: userData, error: userError } = await client
        .from('users')
        .select('id')
        .eq('email', email)
        .single()

      if (userError) throw userError

      // Add user to company
      const { error: memberError } = await client
        .from('company_members')
        .insert({
          company_id: companyId,
          user_id: userData.id,
          role
        })

      if (memberError) throw memberError

      return true
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Set current company
  const setCurrentCompany = (company) => {
    currentCompany.value = company
  }

  // Check if user is company admin
  const isCompanyAdmin = computed(() => {
    if (!currentCompany.value) return false
    const membership = currentCompany.value.company_members?.[0]
    return membership?.role === 'admin'
  })

  return {
    companies,
    currentCompany,
    loading,
    error,
    fetchCompanies,
    createCompany,
    addUserToCompany,
    setCurrentCompany,
    isCompanyAdmin
  }
} 