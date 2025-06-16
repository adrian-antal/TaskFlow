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

    <div class="max-w-lg w-full space-y-8 relative z-10">
      <!-- Logo and Header -->
      <div class="text-center">
        <div class="flex justify-center mb-6">
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-r from-primary-600 to-blue-500 rounded-full blur-lg opacity-75 animate-pulse"></div>
            <img src="/task-flow-logo.png" alt="TaskFlow Logo" class="relative h-16 w-16 rounded-full shadow-2xl border-4 border-white dark:border-gray-800 bg-white" />
          </div>
        </div>
        <h1 class="text-4xl font-extrabold bg-gradient-to-r from-primary-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          TaskFlow
        </h1>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Create your account
        </h2>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?
          <NuxtLink to="/login" class="font-semibold text-primary-600 hover:text-primary-500 transition-colors duration-200">
            Sign in here
          </NuxtLink>
        </p>
      </div>

      <!-- Main Signup Card -->
      <div class="relative">
        <!-- Card Background with Glassmorphism Effect -->
        <div class="absolute inset-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20"></div>
        
        <!-- Card Content -->
        <div class="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 dark:border-gray-700/30 p-8">
          <form class="space-y-6" @submit.prevent="handleSignUp">
            <!-- Personal Information Section -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <svg class="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Personal Information
              </h3>
              
              <!-- Name Fields -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label for="firstName" class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    First Name
                  </label>
                  <div class="relative">
                    <input
                      id="firstName"
                      v-model="form.firstName"
                      name="firstName"
                      type="text"
                      required
                      placeholder="John"
                      class="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700/50 dark:text-white text-sm transition-all duration-200 hover:shadow-md"
                    />
                  </div>
                </div>
                
                <div class="space-y-2">
                  <label for="lastName" class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Last Name
                  </label>
                  <div class="relative">
                    <input
                      id="lastName"
                      v-model="form.lastName"
                      name="lastName"
                      type="text"
                      required
                      placeholder="Doe"
                      class="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700/50 dark:text-white text-sm transition-all duration-200 hover:shadow-md"
                    />
                  </div>
                </div>
              </div>

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
                    v-model="form.email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required
                    placeholder="john@example.com"
                    class="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700/50 dark:text-white text-sm transition-all duration-200 hover:shadow-md"
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
                    v-model="form.password"
                    name="password"
                    type="password"
                    autocomplete="new-password"
                    required
                    placeholder="Create a strong password"
                    class="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700/50 dark:text-white text-sm transition-all duration-200 hover:shadow-md"
                  />
                </div>
              </div>
            </div>

            <!-- Company Information Section -->
            <div class="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <svg class="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Company Information
                </h3>
                <span class="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">Optional</span>
              </div>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Create a new company or join an existing one later
              </p>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label for="companyName" class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Company Name
                  </label>
                  <div class="relative">
                    <input
                      id="companyName"
                      v-model="form.companyName"
                      name="companyName"
                      type="text"
                      placeholder="Acme Corp"
                      class="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700/50 dark:text-white text-sm transition-all duration-200 hover:shadow-md"
                    />
                  </div>
                </div>

                <div class="space-y-2">
                  <label for="companyDomain" class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Company Domain
                  </label>
                  <div class="relative">
                    <input
                      id="companyDomain"
                      v-model="form.companyDomain"
                      name="companyDomain"
                      type="text"
                      placeholder="acme.com"
                      class="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700/50 dark:text-white text-sm transition-all duration-200 hover:shadow-md"
                    />
                  </div>
                </div>
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
                disabled
                class="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg"
              >
                <span v-if="loading" class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
                <span v-else class="flex items-center">
                  <svg class="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Create TaskFlow Account
                </span>
              </button>
            </div>
          </form>

          <!-- Additional Options -->
          <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div class="text-center">
              <p class="text-xs text-gray-500 dark:text-gray-400">
                By creating an account, you agree to our Terms of Service and Privacy Policy
              </p>
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

import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useRouter } from 'vue-router'

const router = useRouter()
const { signUp } = useAuth()

const form = ref({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  companyName: '',
  companyDomain: ''
})

const loading = ref(false)
const error = ref('')

const handleSignUp = async () => {
  try {
    loading.value = true
    error.value = ''

    // Basic validation
    if (!form.value.email.trim()) {
      error.value = 'Email address is required.'
      return
    }
    
    if (!form.value.password) {
      error.value = 'Password is required.'
      return
    }
    
    if (form.value.password.length < 6) {
      error.value = 'Password must be at least 6 characters long.'
      return
    }
    
    if (!form.value.firstName.trim()) {
      error.value = 'First name is required.'
      return
    }
    
    if (!form.value.lastName.trim()) {
      error.value = 'Last name is required.'
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.value.email)) {
      error.value = 'Please enter a valid email address.'
      return
    }

    // Company validation - if one field is filled, both must be filled
    const companyName = form.value.companyName.trim()
    const companyDomain = form.value.companyDomain.trim()
    
    if ((companyName && !companyDomain) || (!companyName && companyDomain)) {
      error.value = 'Please fill in both company name and domain, or leave both empty.'
      return
    }
    
    // Validate company domain format if provided
    if (companyDomain) {
      const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/
      if (!domainRegex.test(companyDomain)) {
        error.value = 'Please enter a valid company domain (e.g., company.com).'
        return
      }
    }

    await signUp(
      form.value.email.trim(),
      form.value.password,
      form.value.firstName.trim(),
      form.value.lastName.trim(),
      companyName || null,
      companyDomain || null
    )

    // Redirect to dashboard
    router.push('/dashboard')
  } catch (err) {
    console.error('Signup error:', err)
    // The error message is already user-friendly from useAuth
    error.value = err.message || 'Failed to create account. Please try again.'
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

/* Smooth transitions for all interactive elements */
input:focus {
  transform: translateY(-1px);
}

button:hover:not(:disabled) {
  box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.3);
}

/* Enhanced focus states */
input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Mobile optimizations */
@media (max-width: 640px) {
  .backdrop-blur-xl {
    backdrop-filter: blur(12px);
  }
}
</style> 