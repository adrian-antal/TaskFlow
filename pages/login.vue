<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden py-12">


    <!-- Simple Logo Header -->
    <div class="absolute top-6 left-6 z-50">
      <NuxtLink to="/" class="flex items-center space-x-3 group">
        <div class="relative">
          <div class="absolute inset-0 bg-gradient-to-r from-primary-600 to-blue-500 rounded-full blur-sm opacity-75 group-hover:opacity-100 transition-opacity"></div>
          <img src="/task-flow-logo.png" alt="TaskFlow Logo" class="relative h-10 w-10 rounded-full shadow-lg border-2 border-white dark:border-gray-800 bg-white" />
        </div>
        <h1 class="text-xl font-extrabold bg-gradient-to-r from-primary-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-primary-700 group-hover:via-blue-700 group-hover:to-indigo-700 transition-all">
          TaskFlow
        </h1>
      </NuxtLink>
    </div>

    <div class="flex items-center justify-center px-4 sm:px-6 lg:px-8 min-h-screen">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-primary-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>

    <!-- Floating Geometric Shapes -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-20 left-20 w-4 h-4 bg-primary-400/30 rounded-full animate-float"></div>
      <div class="absolute top-40 right-32 w-6 h-6 bg-blue-400/30 rotate-45 animate-float-delayed"></div>
      <div class="absolute bottom-32 left-32 w-3 h-3 bg-indigo-400/30 rounded-full animate-float"></div>
      <div class="absolute bottom-20 right-20 w-5 h-5 bg-purple-400/30 rotate-45 animate-float-delayed"></div>
    </div>

    <div class="max-w-lg w-full space-y-10 relative z-10">
      <!-- Logo and Header -->
      <div class="text-center">
        <div class="flex justify-center mb-8">
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-r from-primary-600 to-blue-500 rounded-full blur-lg opacity-75 animate-pulse"></div>
            <img src="/task-flow-logo.png" alt="TaskFlow Logo" class="relative h-16 w-16 rounded-full shadow-2xl border-4 border-white dark:border-gray-800 bg-white" />
          </div>
        </div>
        <h1 class="text-4xl font-extrabold bg-gradient-to-r from-primary-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          TaskFlow
        </h1>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back
        </h2>
        
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?
            <NuxtLink to="/signup" class="font-semibold text-primary-600 hover:text-primary-500 transition-colors duration-200">
              Sign up here
            </NuxtLink>
          </p>
       
      </div>

      <!-- Main Login Card -->
      <div class="relative">
        <!-- Card Background with Glassmorphism Effect -->
        <div class="absolute inset-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20"></div>
        
        <!-- Card Content -->
        <div class="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 dark:border-gray-700/30 p-8">
          <form class="space-y-6" @submit.prevent="handleLogin">
            <!-- Email Field -->
            <div class="space-y-2">
              <label for="email" class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  id="email"
                  v-model="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  placeholder="Enter your email"
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700/50 dark:text-white text-sm transition-all duration-200 hover:shadow-md"
                  :class="{ 'border-red-500 focus:ring-red-500': error }"
                />
              </div>
            </div>

            <!-- Password Field -->
            <div class="space-y-2">
              <label for="password" class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  v-model="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  placeholder="Enter your password"
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700/50 dark:text-white text-sm transition-all duration-200 hover:shadow-md"
                  :class="{ 'border-red-500 focus:ring-red-500': error }"
                />
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="relative">
              <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                <div class="flex items-center">
                  <svg class="h-5 w-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p class="text-sm text-red-600 dark:text-red-400 font-medium">{{ error }}</p>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="pt-2">
              <button
                type="submit"
                :disabled="loading"
                class="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg"
              >
                <span v-if="loading" class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
                <span v-else class="flex items-center">
                  <svg class="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Sign in to TaskFlow
                </span>
              </button>
            </div>
          </form>

          <!-- Demo Login Options -->
          <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div class="space-y-4">
              <div class="text-center">
                <p class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  🎭 Portfolio Demo - Try Different Roles
                </p>
              </div>
              
              <div class="grid grid-cols-1 gap-3">
                <!-- Admin Demo Button -->
                <button
                  @click="loginAsDemo('admin')"
                  :disabled="loading"
                  class="group relative w-full flex items-center justify-center py-2.5 px-4 border-2 border-emerald-200 dark:border-emerald-800 rounded-xl text-sm font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span class="flex-1">Demo as Admin</span>
                  <span class="text-xs bg-emerald-200 dark:bg-emerald-800 px-2 py-0.5 rounded-full">
                    Full Access
                  </span>
                </button>

                <!-- Member Demo Button -->
                <button
                  @click="loginAsDemo('member')"
                  :disabled="loading"
                  class="group relative w-full flex items-center justify-center py-2.5 px-4 border-2 border-blue-200 dark:border-blue-800 rounded-xl text-sm font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span class="flex-1">Demo as Member</span>
                  <span class="text-xs bg-blue-200 dark:bg-blue-800 px-2 py-0.5 rounded-full">
                    Limited Access
                  </span>
                </button>
              </div>

              <div class="text-center pt-2">
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  🚀 Experience different permission levels instantly
                </p>
              </div>
            </div>
            
            <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div class="text-center">
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Secure login powered by Supabase
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="text-center">
        <p class="text-xs text-gray-500 dark:text-gray-400">
          © 2024 TaskFlow. Built with ❤️ for productivity.
        </p>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>

definePageMeta({
  layout: false
})

import { ref, onMounted, watchEffect } from 'vue'
import { useSupabaseClient, useSupabaseUser, useRouter } from '#imports'

const client = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

onMounted(() => {
  if (user.value) {
    router.push('/dashboard')
  }
})

const handleLogin = async () => {
  try {
    loading.value = true
    error.value = ''
    
    const { error: signInError } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if (signInError) throw signInError
    
    router.push('/dashboard')
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

// Demo login functionality
const loginAsDemo = async (role) => {
  try {
    loading.value = true
    error.value = ''
    
    // Demo credentials
    const demoCredentials = {
      admin: {
        email: 'adrianantal1@yahoo.com',
        password: 'deltora1'
      },
      member: {
        email: 'harjinder_sokhi@hotmail.com', 
        password: 'tinkerbell1'
      }
    }
    
    const credentials = demoCredentials[role]
    
    if (!credentials) {
      throw new Error('Invalid demo role')
    }
    
    // Auto-fill the form fields for visual feedback
    email.value = credentials.email
    password.value = credentials.password
    
    // Wait a moment for visual feedback
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const { error: signInError } = await client.auth.signInWithPassword(credentials)

    if (signInError) throw signInError
    
    // Navigate based on role
    if (role === 'admin') {
      router.push('/analytics') // Direct to analytics for admin demo
    } else {
      router.push('/dashboard') // Regular dashboard for member
    }
  } catch (e) {
    error.value = e.message || 'Demo login failed. Please try the manual login.'
    // Clear the demo credentials on error
    email.value = ''
    password.value = ''
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Custom animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes float-delayed {
  0%, 100% {
    transform: translateY(0px) rotate(45deg);
  }
  50% {
    transform: translateY(-15px) rotate(45deg);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
}

/* Glassmorphism effect enhancement */
.backdrop-blur-xl {
  backdrop-filter: blur(16px);
}

.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}


input:focus {
  transform: translateY(-1px);
}

button:hover:not(:disabled) {
  box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.3);
}


input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}


@media (max-width: 640px) {
  .backdrop-blur-xl {
    backdrop-filter: blur(12px);
  }
}
</style> 