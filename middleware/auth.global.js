import { defineNuxtRouteMiddleware, useSupabaseUser, navigateTo } from '#imports'

const authMiddleware = defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()
  const publicRoutes = ['/', '/login', '/signup']

  // If user is not logged in and trying to access a protected route
  if (!user.value && !publicRoutes.includes(to.path)) {
    return navigateTo('/login')
  }

  // If user is logged in and trying to access auth pages
  if (user.value && (to.path === '/login' || to.path === '/signup')) {
    return navigateTo('/dashboard')
  }
})

export default authMiddleware 