<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-400/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </div>

    <!-- Navigation -->
    <nav class="relative z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/20 dark:border-gray-700/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16 lg:h-20">
          <!-- Logo -->
          <div class="flex items-center">
            <div class="flex items-center space-x-3">
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-r from-primary-600 to-blue-500 rounded-full blur-sm opacity-75"></div>
                <img src="/task-flow-logo.png" alt="TaskFlow Logo" class="relative h-10 w-10 rounded-full shadow-lg border-2 border-white dark:border-gray-800 bg-white" />
              </div>
              <h1 class="text-2xl font-extrabold bg-gradient-to-r from-primary-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                TaskFlow
              </h1>
            </div>
          </div>

          <!-- Navigation Links -->
          <div class="hidden md:flex items-center space-x-8">
            <a href="#features" class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors">
              Features
            </a>
            <a href="#about" class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors">
              About
            </a>
          </div>

          <!-- Auth Buttons -->
          <div class="flex items-center space-x-4">
            <template v-if="user">
              <NuxtLink
                to="/dashboard"
                class="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Dashboard
              </NuxtLink>
            </template>
            <template v-else>
              <NuxtLink
                to="/login"
                class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-4 py-2 text-sm font-medium transition-colors"
              >
                Login
              </NuxtLink>
              <NuxtLink
                to="/signup"
                class="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Get Started
              </NuxtLink>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:grid lg:grid-cols-12 lg:gap-8 items-center min-h-[80vh]">
          <!-- Content -->
          <div class="lg:col-span-6 pt-12 pb-8 lg:pt-24 lg:pb-16">
            <div class="text-center lg:text-left">
              <!-- Badge -->
              <div class="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
                <svg class="w-4 h-4 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Modern Task Management
              </div>

              <!-- Main Heading -->
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
                Organize work,
                <span class="block bg-gradient-to-r from-primary-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  achieve more.
                </span>
              </h1>

              <!-- Description -->
              <p class="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                TaskFlow helps teams organize, track, and manage their work with beautiful interfaces and powerful features. From simple task lists to complex projects, we've got you covered.
              </p>

              <!-- CTA Buttons -->
              <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <NuxtLink
                  to="/signup"
                  class="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Get Started Free
                </NuxtLink>
                <a
                  href="#features"
                  class="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-700 dark:text-primary-300 bg-primary-100 dark:bg-primary-900/50 hover:bg-primary-200 dark:hover:bg-primary-900/70 rounded-xl transition-all duration-200"
                >
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                  Learn More
                </a>
              </div>

              <!-- Social Proof -->
              <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Trusted by teams worldwide</p>
                <div class="flex items-center justify-center lg:justify-start space-x-8 opacity-60">
                  <div class="text-2xl font-bold text-gray-400">Google</div>
                  <div class="text-2xl font-bold text-gray-400">Microsoft</div>
                  <div class="text-2xl font-bold text-gray-400">Slack</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Hero Image -->
          <div class="lg:col-span-6 relative">
            <div class="relative">
              <!-- Background decoration -->
              <div class="absolute -inset-4 bg-gradient-to-r from-primary-400 to-blue-500 rounded-3xl blur-2xl opacity-20"></div>
              
              <!-- Main image -->
              <div class="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-6">
                <img
                  class="w-full h-auto rounded-xl"
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
                  alt="Team collaboration with TaskFlow"
                />
              </div>

              <!-- Floating elements -->
              <div class="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-primary-500 to-blue-500 rounded-2xl shadow-lg flex items-center justify-center animate-bounce">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div id="features" class="py-24 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            Features
          </div>
          <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Everything you need to
            <span class="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
              manage tasks
            </span>
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Powerful features designed to help you and your team stay organized, productive, and focused on what matters most.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Feature 1 -->
          <div class="relative group">
            <div class="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div class="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 hover:transform hover:scale-105 transition-all duration-300">
              <div class="w-12 h-12 bg-gradient-to-r from-primary-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Task Management</h3>
              <p class="text-gray-600 dark:text-gray-300">
                Create, organize, and track tasks with ease. Set priorities, due dates, and assign team members.
              </p>
            </div>
          </div>

          <!-- Feature 2 -->
          <div class="relative group">
            <div class="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div class="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 hover:transform hover:scale-105 transition-all duration-300">
              <div class="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Team Collaboration</h3>
              <p class="text-gray-600 dark:text-gray-300">
                Work together seamlessly with real-time updates, comments, and file sharing.
              </p>
            </div>
          </div>

          <!-- Feature 3 -->
          <div class="relative group">
            <div class="absolute inset-0 bg-gradient-to-r from-green-400/20 to-teal-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div class="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 hover:transform hover:scale-105 transition-all duration-300">
              <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Progress Tracking</h3>
              <p class="text-gray-600 dark:text-gray-300">
                Monitor project progress with intuitive dashboards and detailed analytics.
              </p>
            </div>
          </div>

          <!-- Feature 4 -->
          <div class="relative group">
            <div class="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div class="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 hover:transform hover:scale-105 transition-all duration-300">
              <div class="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Real-time Updates</h3>
              <p class="text-gray-600 dark:text-gray-300">
                Stay in sync with instant notifications and live updates across all devices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="relative py-24">
      <div class="absolute inset-0 bg-gradient-to-r from-primary-600 to-blue-600"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Ready to transform your workflow?
          </h2>
          <p class="text-xl text-primary-100 mb-8">
            Join thousands of teams already using TaskFlow to organize their work and achieve more together.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              to="/signup"
              class="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-600 bg-white hover:bg-gray-50 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Start Free Today
            </NuxtLink>
            <a
              href="#features"
              class="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 hover:border-white/50 rounded-xl transition-all duration-200"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Use a minimal layout for the homepage to avoid double navigation
definePageMeta({
  layout: false
})

const user = useSupabaseUser()
</script>

<style scoped>
/* Custom animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}

/* Glassmorphism enhancement */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

.backdrop-blur-lg {
  backdrop-filter: blur(16px);
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}
</style> 