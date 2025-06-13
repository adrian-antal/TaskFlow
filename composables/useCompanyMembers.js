import { ref } from 'vue'
import { useSupabaseClient } from '#imports'

export const useCompanyMembers = () => {
  const client = useSupabaseClient()
  const loading = ref(false)
  const error = ref(null)
  const members = ref([])

  const fetchMembers = async (companyId) => {
    try {
      loading.value = true
      error.value = null

      const { data, error: fetchError } = await client
        .from('company_members')
        .select(`
          *,
          user:user_id (
            id,
            email,
            user_metadata
          )
        `)
        .eq('company_id', companyId)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      members.value = data
    } catch (err) {
      console.error('Error fetching company members:', err)
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const addMember = async (companyId, email, role = 'member') => {
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

      // Refresh members list
      await fetchMembers(companyId)
    } catch (err) {
      console.error('Error adding company member:', err)
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateMemberRole = async (companyId, userId, newRole) => {
    try {
      loading.value = true
      error.value = null

      const { error: updateError } = await client
        .from('company_members')
        .update({ role: newRole })
        .eq('company_id', companyId)
        .eq('user_id', userId)

      if (updateError) throw updateError

      // Refresh members list
      await fetchMembers(companyId)
    } catch (err) {
      console.error('Error updating member role:', err)
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const removeMember = async (companyId, userId) => {
    try {
      loading.value = true
      error.value = null

      const { error: removeError } = await client
        .from('company_members')
        .delete()
        .eq('company_id', companyId)
        .eq('user_id', userId)

      if (removeError) throw removeError

      // Refresh members list
      await fetchMembers(companyId)
    } catch (err) {
      console.error('Error removing company member:', err)
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const isAdmin = async (companyId, userId) => {
    try {
      const { data: member, error: err } = await client
        .from('company_members')
        .select('role')
        .eq('company_id', companyId)
        .eq('user_id', userId)
        .single()

      if (err) throw err
      return member?.role === 'admin'
    } catch (err) {
      console.error('Error checking admin status:', err)
      return false
    }
  }

  return {
    members,
    loading,
    error,
    fetchMembers,
    addMember,
    updateMemberRole,
    removeMember,
    isAdmin
  }
} 