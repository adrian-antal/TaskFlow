import { defineNuxtRouteMiddleware, useSupabaseClient, useSupabaseUser, navigateTo } from '#imports'

export default defineNuxtRouteMiddleware(async (to) => {
  const client = useSupabaseClient()
  const user = useSupabaseUser()

  if (!user.value) {
    return navigateTo('/login')
  }

  // Get company ID from route params or query
  const companyId = to.params.companyId || to.query.companyId

  if (!companyId) {
    return navigateTo('/dashboard')
  }

  try {
    // Check if user is admin of the company
    const { data: member, error } = await client
      .from('company_members')
      .select('role')
      .eq('company_id', companyId)
      .eq('user_id', user.value.id)
      .single()

    if (error || member?.role !== 'admin') {
      console.error('Access denied: User is not an admin')
      return navigateTo('/dashboard')
    }
  } catch (err) {
    console.error('Error checking admin status:', err)
    return navigateTo('/dashboard')
  }
}) 