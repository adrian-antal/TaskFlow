<template>
  <div class="min-h-screen">
    <nav class="bg-white dark:bg-gray-800 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <img src="/task-flow-logo.png" alt="TaskFlow Logo" class="h-8 w-8 mr-2" />
              <h1 class="text-2xl font-bold text-primary-600 dark:text-primary-400">TaskFlow</h1>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <button
              @click="toggleColorMode"
              class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <span v-if="colorMode?.value === 'dark'" class="text-yellow-400">🌞</span>
              <span v-else class="text-gray-600">🌙</span>
            </button>
            
            <template v-if="user">
              <button
                @click="handleLogout"
                class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Logout
              </button>
            </template>
            <template v-else>
              <NuxtLink
                to="/login"
                class="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
              >
                Login
              </NuxtLink>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { useColorMode } from '#imports'
import { useSupabaseClient, useSupabaseUser } from '#imports'

const colorMode = useColorMode()
const user = useSupabaseUser()
const client = useSupabaseClient()

const toggleColorMode = () => {
  if (colorMode) {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
}

const handleLogout = async () => {
  await client.auth.signOut()
  navigateTo('/login')
}
</script> 