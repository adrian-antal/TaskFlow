import { ref } from 'vue'
import { useSupabaseClient, useSupabaseUser } from '#imports'

// Helper function to translate technical errors into user-friendly messages
const getErrorMessage = (error) => {
  const message = error.message || error.toString()
  
  // Email already exists
  if (message.includes('duplicate key value violates unique constraint "profiles_email_key"') || 
      message.includes('User already registered')) {
    return 'An account with this email address already exists. Please try signing in instead.'
  }
  
  // Company domain already exists
  if (message.includes('duplicate key value violates unique constraint "companies_domain_key"')) {
    return 'A company with this domain already exists. Please contact your administrator or use a different domain.'
  }
  
  // Password too weak
  if (message.includes('Password should be at least')) {
    return 'Password must be at least 6 characters long.'
  }
  
  // Invalid email format
  if (message.includes('Invalid email') || message.includes('invalid email')) {
    return 'Please enter a valid email address.'
  }
  
  // Invalid login credentials
  if (message.includes('Invalid login credentials') || message.includes('invalid credentials')) {
    return 'Incorrect email or password. Please check your credentials and try again.'
  }
  
  // Email not confirmed
  if (message.includes('Email not confirmed')) {
    return 'Please check your email and click the confirmation link before signing in.'
  }
  
  // Network/connection errors
  if (message.includes('Failed to fetch') || message.includes('NetworkError')) {
    return 'Connection error. Please check your internet connection and try again.'
  }
  
  // Rate limiting
  if (message.includes('rate limit') || message.includes('too many requests')) {
    return 'Too many attempts. Please wait a moment before trying again.'
  }
  
  // Database schema errors
  if (message.includes('Could not find') && message.includes('column')) {
    return 'There was a technical issue with your request. Please try again or contact support.'
  }
  
  // Generic database errors
  if (message.includes('violates unique constraint')) {
    return 'This information is already in use. Please try different details.'
  }
  
  // Database connection issues
  if (message.includes('PGRST') || message.includes('schema cache')) {
    return 'Database connection issue. Please try again in a moment.'
  }
  
  // Default fallback for unknown errors
  return 'Something went wrong. Please try again or contact support if the problem persists.'
}

export const useAuth = () => {
  const client = useSupabaseClient()
  const user = useSupabaseUser()
  const loading = ref(false)
  const error = ref(null)

  const signUp = async (email, password, firstName, lastName, companyName = null, companyDomain = null) => {
    try {
      loading.value = true
      error.value = null

      console.log('Signing up with:', { email, firstName, lastName, companyName, companyDomain })

      // Sign up the user
      const { data: authData, error: signUpError } = await client.auth.signUp({
        email,
        password,
      })

      if (signUpError) throw signUpError

      // Create profile
      const { error: profileError } = await client
        .from('profiles')
        .insert({
          id: authData.user.id,
          email: email,
          first_name: firstName,
          last_name: lastName,
          full_name: `${firstName} ${lastName}`
        })

      if (profileError) throw profileError

      // If company details are provided, create company and add user as admin
      if (companyName && companyDomain) {
        // Create company
        const { data: company, error: companyError } = await client
          .from('companies')
          .insert({
            name: companyName,
            domain: companyDomain
          })
          .select()
          .single()

        if (companyError) throw companyError

        // Add user as company admin
        const { error: memberError } = await client
          .from('company_members')
          .insert({
            company_id: company.id,
            user_id: authData.user.id,
            role: 'admin'
          })

        if (memberError) throw memberError
      }

      return authData
    } catch (error) {
      console.error('Error in signUp:', error)
      const friendlyMessage = getErrorMessage(error)
      error.value = friendlyMessage
      // Create a new error with the friendly message
      const friendlyError = new Error(friendlyMessage)
      friendlyError.originalError = error
      throw friendlyError
    } finally {
      loading.value = false
    }
  }

  const signIn = async (email, password) => {
    try {
      loading.value = true
      error.value = null

      const { data, error } = await client.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Fetch user's company and role
      const { data: companyMember, error: memberError } = await client
        .from('company_members')
        .select(`
          *,
          company:company_id (*)
        `)
        .eq('user_id', data.user.id)
        .single()

      if (memberError && memberError.code !== 'PGRST116') {
        console.error('Error fetching company member:', memberError)
        throw memberError
      }

      return { ...data, companyMember }
    } catch (error) {
      console.error('Error in signIn:', error)
      const friendlyMessage = getErrorMessage(error)
      error.value = friendlyMessage
      // Create a new error with the friendly message
      const friendlyError = new Error(friendlyMessage)
      friendlyError.originalError = error
      throw friendlyError
    } finally {
      loading.value = false
    }
  }

  const signOut = async () => {
    try {
      loading.value = true
      error.value = null

      const { error } = await client.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.error('Error in signOut:', error)
      error.value = error.message
      throw error
    } finally {
      loading.value = false
    }
  }

  const isAdmin = async (companyId) => {
    try {
      const { data: member, error: err } = await client
        .from('company_members')
        .select('role')
        .eq('company_id', companyId)
        .eq('user_id', client.auth.user()?.id)
        .single()

      if (err) throw err
      return member?.role === 'admin'
    } catch (err) {
      console.error('Error checking admin status:', err)
      return false
    }
  }

  return {
    loading,
    error,
    signUp,
    signIn,
    signOut,
    isAdmin
  }
} 