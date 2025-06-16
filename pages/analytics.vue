<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <!-- Demo Mode Banner (Portfolio) -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 text-center text-sm">
      <div class="flex items-center justify-center space-x-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>📊 Portfolio Demo - Advanced Analytics Dashboard | Built with Vue 3 + Nuxt 3 + Supabase</span>
        
      </div>
    </div>

    <!-- Access Denied Message for Non-Admins -->
    <div v-if="!isCompanyAdmin" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">Access Restricted</h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Analytics are only available to company administrators.</p>
        <div class="mt-6">
          <NuxtLink
            to="/dashboard"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Analytics Content (Admin Only) -->
    <div v-else>
      <!-- Mobile Sidebar Overlay -->
    <div 
      v-if="sidebarOpen" 
      class="fixed inset-0 z-40 lg:hidden"
      @click="sidebarOpen = false"
    >
      <div class="absolute inset-0 bg-black opacity-50"></div>
    </div>

    <!-- Sidebar -->
    <aside 
      class="fixed inset-y-0 left-0 w-64 lg:w-72 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-r border-gray-200 dark:border-gray-700 shadow-xl z-50 transform transition-transform duration-300 ease-in-out"
      :class="{
        'translate-x-0': sidebarOpen,
        '-translate-x-full lg:translate-x-0': !sidebarOpen
      }"
    >
      <div class="flex flex-col h-full">
        <!-- Logo -->
        <div class="flex items-center justify-center h-20 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary-600 to-blue-500 dark:from-primary-800 dark:to-blue-700 shadow-lg">
          <img src="/task-flow-logo.png" alt="TaskFlow Logo" class="h-10 w-10 rounded-full shadow-lg border-4 border-white dark:border-gray-800 bg-white mr-3" />
          <h1 class="text-3xl font-extrabold text-white">TaskFlow</h1>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
          <!-- Dashboard Link -->
          <NuxtLink
            to="/dashboard"
            class="flex items-center w-full px-4 py-3 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/40 transition font-semibold shadow-sm"
          >
            <svg class="w-5 h-5 mr-3 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6" />
            </svg>
            Dashboard
          </NuxtLink>

          <!-- Analytics Link (Current) -->
          <div class="flex items-center w-full px-4 py-3 text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900 rounded-xl font-semibold shadow-sm">
            <svg class="w-5 h-5 mr-3 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Analytics
          </div>

          <!-- Company Link -->
          <NuxtLink
            to="/company"
            class="flex items-center w-full px-4 py-3 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/40 transition font-semibold shadow-sm"
          >
            <svg class="w-5 h-5 mr-3 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Company
          </NuxtLink>
        </nav>

        <!-- User Profile -->
        <div class="p-6 border-t border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 rounded-t-2xl shadow flex items-center mt-auto">
          <img
            :src="user?.user_metadata?.avatar_url || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(userDisplayName)"
            class="w-10 h-10 rounded-full border-2 border-primary-200 shadow"
            alt="User avatar"
          />
          <div class="ml-4 flex-1">
            <div class="flex items-center space-x-2">
              <p class="text-base font-semibold text-gray-700 dark:text-gray-200">{{ userDisplayName }}</p>
            </div>
            <button
              @click="handleLogout"
              class="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mt-1"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="ml-0 lg:ml-72 transition-all duration-300 ease-in-out">
      <!-- Top Bar -->
      <div class="h-16 lg:h-20 bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700 shadow-lg rounded-b-2xl sticky top-0 z-20 backdrop-blur-lg">
        <!-- Mobile Layout -->
        <div class="lg:hidden px-3 h-full flex items-center">
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center space-x-3 flex-1 min-w-0">
              <button
                @click="sidebarOpen = !sidebarOpen"
                class="p-1.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex-shrink-0"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h2 class="text-sm font-semibold text-gray-800 dark:text-white truncate">Analytics</h2>
            </div>
          </div>
        </div>

        <!-- Desktop Layout -->
        <div class="hidden lg:flex items-center justify-between px-10 h-full">
          <div class="flex items-center space-x-6">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Analytics Dashboard</h2>
          </div>
          
          <!-- Filters -->
          <div class="flex items-center space-x-4">
            <!-- Export PDF Button -->
            <button
              @click="exportAsPDF"
              :disabled="loading"
              class="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 rounded-lg transition-all duration-200 flex items-center shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span v-if="loading">Generating...</span>
              <span v-else>Export Report</span>
              <svg v-if="!loading" class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3" />
              </svg>
            </button>
            
            <select
              v-model="selectedTeam"
              @change="loadAnalytics"
              class="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
            >
              <option value="">All Teams</option>
              <option v-for="team in teams" :key="team.id" :value="team.id">
                {{ team.name }}
              </option>
            </select>
            
            <select
              v-model="dateRange"
              @change="loadAnalytics"
              class="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last year</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Content Area -->
      <div class="p-6 lg:p-10">
        <!-- Loading Overlay -->
        <div v-if="loading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-6 flex items-center space-x-3">
            <svg class="animate-spin h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="text-gray-700 dark:text-gray-200 font-medium">Loading analytics...</span>
          </div>
        </div>

        <!-- Analytics Content -->
        <div v-else class="space-y-6">
          <!-- Suspicious Changes Alert -->
          <div 
            v-if="suspiciousChangesCount > 0" 
            class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
          >
            <div class="flex items-center">
              <svg class="w-5 h-5 text-red-600 dark:text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              <div>
                <h4 class="text-sm font-medium text-red-800 dark:text-red-200">
                  {{ suspiciousChangesCount }} Suspicious Deadline Change{{ suspiciousChangesCount > 1 ? 's' : '' }} Detected
                </h4>
                <p class="text-sm text-red-700 dark:text-red-300 mt-1">
                  Some task deadlines were extended after they were already overdue. Review the audit trail below for details.
                </p>
              </div>
              <button 
                @click="viewSuspiciousChanges"
                class="ml-auto px-3 py-1 text-xs font-medium text-red-800 dark:text-red-200 bg-red-100 dark:bg-red-800 hover:bg-red-200 dark:hover:bg-red-700 rounded-md transition-colors"
              >
                View Suspicious Changes
              </button>
            </div>
          </div>

          <!-- Key Metrics Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Total Tasks -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Tasks</p>
                  <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ dashboardMetrics?.totalTasks || 0 }}</p>
                </div>
              </div>
            </div>

            <!-- Completed Tasks -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Completed</p>
                  <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ dashboardMetrics?.completedTasks || 0 }}</p>
                  <p class="text-xs text-green-600 dark:text-green-400">{{ dashboardMetrics?.completionRate || 0 }}% completion rate</p>
                </div>
              </div>
            </div>

            <!-- Overdue Tasks -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Overdue</p>
                  <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ dashboardMetrics?.overdueTasks || 0 }}</p>
                </div>
              </div>
            </div>

            <!-- Average Completion Time -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Avg. Total Time</p>
                  <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ formatAvgCompletionTime() }}</p>
                  <p class="text-xs text-purple-600 dark:text-purple-400">{{ formatAvgActiveTime() }} active work time</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">From creation to completion</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Charts Row -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Status Distribution -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Task Status Distribution</h3>
              <div class="space-y-3">
                <div v-for="item in statusDistribution" :key="item.status" class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div 
                      class="w-3 h-3 rounded-full mr-3"
                      :class="{
                        'bg-blue-500': item.status === 'todo',
                        'bg-yellow-500': item.status === 'in_progress',
                        'bg-purple-500': item.status === 'review',
                        'bg-green-500': item.status === 'done'
                      }"
                    ></div>
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                      {{ item.status.replace('_', ' ') }}
                    </span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="text-sm text-gray-500 dark:text-gray-400">{{ item.count }}</span>
                    <span class="text-xs text-gray-400 dark:text-gray-500">({{ item.percentage }}%)</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Priority Distribution -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Priority Distribution</h3>
              <div class="space-y-3">
                <div v-for="item in priorityDistribution" :key="item.priority" class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div 
                      class="w-3 h-3 rounded-full mr-3"
                      :class="{
                        'bg-red-500': item.priority === 'high',
                        'bg-yellow-500': item.priority === 'medium',
                        'bg-green-500': item.priority === 'low'
                      }"
                    ></div>
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                      {{ item.priority }}
                    </span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="text-sm text-gray-500 dark:text-gray-400">{{ item.count }}</span>
                    <span class="text-xs text-gray-400 dark:text-gray-500">({{ item.percentage }}%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Team Performance -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">Team Member Performance</h3>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Member
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Total Tasks
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Completed
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Completion Rate
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Avg. Time
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Overdue
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr v-for="member in memberPerformance" :key="member.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900 dark:text-white">{{ member.name }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900 dark:text-white">{{ member.totalTasks }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900 dark:text-white">{{ member.completedTasks }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="text-sm text-gray-900 dark:text-white">{{ member.completionRate }}%</div>
                        <div class="ml-2 w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div 
                            class="bg-green-500 h-2 rounded-full" 
                            :style="{ width: member.completionRate + '%' }"
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900 dark:text-white">{{ formatMemberAvgTime(member) }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span 
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                        :class="member.overdueTasks > 0 ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'"
                      >
                        {{ member.overdueTasks }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

                      <!-- Completion Trends -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">Task Completion Trends</h3>
              <div class="flex items-center space-x-2">
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  Total completed: {{ completionTrends.reduce((sum, day) => sum + day.count, 0) }}
                </span>
                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div class="h-64 relative">
              <!-- SVG Line Chart -->
              <svg class="w-full h-full" viewBox="0 0 400 200" v-if="completionTrends.length > 0">
                <!-- Grid lines -->
                <defs>
                  <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 20" fill="none" stroke="currentColor" stroke-width="0.5" class="text-gray-200 dark:text-gray-600" opacity="0.3"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                <!-- Line path -->
                <path 
                  :d="getLinePath()" 
                  fill="none" 
                  stroke="currentColor" 
                  stroke-width="3" 
                  class="text-primary-500"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                
                <!-- Data points -->
                <circle 
                  v-for="(point, index) in getLinePoints()" 
                  :key="index"
                  :cx="point.x" 
                  :cy="point.y" 
                  r="4" 
                  fill="currentColor" 
                  class="text-primary-600 hover:text-primary-700 cursor-pointer"
                  :title="`${point.date}: ${point.count} tasks completed`"
                />
                
                <!-- Hover areas for better interaction -->
                <rect 
                  v-for="(point, index) in getLinePoints()" 
                  :key="`hover-${index}`"
                  :x="point.x - 10" 
                  :y="0" 
                  width="20" 
                  :height="200" 
                  fill="transparent" 
                  class="cursor-pointer"
                  :title="`${point.date}: ${point.count} tasks completed`"
                />
              </svg>
              
              <!-- Empty state -->
              <div v-else class="flex items-center justify-center h-full text-gray-400 dark:text-gray-500">
                <div class="text-center">
                  <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <p class="text-sm">No completion data available</p>
                </div>
              </div>
            </div>
            
            <!-- Date range labels -->
            <div v-if="completionTrends.length > 0" class="mt-4 flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>{{ formatDateLabel(completionTrends.slice(-14)[0]?.date) }}</span>
              <span class="text-center">Last 14 days</span>
              <span>{{ formatDateLabel(completionTrends.slice(-1)[0]?.date) }}</span>
            </div>
            
            <!-- Legend -->
            <div v-if="completionTrends.length > 0" class="mt-4 flex items-center justify-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <div class="flex items-center">
                <div class="w-3 h-3 bg-primary-500 rounded-full mr-2"></div>
                <span>Tasks completed per day</span>
              </div>
            </div>
          </div>

          <!-- Detailed Task Analytics -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div class="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                <div>
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Recent Completed Tasks</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    Showing {{ recentCompletedTasks.length }} of {{ totalFilteredTasks }} tasks
                  </p>
                </div>
                <div class="flex items-center space-x-3">
                  <!-- Tasks per page selector -->
                  <select
                    v-model="tasksPerPage"
                    @change="currentPage = 1"
                    class="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
                  >
                    <option :value="5">5 per page</option>
                    <option :value="10">10 per page</option>
                    <option :value="20">20 per page</option>
                    <option :value="50">50 per page</option>
                    <option :value="100">100 per page</option>
                  </select>
                  
                  <!-- Filter toggle button -->
                  <button
                    @click="showFilters = !showFilters"
                    class="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors flex items-center"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                    </svg>
                    Filters
                    <span v-if="hasActiveFilters" class="ml-2 px-2 py-0.5 text-xs bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 rounded-full">
                      {{ activeFilterCount }}
                    </span>
                  </button>
                </div>
              </div>
              
              <!-- Filter Panel -->
              <div v-if="showFilters" class="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <!-- Project Filter -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project</label>
                    <select
                      v-model="selectedProject"
                      @change="currentPage = 1"
                      class="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
                    >
                      <option value="">All Projects</option>
                      <option v-for="project in availableProjects" :key="project.id" :value="project.id">
                        {{ project.name }}
                      </option>
                    </select>
                  </div>
                  
                  <!-- Status Filter -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                    <select
                      v-model="selectedStatus"
                      @change="currentPage = 1"
                      class="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
                    >
                      <option value="">All Statuses</option>
                      <option value="done">Completed</option>
                      <option value="todo">To Do</option>
                      <option value="in_progress">In Progress</option>
                      <option value="review">Review</option>
                    </select>
                  </div>
                  
                  <!-- Priority Filter -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
                    <select
                      v-model="selectedPriority"
                      @change="currentPage = 1"
                      class="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
                    >
                      <option value="">All Priorities</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  
                  <!-- Assignee Filter -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Assignee</label>
                    <select
                      v-model="selectedAssignee"
                      @change="currentPage = 1"
                      class="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
                    >
                      <option value="">All Assignees</option>
                      <option value="me">Assigned to me</option>
                      <option value="unassigned">Unassigned</option>
                      <option v-for="member in availableAssignees" :key="member.id" :value="member.id">
                        {{ member.name }}
                      </option>
                    </select>
                  </div>
                </div>
                
                <!-- Clear Filters Button -->
                <div class="flex justify-end">
                  <button
                    @click="clearFilters"
                    class="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Task
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Assignee
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Estimated
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Active Time
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Total Time
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Variance
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Completed
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr v-for="task in recentCompletedTasks" :key="task.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900 dark:text-white">{{ task.title }}</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">{{ task.project_name }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900 dark:text-white">{{ task.assignee_name || 'Unassigned' }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900 dark:text-white">
                        {{ task.estimated_hours ? task.estimated_hours + 'h' : 'N/A' }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900 dark:text-white">
                        {{ task.active_minutes_to_complete ? formatTimeWithMinutes(task.active_minutes_to_complete) : 'N/A' }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900 dark:text-white">
                        {{ task.total_minutes_to_complete ? formatTimeWithMinutes(task.total_minutes_to_complete) : 'N/A' }}
                      </div>
                      <div class="text-xs text-gray-500 dark:text-gray-400">
                        {{ task.minutes_before_start ? `(${formatTimeWithMinutes(task.minutes_before_start)} waiting)` : '' }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span 
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                        :class="getVarianceClass(task)"
                      >
                        {{ formatTaskVariance(task) }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-500 dark:text-gray-400">
                        {{ new Date(task.completed_at).toLocaleDateString() }}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- Pagination Controls -->
            <div v-if="totalPages > 1" class="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
                <div class="text-sm text-gray-700 dark:text-gray-300">
                  Showing {{ ((currentPage - 1) * tasksPerPage) + 1 }} to {{ Math.min(currentPage * tasksPerPage, totalFilteredTasks) }} of {{ totalFilteredTasks }} results
                </div>
                
                <div class="flex items-center space-x-2">
                  <!-- Previous button -->
                  <button
                    @click="currentPage--"
                    :disabled="currentPage === 1"
                    class="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  <!-- Page numbers -->
                  <div class="flex items-center space-x-1">
                    <button
                      v-for="page in visiblePages"
                      :key="page"
                      @click="currentPage = page"
                      :class="[
                        'px-3 py-2 text-sm font-medium rounded-md',
                        page === currentPage
                          ? 'bg-primary-600 text-white'
                          : 'text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                      ]"
                    >
                      {{ page }}
                    </button>
                  </div>
                  
                  <!-- Next button -->
                  <button
                    @click="currentPage++"
                    :disabled="currentPage === totalPages"
                    class="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Deadline Changes Audit Trail -->
          <div class="deadline-changes-audit bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
              <div class="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Deadline Changes Audit</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Showing {{ auditShowingStart }} to {{ auditShowingEnd }} of {{ auditTotalCount }} changes
                  </p>
                </div>
                <div class="flex items-center space-x-3">
                  <!-- Items per page selector -->
                  <select
                    v-model="auditItemsPerPage"
                    @change="fetchDeadlineChanges(1)"
                    class="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
                  >
                    <option :value="5">5 per page</option>
                    <option :value="10">10 per page</option>
                    <option :value="20">20 per page</option>
                    <option :value="50">50 per page</option>
                    <option :value="100">100 per page</option>
                  </select>
                  
                  <!-- Filter selector -->
                  <select
                    v-model="auditFilter"
                    class="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
                  >
                    <option value="all">All Changes</option>
                    <option value="suspicious">Suspicious Changes</option>
                    <option value="recent">Recent Changes</option>
                    <option value="resolved">Resolved Changes</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div v-if="loadingAudit" class="p-6 text-center">
              <div class="flex items-center justify-center space-x-2">
                <svg class="animate-spin h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span class="text-gray-600 dark:text-gray-400">Loading audit data...</span>
              </div>
            </div>
            
            <div v-else-if="filteredDeadlineChanges.length === 0" class="p-6 text-center text-gray-500 dark:text-gray-400">
              No deadline changes found.
            </div>
            
            <div v-else class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Task</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Changed By</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Old Deadline</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">New Deadline</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Changed On</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr 
                    v-for="change in filteredDeadlineChanges" 
                    :key="change.id"
                    :class="{ 'bg-red-50 dark:bg-red-900/20': change.is_suspicious }"
                  >
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div>
                          <div class="text-sm font-medium text-gray-900 dark:text-white">{{ change.task_title }}</div>
                          <div class="text-sm text-gray-500 dark:text-gray-400">{{ change.project_name }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900 dark:text-white">{{ change.changed_by_name || change.changed_by_email }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900 dark:text-white">
                        {{ change.old_due_date ? new Date(change.old_due_date).toLocaleDateString() : 'None' }}
                      </div>
                      <div v-if="change.was_overdue_when_changed" class="text-xs text-red-600 dark:text-red-400">
                        (Was overdue)
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900 dark:text-white">
                        {{ change.new_due_date ? new Date(change.new_due_date).toLocaleDateString() : 'None' }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {{ new Date(change.created_at).toLocaleString() }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span 
                        v-if="change.is_resolved"
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      >
                        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                        Resolved
                      </span>
                      <span 
                        v-else-if="change.is_suspicious"
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      >
                        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                        Suspicious
                      </span>
                      <span 
                        v-else
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                      >
                        Normal
                      </span>
                      <div v-if="change.is_resolved" class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Resolved by {{ change.resolver?.name || change.resolver?.email }}
                        <br>{{ new Date(change.resolved_at).toLocaleString() }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <button
                        v-if="change.is_suspicious && !change.is_resolved"
                        @click="openResolveModal(change)"
                        class="px-3 py-1 text-xs font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 rounded-md transition-colors"
                      >
                        Resolve
                      </button>
                      <span v-else-if="change.is_resolved" class="text-xs text-gray-400">
                        —
                      </span>
                      <span v-else class="text-xs text-gray-400">
                        —
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <!-- Pagination -->
              <div v-if="auditTotalPages > 1" class="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between">
                  <div class="text-sm text-gray-700 dark:text-gray-300">
                    Showing <span class="font-medium">{{ auditShowingStart }}</span> to <span class="font-medium">{{ auditShowingEnd }}</span> of <span class="font-medium">{{ auditTotalCount }}</span> changes
                  </div>
                  <div class="flex items-center space-x-2">
                    <button
                      @click="prevAuditPage"
                      :disabled="auditCurrentPage === 1"
                      class="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    
                    <!-- Page numbers -->
                    <div class="flex items-center space-x-1">
                      <button
                        v-for="page in Math.min(5, auditTotalPages)"
                        :key="page"
                        @click="goToAuditPage(page)"
                        class="px-3 py-1 text-sm border rounded-md"
                        :class="page === auditCurrentPage 
                          ? 'bg-primary-600 text-white border-primary-600' 
                          : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'"
                      >
                        {{ page }}
                      </button>
                      <span v-if="auditTotalPages > 5" class="text-gray-500">...</span>
                    </div>
                    
                    <button
                      @click="nextAuditPage"
                      :disabled="auditCurrentPage === auditTotalPages"
                      class="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Resolve Suspicious Change Modal -->
    <div v-if="showResolveModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-fade-in">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-800 dark:to-indigo-700">
          <h3 class="text-lg font-medium text-white">Resolve Suspicious Change</h3>
          <button @click="closeResolveModal" class="text-white hover:text-gray-200 focus:outline-none">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="p-6">
          <div v-if="selectedChangeToResolve" class="space-y-4">
            <!-- Change Details -->
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 dark:text-white mb-2">Change Details</h4>
              <div class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div><strong>Task:</strong> {{ selectedChangeToResolve.task_title }}</div>
                <div><strong>Project:</strong> {{ selectedChangeToResolve.project_name }}</div>
                <div><strong>Changed by:</strong> {{ selectedChangeToResolve.changed_by_name || selectedChangeToResolve.changed_by_email }}</div>
                <div><strong>Old Due Date:</strong> {{ new Date(selectedChangeToResolve.old_due_date).toLocaleDateString() }}</div>
                <div><strong>New Due Date:</strong> {{ new Date(selectedChangeToResolve.new_due_date).toLocaleDateString() }}</div>
                <div><strong>Changed on:</strong> {{ new Date(selectedChangeToResolve.created_at).toLocaleString() }}</div>
              </div>
            </div>

            <!-- Resolution Comment -->
            <div>
              <label for="resolutionComment" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Resolution Notes (Optional)
              </label>
              <textarea
                id="resolutionComment"
                v-model="resolutionComment"
                rows="3"
                class="w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                placeholder="Add any notes about why this change is acceptable or what action was taken..."
              ></textarea>
              <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                This will help provide context for future reference and audits.
              </p>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              @click="closeResolveModal"
              class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
              :disabled="resolvingChange"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="resolveChange"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center"
              :disabled="resolvingChange"
            >
              <svg v-if="resolvingChange" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              {{ resolvingChange ? 'Resolving...' : 'Mark as Resolved' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    </div> <!-- End of admin-only content -->
  </div> <!-- End of main container -->
</template>

<script setup>
definePageMeta({
  layout: false
})

import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useSupabaseClient, useSupabaseUser } from '#imports'
import { useAnalytics } from '~/composables/useAnalytics'
import { useTeam } from '~/composables/useTeam'

const client = useSupabaseClient()
const user = useSupabaseUser()

const { 
  taskAnalytics,
  loading,
  error,
  fetchTaskAnalytics,
  dashboardMetrics,
  statusDistribution,
  priorityDistribution,
  completionTrends,
  memberPerformance,
  formatTimeWithMinutes
} = useAnalytics()

const { teams, fetchTeams } = useTeam()

// Admin role checking
const isCompanyAdmin = ref(false)
const currentCompany = ref(null)

// Check if user is company admin
const checkAdminStatus = async () => {
  if (!user.value) return false
  
  try {
    const { data: companyMember, error } = await client
      .from('company_members')
      .select('role, company_id, company:companies(*)')
      .eq('user_id', user.value.id)
      .single()

    if (error) {
      console.error('Error checking admin status:', error)
      return false
    }

    if (companyMember) {
      isCompanyAdmin.value = companyMember.role === 'admin'
      currentCompany.value = companyMember.company
      return companyMember.role === 'admin'
    }
    
    return false
  } catch (err) {
    console.error('Error checking admin status:', err)
    return false
  }
}

// Fetch teams that the admin is part of (not all teams)
const fetchAdminTeams = async () => {
  if (!user.value || !currentCompany.value) return
  
  try {
    // Get teams where the user is a member (admin can see teams they're part of)
    const { data: teamMembers, error } = await client
      .from('team_members')
      .select(`
        team_id,
        team:teams(*)
      `)
      .eq('user_id', user.value.id)

    if (error) throw error

    const adminTeams = teamMembers
      .filter(tm => tm.team && tm.team.company_id === currentCompany.value.id)
      .map(tm => tm.team)

    teams.value = adminTeams
  } catch (err) {
    console.error('Error fetching admin teams:', err)
    teams.value = []
  }
}

// Helper functions for time formatting
const formatAvgCompletionTime = () => {
  if (!dashboardMetrics.value?.avgCompletionTime) return '0m'
  const hours = parseFloat(dashboardMetrics.value.avgCompletionTime)
  const minutes = Math.round(hours * 60)
  return formatTimeWithMinutes(minutes)
}

const formatAvgActiveTime = () => {
  if (!dashboardMetrics.value?.avgActiveTime) return '0m'
  const hours = parseFloat(dashboardMetrics.value.avgActiveTime)
  const minutes = Math.round(hours * 60)
  return formatTimeWithMinutes(minutes)
}

const formatMemberAvgTime = (member) => {
  if (!member.avgCompletionTime) return '0m'
  const hours = parseFloat(member.avgCompletionTime)
  const minutes = Math.round(hours * 60)
  return formatTimeWithMinutes(minutes)
}

const formatTaskVariance = (task) => {
  if (!task.estimated_hours || !task.active_minutes_to_complete) return 'N/A'
  
  const estimatedMinutes = task.estimated_hours * 60
  const actualMinutes = task.active_minutes_to_complete
  const varianceMinutes = actualMinutes - estimatedMinutes
  
  if (Math.abs(varianceMinutes) < 1) {
    return 'On target'
  }
  
  if (varianceMinutes > 0) {
    return `+${formatTimeWithMinutes(varianceMinutes)} over`
  } else {
    return `${formatTimeWithMinutes(Math.abs(varianceMinutes))} under`
  }
}

const getVarianceClass = (task) => {
  if (!task.estimated_hours || !task.active_minutes_to_complete) return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  
  const estimatedMinutes = task.estimated_hours * 60
  const actualMinutes = task.active_minutes_to_complete
  const varianceMinutes = actualMinutes - estimatedMinutes
  
  if (Math.abs(varianceMinutes) < 1) {
    return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
  } else if (varianceMinutes > 0) {
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  } else {
    return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  }
}

// Line chart helper functions
const getLinePoints = () => {
  if (!completionTrends.value || completionTrends.value.length === 0) return []
  
  const trends = completionTrends.value.slice(-14) // Last 14 days
  const maxCount = Math.max(...trends.map(t => t.count), 1)
  const width = 400
  const height = 200
  const padding = 20
  
  return trends.map((trend, index) => ({
    x: padding + (index * (width - 2 * padding)) / Math.max(trends.length - 1, 1),
    y: height - padding - ((trend.count / maxCount) * (height - 2 * padding)),
    count: trend.count,
    date: trend.date
  }))
}

const getLinePath = () => {
  const points = getLinePoints()
  if (points.length === 0) return ''
  
  let path = `M ${points[0].x} ${points[0].y}`
  
  for (let i = 1; i < points.length; i++) {
    // Create smooth curves using quadratic bezier curves
    const prevPoint = points[i - 1]
    const currentPoint = points[i]
    const controlX = (prevPoint.x + currentPoint.x) / 2
    
    path += ` Q ${controlX} ${prevPoint.y} ${currentPoint.x} ${currentPoint.y}`
  }
  
  return path
}

const formatDateLabel = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// Computed property for recent completed tasks with filtering and pagination
const filteredCompletedTasks = computed(() => {
  if (!taskAnalytics.value) return []
  
  let filtered = taskAnalytics.value.filter(task => task.is_completed && task.completed_at)
  
  // Apply additional filters
  if (selectedProject.value) {
    filtered = filtered.filter(task => task.project_id === selectedProject.value)
  }
  
  if (selectedStatus.value) {
    filtered = filtered.filter(task => task.status === selectedStatus.value)
  }
  
  if (selectedPriority.value) {
    filtered = filtered.filter(task => task.priority === selectedPriority.value)
  }
  
  if (selectedAssignee.value) {
    if (selectedAssignee.value === 'unassigned') {
      filtered = filtered.filter(task => !task.assignee_id)
    } else if (selectedAssignee.value === 'me') {
      filtered = filtered.filter(task => task.assignee_id === user.value?.id)
    } else {
      filtered = filtered.filter(task => task.assignee_id === selectedAssignee.value)
    }
  }
  
  return filtered.sort((a, b) => new Date(b.completed_at) - new Date(a.completed_at))
})

const recentCompletedTasks = computed(() => {
  const startIndex = (currentPage.value - 1) * tasksPerPage.value
  const endIndex = startIndex + tasksPerPage.value
  return filteredCompletedTasks.value.slice(startIndex, endIndex)
})

const totalPages = computed(() => {
  return Math.ceil(filteredCompletedTasks.value.length / tasksPerPage.value)
})

const totalFilteredTasks = computed(() => {
  return filteredCompletedTasks.value.length
})

// Computed properties for filter options
const availableProjects = computed(() => {
  if (!taskAnalytics.value) return []
  const projects = new Map()
  taskAnalytics.value.forEach(task => {
    if (task.project_name && task.project_id) {
      projects.set(task.project_id, { id: task.project_id, name: task.project_name })
    }
  })
  return Array.from(projects.values()).sort((a, b) => a.name.localeCompare(b.name))
})

const availableAssignees = computed(() => {
  if (!taskAnalytics.value) return []
  const assignees = new Map()
  taskAnalytics.value.forEach(task => {
    if (task.assignee_name && task.assignee_id) {
      assignees.set(task.assignee_id, { id: task.assignee_id, name: task.assignee_name })
    }
  })
  return Array.from(assignees.values()).sort((a, b) => a.name.localeCompare(b.name))
})

// Filter state helpers
const hasActiveFilters = computed(() => {
  return !!(selectedTeam.value || selectedProject.value || selectedStatus.value || selectedPriority.value || selectedAssignee.value)
})

const activeFilterCount = computed(() => {
  let count = 0
  if (selectedTeam.value) count++
  if (selectedProject.value) count++
  if (selectedStatus.value) count++
  if (selectedPriority.value) count++
  if (selectedAssignee.value) count++
  return count
})

// Pagination helpers
const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  const total = totalPages.value
  
  if (total <= maxVisible) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    const current = currentPage.value
    let start = Math.max(1, current - 2)
    let end = Math.min(total, start + maxVisible - 1)
    
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1)
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
  }
  
  return pages
})

// State
const sidebarOpen = ref(false)
const selectedTeam = ref('')
const selectedProject = ref('')
const selectedStatus = ref('')
const selectedPriority = ref('')
const selectedAssignee = ref('')
const dateRange = ref('30')

// Pagination state
const currentPage = ref(1)
const tasksPerPage = ref(5)
const showFilters = ref(false)

// Export state - simplified to PDF only

// Audit trail state
const auditFilter = ref('all')
const deadlineChanges = ref([])
const loadingAudit = ref(false)

// Pagination state for audit
const auditCurrentPage = ref(1)
const auditItemsPerPage = ref(5)
const auditTotalCount = ref(0)

// Resolution state
const showResolveModal = ref(false)
const selectedChangeToResolve = ref(null)
const resolutionComment = ref('')
const resolvingChange = ref(false)

// User profile for display name
const profile = ref(null)

const userDisplayName = computed(() => {
  if (!profile.value) return user.value?.email || ''
  if (profile.value.full_name) return profile.value.full_name
  if (profile.value.first_name || profile.value.last_name) return `${profile.value.first_name || ''} ${profile.value.last_name || ''}`.trim()
  return profile.value.email || user.value?.email || ''
})

// Methods
const handleLogout = async () => {
  await client.auth.signOut()
  navigateTo('/login')
}

// Export functionality - Professional PDF Reports
const exportAsPDF = async () => {
  try {
    // Dynamic import for jsPDF to reduce bundle size
    const jsPDF = (await import('jspdf')).default
    await import('jspdf-autotable')
    
    const doc = new jsPDF()
    
    // Generate professional PDF report
    await generateAnalyticsPDF(doc)
    
    // Download the PDF
    doc.save(`TaskFlow-Analytics-Report-${new Date().toISOString().split('T')[0]}.pdf`)
  } catch (error) {
    console.error('Error generating PDF:', error)
    console.log('Available data for PDF:', {
      dashboardMetrics: dashboardMetrics.value,
      statusDistribution: statusDistribution.value,
      memberPerformance: memberPerformance.value,
      recentTasks: recentCompletedTasks.value?.length
    })
    // Try alternative PDF generation
    await generateComprehensivePDF()
  }
}

const generateAnalyticsPDF = async (doc) => {
  const pageWidth = doc.internal.pageSize.width
  const pageHeight = doc.internal.pageSize.height
  let yPosition = 20

  console.log('Starting PDF generation with data:', {
    metrics: dashboardMetrics.value,
    status: statusDistribution.value,
    team: memberPerformance.value,
    tasks: recentCompletedTasks.value?.length
  })

  // Header with logo and title
  doc.setFillColor(59, 130, 246) // Blue background
  doc.rect(0, 0, pageWidth, 40, 'F')
  
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.text('TaskFlow Analytics Report', 20, 25)
  
  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
  doc.text(currentDate, pageWidth - 20, 25, { align: 'right' })
  
  // Add report period
  doc.setFontSize(10)
  doc.text(`Report Period: Last ${dateRange.value} days${selectedTeam.value ? ` | Team: ${teams.value.find(t => t.id === selectedTeam.value)?.name || 'Selected Team'}` : ''}`, 20, 35)
  
  yPosition = 60
  doc.setTextColor(0, 0, 0)

  // Executive Summary Section
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('Executive Summary', 20, yPosition)
  yPosition += 15

  // Key Metrics Cards
  const metrics = [
    { label: 'Total Tasks', value: dashboardMetrics.value?.totalTasks || 0, color: [59, 130, 246] },
    { label: 'Completed Tasks', value: dashboardMetrics.value?.completedTasks || 0, color: [34, 197, 94] },
    { label: 'Overdue Tasks', value: dashboardMetrics.value?.overdueTasks || 0, color: [239, 68, 68] },
    { label: 'Completion Rate', value: `${dashboardMetrics.value?.completionRate || 0}%`, color: [168, 85, 247] }
  ]

  const cardWidth = (pageWidth - 60) / 4
  metrics.forEach((metric, index) => {
    const x = 20 + (index * (cardWidth + 10))
    
    // Card background
    doc.setFillColor(248, 250, 252)
    doc.roundedRect(x, yPosition, cardWidth, 30, 3, 3, 'F')
    
    // Colored accent
    doc.setFillColor(...metric.color)
    doc.rect(x, yPosition, 3, 30, 'F')
    
    // Metric value
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...metric.color)
    doc.text(metric.value.toString(), x + 8, yPosition + 12)
    
    // Metric label
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(100, 116, 139)
    doc.text(metric.label, x + 8, yPosition + 22)
  })

  yPosition += 50

  // Performance Insights Section
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(0, 0, 0)
  doc.text('Performance Insights', 20, yPosition)
  yPosition += 10

  // Average times
  const avgCompletionTime = formatAvgCompletionTime()
  const avgActiveTime = formatAvgActiveTime()
  
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(`• Average Total Completion Time: ${avgCompletionTime}`, 25, yPosition + 8)
  doc.text(`• Average Active Work Time: ${avgActiveTime}`, 25, yPosition + 16)
  doc.text(`• Suspicious Deadline Changes: ${suspiciousChangesCount.value}`, 25, yPosition + 24)

  yPosition += 40

  // Status Distribution Chart (as text table)
  if (statusDistribution.value?.length > 0) {
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text('Task Status Distribution', 20, yPosition)
    yPosition += 10

    const statusData = statusDistribution.value.map(item => [
      item.status.replace('_', ' ').toUpperCase(),
      item.count.toString(),
      `${item.percentage}%`
    ])

    doc.autoTable({
      startY: yPosition,
      head: [['Status', 'Count', 'Percentage']],
      body: statusData,
      theme: 'grid',
      styles: { fontSize: 9 },
      headStyles: { fillColor: [59, 130, 246], textColor: 255 },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 30, halign: 'center' },
        2: { cellWidth: 30, halign: 'center' }
      },
      margin: { left: 20, right: 20 }
    })

    yPosition = doc.lastAutoTable.finalY + 20
  }

  // Team Performance Section
  if (memberPerformance.value?.length > 0 && yPosition < pageHeight - 80) {
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text('Team Member Performance', 20, yPosition)
    yPosition += 10

    const teamData = memberPerformance.value.slice(0, 10).map(member => [
      member.name,
      member.totalTasks.toString(),
      member.completedTasks.toString(),
      `${member.completionRate}%`,
      formatMemberAvgTime(member),
      member.overdueTasks.toString()
    ])

    doc.autoTable({
      startY: yPosition,
      head: [['Member', 'Total', 'Completed', 'Rate', 'Avg Time', 'Overdue']],
      body: teamData,
      theme: 'grid',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [59, 130, 246], textColor: 255 },
      columnStyles: {
        0: { cellWidth: 35 },
        1: { cellWidth: 20, halign: 'center' },
        2: { cellWidth: 25, halign: 'center' },
        3: { cellWidth: 20, halign: 'center' },
        4: { cellWidth: 25, halign: 'center' },
        5: { cellWidth: 20, halign: 'center' }
      },
      margin: { left: 20, right: 20 }
    })

    yPosition = doc.lastAutoTable.finalY + 20
  }

  // Priority Distribution Chart
  if (priorityDistribution.value?.length > 0 && yPosition < pageHeight - 60) {
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text('Priority Distribution', 20, yPosition)
    yPosition += 10

    const priorityData = priorityDistribution.value.map(item => [
      item.priority.toUpperCase(),
      item.count.toString(),
      `${item.percentage}%`
    ])

    doc.autoTable({
      startY: yPosition,
      head: [['Priority', 'Count', 'Percentage']],
      body: priorityData,
      theme: 'grid',
      styles: { fontSize: 9 },
      headStyles: { fillColor: [168, 85, 247], textColor: 255 },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 30, halign: 'center' },
        2: { cellWidth: 30, halign: 'center' }
      },
      margin: { left: 20, right: 20 }
    })

    yPosition = doc.lastAutoTable.finalY + 20
  }

  // Completion Trends Analysis
  if (completionTrends.value?.length > 0 && yPosition < pageHeight - 60) {
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text('Task Completion Trends (Last 14 Days)', 20, yPosition)
    yPosition += 10

    const trendsData = completionTrends.value.slice(-14).map(trend => [
      new Date(trend.date).toLocaleDateString(),
      trend.count.toString()
    ])

    doc.autoTable({
      startY: yPosition,
      head: [['Date', 'Tasks Completed']],
      body: trendsData,
      theme: 'striped',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [34, 197, 94], textColor: 255 },
      columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 40, halign: 'center' }
      },
      margin: { left: 20, right: 20 }
    })

    yPosition = doc.lastAutoTable.finalY + 20
  }

  // Add new page for detailed task data
  if (recentCompletedTasks.value?.length > 0) {
    doc.addPage()
    yPosition = 20

    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text('Recent Completed Tasks Analysis', 20, yPosition)
    yPosition += 15

    // Add summary stats
    const totalEstimated = recentCompletedTasks.value.reduce((sum, task) => sum + (task.estimated_hours || 0), 0)
    const totalActual = recentCompletedTasks.value.reduce((sum, task) => sum + (task.active_minutes_to_complete ? task.active_minutes_to_complete / 60 : 0), 0)
    const variance = totalActual - totalEstimated
    
    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text(`Total Tasks Analyzed: ${recentCompletedTasks.value.length}`, 25, yPosition)
    doc.text(`Total Estimated Time: ${totalEstimated.toFixed(1)} hours`, 25, yPosition + 8)
    doc.text(`Total Actual Time: ${totalActual.toFixed(1)} hours`, 25, yPosition + 16)
    doc.text(`Overall Variance: ${variance > 0 ? '+' : ''}${variance.toFixed(1)} hours`, 25, yPosition + 24)
    
    yPosition += 40

    const taskData = recentCompletedTasks.value.slice(0, 25).map(task => [
      task.title.length > 25 ? task.title.substring(0, 25) + '...' : task.title,
      task.project_name || 'N/A',
      task.assignee_name || 'Unassigned',
      task.priority?.toUpperCase() || 'N/A',
      task.estimated_hours ? `${task.estimated_hours}h` : 'N/A',
      task.active_minutes_to_complete ? formatTimeWithMinutes(task.active_minutes_to_complete) : 'N/A',
      formatTaskVariance(task),
      task.completed_at ? new Date(task.completed_at).toLocaleDateString() : 'N/A'
    ])

    doc.autoTable({
      startY: yPosition,
      head: [['Task', 'Project', 'Assignee', 'Priority', 'Est.', 'Actual', 'Variance', 'Completed']],
      body: taskData,
      theme: 'striped',
      styles: { fontSize: 6, cellPadding: 1.5 },
      headStyles: { fillColor: [59, 130, 246], textColor: 255 },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 25 },
        2: { cellWidth: 20 },
        3: { cellWidth: 15 },
        4: { cellWidth: 12 },
        5: { cellWidth: 15 },
        6: { cellWidth: 20 },
        7: { cellWidth: 20 }
      },
      margin: { left: 20, right: 20 }
    })
  }

  // Suspicious Activity Analysis (if any)
  if (suspiciousChangesCount.value > 0) {
    const currentY = doc.lastAutoTable ? doc.lastAutoTable.finalY : yPosition
    if (currentY > pageHeight - 100) {
      doc.addPage()
      yPosition = 20
    } else {
      yPosition = currentY + 20
    }

    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(239, 68, 68) // Red color for warnings
    doc.text('⚠️ Suspicious Activity Detected', 20, yPosition)
    
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text(`${suspiciousChangesCount.value} suspicious deadline changes require review.`, 25, yPosition + 10)
    doc.text('These changes were made after tasks were already overdue.', 25, yPosition + 18)
    doc.text('Please review the audit trail in the dashboard for details.', 25, yPosition + 26)
  }

  // Footer
  const pageCount = doc.internal.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(128, 128, 128)
    doc.text(
      `Generated by TaskFlow Analytics | Page ${i} of ${pageCount}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    )
  }
}

const generateComprehensivePDF = async () => {
  // Comprehensive PDF generation using browser's print capabilities
  const printWindow = window.open('', '_blank')
  
  // Generate comprehensive HTML report
  const statusRows = statusDistribution.value?.map(item => 
    `<tr><td>${item.status.replace('_', ' ').toUpperCase()}</td><td>${item.count}</td><td>${item.percentage}%</td></tr>`
  ).join('') || '<tr><td colspan="3">No data available</td></tr>'
  
  const priorityRows = priorityDistribution.value?.map(item => 
    `<tr><td>${item.priority.toUpperCase()}</td><td>${item.count}</td><td>${item.percentage}%</td></tr>`
  ).join('') || '<tr><td colspan="3">No data available</td></tr>'
  
  const teamRows = memberPerformance.value?.slice(0, 10).map(member => 
    `<tr>
      <td>${member.name}</td>
      <td>${member.totalTasks}</td>
      <td>${member.completedTasks}</td>
      <td>${member.completionRate}%</td>
      <td>${formatMemberAvgTime(member)}</td>
      <td>${member.overdueTasks}</td>
    </tr>`
  ).join('') || '<tr><td colspan="6">No team data available</td></tr>'
  
  const taskRows = recentCompletedTasks.value?.slice(0, 15).map(task => 
    `<tr>
      <td>${task.title.length > 30 ? task.title.substring(0, 30) + '...' : task.title}</td>
      <td>${task.project_name || 'N/A'}</td>
      <td>${task.assignee_name || 'Unassigned'}</td>
      <td>${task.priority?.toUpperCase() || 'N/A'}</td>
      <td>${task.estimated_hours ? task.estimated_hours + 'h' : 'N/A'}</td>
      <td>${task.active_minutes_to_complete ? formatTimeWithMinutes(task.active_minutes_to_complete) : 'N/A'}</td>
      <td>${formatTaskVariance(task)}</td>
      <td>${task.completed_at ? new Date(task.completed_at).toLocaleDateString() : 'N/A'}</td>
    </tr>`
  ).join('') || '<tr><td colspan="8">No completed tasks available</td></tr>'
  
  const trendsRows = completionTrends.value?.slice(-10).map(trend => 
    `<tr><td>${new Date(trend.date).toLocaleDateString()}</td><td>${trend.count}</td></tr>`
  ).join('') || '<tr><td colspan="2">No trend data available</td></tr>'

  printWindow.document.write(`
    <html>
      <head>
        <title>TaskFlow Analytics Report</title>
        <style>
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
            .page-break { page-break-before: always; }
          }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            margin: 0; 
            line-height: 1.4; 
            color: #1f2937;
          }
          .header { 
            background: linear-gradient(135deg, #3b82f6, #1d4ed8); 
            color: white; 
            padding: 30px; 
            text-align: center;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
          .header p { margin: 10px 0 0 0; font-size: 14px; opacity: 0.9; }
          .container { padding: 30px; max-width: 1200px; margin: 0 auto; }
          .metrics-grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
            gap: 20px; 
            margin: 30px 0; 
          }
          .metric-card { 
            background: linear-gradient(135deg, #f8fafc, #e2e8f0); 
            padding: 20px; 
            border-radius: 12px; 
            border-left: 5px solid #3b82f6; 
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .metric-value { font-size: 24px; font-weight: 700; color: #1e40af; margin-bottom: 5px; }
          .metric-label { font-size: 14px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
          .section { margin: 40px 0; }
          .section-title { 
            font-size: 20px; 
            font-weight: 700; 
            margin-bottom: 20px; 
            color: #1e293b;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 10px;
          }
          table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 20px 0; 
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
          th { 
            background: linear-gradient(135deg, #3b82f6, #1d4ed8); 
            color: white; 
            padding: 12px 8px; 
            font-weight: 600; 
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          td { 
            border-bottom: 1px solid #e2e8f0; 
            padding: 10px 8px; 
            font-size: 12px;
          }
          tr:hover { background-color: #f8fafc; }
          .insights { 
            background: linear-gradient(135deg, #fef3c7, #fed7aa); 
            padding: 20px; 
            border-radius: 12px; 
            margin: 20px 0;
            border-left: 5px solid #f59e0b;
          }
          .warning { 
            background: linear-gradient(135deg, #fef2f2, #fee2e2); 
            padding: 20px; 
            border-radius: 12px; 
            border-left: 5px solid #ef4444;
            margin: 20px 0;
          }
          .footer { 
            text-align: center; 
            padding: 20px; 
            color: #64748b; 
            font-size: 12px; 
            border-top: 1px solid #e2e8f0;
            margin-top: 40px;
          }
          .print-btn { 
            background: #3b82f6; 
            color: white; 
            padding: 12px 24px; 
            border: none; 
            border-radius: 8px; 
            cursor: pointer; 
            font-size: 14px;
            margin: 20px 0;
          }
          .print-btn:hover { background: #1d4ed8; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>📊 TaskFlow Analytics Report</h1>
          <p>Generated on ${new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
          <p>Report Period: Last ${dateRange.value} days${selectedTeam.value ? ` | Team: ${teams.value.find(t => t.id === selectedTeam.value)?.name || 'Selected Team'}` : ''}</p>
        </div>

        <div class="container">
          <button class="print-btn no-print" onclick="window.print()">🖨️ Print/Save as PDF</button>
          
          <div class="section">
            <h2 class="section-title">📈 Executive Summary</h2>
            <div class="metrics-grid">
              <div class="metric-card">
                <div class="metric-value">${dashboardMetrics.value?.totalTasks || 0}</div>
                <div class="metric-label">Total Tasks</div>
              </div>
              <div class="metric-card">
                <div class="metric-value">${dashboardMetrics.value?.completedTasks || 0}</div>
                <div class="metric-label">Completed Tasks</div>
              </div>
              <div class="metric-card">
                <div class="metric-value">${dashboardMetrics.value?.overdueTasks || 0}</div>
                <div class="metric-label">Overdue Tasks</div>
              </div>
              <div class="metric-card">
                <div class="metric-value">${dashboardMetrics.value?.completionRate || 0}%</div>
                <div class="metric-label">Completion Rate</div>
              </div>
            </div>
            
            <div class="insights">
              <strong>📊 Performance Insights:</strong><br>
              • Average Total Completion Time: ${formatAvgCompletionTime()}<br>
              • Average Active Work Time: ${formatAvgActiveTime()}<br>
              • Tasks Analyzed: ${recentCompletedTasks.value?.length || 0}<br>
              ${suspiciousChangesCount.value > 0 ? `• ⚠️ Suspicious Deadline Changes: ${suspiciousChangesCount.value}` : '• ✅ No suspicious activity detected'}
            </div>
          </div>

          <div class="section">
            <h2 class="section-title">📊 Task Status Distribution</h2>
            <table>
              <thead>
                <tr><th>Status</th><th>Count</th><th>Percentage</th></tr>
              </thead>
              <tbody>${statusRows}</tbody>
            </table>
          </div>

          <div class="section">
            <h2 class="section-title">🎯 Priority Distribution</h2>
            <table>
              <thead>
                <tr><th>Priority</th><th>Count</th><th>Percentage</th></tr>
              </thead>
              <tbody>${priorityRows}</tbody>
            </table>
          </div>

          <div class="section">
            <h2 class="section-title">📈 Completion Trends (Last 10 Days)</h2>
            <table>
              <thead>
                <tr><th>Date</th><th>Tasks Completed</th></tr>
              </thead>
              <tbody>${trendsRows}</tbody>
            </table>
          </div>

          <div class="section page-break">
            <h2 class="section-title">👥 Team Performance Analysis</h2>
            <table>
              <thead>
                <tr><th>Member</th><th>Total</th><th>Completed</th><th>Rate</th><th>Avg Time</th><th>Overdue</th></tr>
              </thead>
              <tbody>${teamRows}</tbody>
            </table>
          </div>

          <div class="section">
            <h2 class="section-title">✅ Recent Completed Tasks</h2>
            <table>
              <thead>
                <tr><th>Task</th><th>Project</th><th>Assignee</th><th>Priority</th><th>Est.</th><th>Actual</th><th>Variance</th><th>Completed</th></tr>
              </thead>
              <tbody>${taskRows}</tbody>
            </table>
          </div>

          ${suspiciousChangesCount.value > 0 ? `
          <div class="section">
            <div class="warning">
              <h3>⚠️ Suspicious Activity Alert</h3>
              <p><strong>${suspiciousChangesCount.value} suspicious deadline changes</strong> were detected in this reporting period.</p>
              <p>These changes were made after tasks were already overdue. Please review the audit trail in the TaskFlow dashboard for detailed analysis and resolution.</p>
            </div>
          </div>
          ` : ''}

          <div class="footer">
            <p>Generated by TaskFlow Analytics Dashboard | ${new Date().toLocaleString()}</p>
            <p>This report contains ${recentCompletedTasks.value?.length || 0} completed tasks and ${memberPerformance.value?.length || 0} team members</p>
          </div>
        </div>
      </body>
    </html>
  `)
  printWindow.document.close()
  
  // Auto-focus and show print dialog
  printWindow.focus()
  setTimeout(() => {
    printWindow.print()
  }, 500)
}



const loadAnalytics = async () => {
  try {
    const filters = {}
    
    if (selectedTeam.value) {
      filters.teamId = selectedTeam.value
    }
    
    // Calculate date range
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - parseInt(dateRange.value))
    
    filters.dateFrom = startDate.toISOString()
    filters.dateTo = endDate.toISOString()
    
    // Fetch both analytics and deadline changes
    await Promise.all([
      fetchTaskAnalytics(filters),
      fetchDeadlineChanges()
    ])
  } catch (err) {
    console.error('Error loading analytics:', err)
  }
}

// Watch for team selection changes and reload analytics
watch(selectedTeam, async (newTeam, oldTeam) => {
  if (newTeam !== oldTeam) {
    // Immediately clear task data to prevent showing old team's data
    taskAnalytics.value = []
    deadlineChanges.value = []
    
    // Clear other filters when team changes
    selectedProject.value = ''
    selectedStatus.value = ''
    selectedPriority.value = ''
    selectedAssignee.value = ''
    currentPage.value = 1
    
    // Reload analytics with new team filter
    await loadAnalytics()
  }
})

// Watch for date range changes and reload analytics
watch(dateRange, async (newRange, oldRange) => {
  if (newRange !== oldRange) {
    await loadAnalytics()
  }
})

// Watch for audit filter changes
watch(auditFilter, async () => {
  // When filter changes, go back to page 1
  if (auditCurrentPage.value !== 1) {
    await fetchDeadlineChanges(1)
  }
})

// Watch for audit items per page changes
watch(auditItemsPerPage, async () => {
  // When items per page changes, go back to page 1
  await fetchDeadlineChanges(1)
})

const clearFilters = () => {
  selectedTeam.value = ''
  selectedProject.value = ''
  selectedStatus.value = ''
  selectedPriority.value = ''
  selectedAssignee.value = ''
  currentPage.value = 1
}

// Computed property for filtered deadline changes
const filteredDeadlineChanges = computed(() => {
  if (!deadlineChanges.value) return []
  
  let filtered = deadlineChanges.value
  
  if (auditFilter.value === 'suspicious') {
    // Only show unresolved suspicious changes
    filtered = filtered.filter(change => change.is_suspicious && !change.is_resolved)
  } else if (auditFilter.value === 'recent') {
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    filtered = filtered.filter(change => new Date(change.created_at) >= sevenDaysAgo)
  } else if (auditFilter.value === 'resolved') {
    // Show only resolved changes
    filtered = filtered.filter(change => change.is_resolved)
  }
  
  return filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
})

// Computed property for suspicious changes count (only unresolved)
const suspiciousChangesCount = computed(() => {
  return deadlineChanges.value.filter(change => change.is_suspicious && !change.is_resolved).length
})

// Computed properties for audit pagination
const auditTotalPages = computed(() => {
  return Math.ceil(auditTotalCount.value / auditItemsPerPage.value)
})

const auditShowingStart = computed(() => {
  return (auditCurrentPage.value - 1) * auditItemsPerPage.value + 1
})

const auditShowingEnd = computed(() => {
  return Math.min(auditCurrentPage.value * auditItemsPerPage.value, auditTotalCount.value)
})

// Functions for audit pagination
const goToAuditPage = (page) => {
  if (page >= 1 && page <= auditTotalPages.value) {
    fetchDeadlineChanges(page)
  }
}

const nextAuditPage = () => {
  if (auditCurrentPage.value < auditTotalPages.value) {
    goToAuditPage(auditCurrentPage.value + 1)
  }
}

const prevAuditPage = () => {
  if (auditCurrentPage.value > 1) {
    goToAuditPage(auditCurrentPage.value - 1)
  }
}

// Function to scroll to audit section and apply suspicious filter
const viewSuspiciousChanges = () => {
  // Apply the suspicious filter
  auditFilter.value = 'suspicious'
  
  // Scroll to the audit section with smooth animation
  nextTick(() => {
    const auditSection = document.querySelector('.deadline-changes-audit')
    if (auditSection) {
      auditSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      })
    }
  })
}

// Resolution functions
const openResolveModal = (change) => {
  selectedChangeToResolve.value = change
  resolutionComment.value = ''
  showResolveModal.value = true
}

const closeResolveModal = () => {
  showResolveModal.value = false
  selectedChangeToResolve.value = null
  resolutionComment.value = ''
}

const resolveChange = async () => {
  if (!selectedChangeToResolve.value) return
  
  try {
    resolvingChange.value = true
    
    const { error } = await client
      .from('task_activities')
      .update({
        is_resolved: true,
        resolved_by: user.value.id,
        resolved_at: new Date().toISOString(),
        resolution_comment: resolutionComment.value.trim() || null
      })
      .eq('id', selectedChangeToResolve.value.id)
    
    if (error) throw error
    
    // Refresh the deadline changes data
    await fetchDeadlineChanges(auditCurrentPage.value)
    
    // Close modal
    closeResolveModal()
    
    // Show success message briefly
    
  } catch (err) {
    console.error('Error resolving change:', err)
    // Handle error - could show error toast
  } finally {
    resolvingChange.value = false
  }
}

// Fetch deadline changes audit data
const fetchDeadlineChanges = async (page = 1) => {
  try {
    loadingAudit.value = true
    
    // Calculate offset for pagination
    const offset = (page - 1) * auditItemsPerPage.value
    
    // First, get the total count for pagination
    const { count, error: countError } = await client
      .from('task_activities')
      .select('*', { count: 'exact', head: true })
      .eq('action', 'due_date_changed')
    
    if (countError) throw countError
    
    auditTotalCount.value = count || 0
    
    // Get the basic task activities for due date changes with pagination
    const { data: activities, error } = await client
      .from('task_activities')
      .select('id, task_id, user_id, action, details, created_at, is_resolved, resolved_by, resolved_at, resolution_comment')
      .eq('action', 'due_date_changed')
      .order('created_at', { ascending: false })
      .range(offset, offset + auditItemsPerPage.value - 1)

    if (error) throw error

    console.log(`Raw task activities (page ${page}):`, activities)

    if (!activities || activities.length === 0) {
      deadlineChanges.value = []
      return
    }

    // Get unique task IDs and user IDs to fetch related data
    const taskIds = [...new Set(activities.map(a => a.task_id))]
    const userIds = [...new Set(activities.map(a => a.user_id))]
    
    // Also include users who resolved changes
    const resolverIds = activities
      .filter(a => a.resolved_by)
      .map(a => a.resolved_by)
    
    const allUserIds = [...new Set([...userIds, ...resolverIds])]

    // Fetch task details
    const { data: tasks, error: tasksError } = await client
      .from('tasks')
      .select('id, title, project_id, project:projects(name)')
      .in('id', taskIds)

    if (tasksError) throw tasksError

    // Fetch user details
    const { data: users, error: usersError } = await client
      .from('profiles')
      .select('id, full_name, first_name, last_name, email')
      .in('id', allUserIds)

    if (usersError) throw usersError

    console.log('Tasks:', tasks)
    console.log('Users:', users)

    // Create lookup maps
    const taskMap = tasks.reduce((acc, task) => {
      acc[task.id] = task
      return acc
    }, {})

    const userMap = users.reduce((acc, user) => {
      acc[user.id] = user
      return acc
    }, {})

    // Apply team filter if selected
    let filteredActivities = activities
    if (selectedTeam.value) {
      // Get project IDs for the selected team
      const { data: teamProjects } = await client
        .from('projects')
        .select('id')
        .eq('team_id', selectedTeam.value)
      
      if (teamProjects && teamProjects.length > 0) {
        const projectIds = teamProjects.map(p => p.id)
        filteredActivities = activities.filter(activity => {
          const task = taskMap[activity.task_id]
          return task && projectIds.includes(task.project_id)
        })
      } else {
        deadlineChanges.value = []
        auditTotalCount.value = 0
        return
      }
    }

    // Process the data to add audit information
    const processedChanges = filteredActivities.map(change => {
      const task = taskMap[change.task_id]
      const user = userMap[change.user_id]
      
      // Get old and new due dates from the details object
      const oldDueDate = change.details?.old_value || change.details?.from_due_date
      const newDueDate = change.details?.new_value || change.details?.to_due_date
      const changeDate = new Date(change.created_at)
      
      // Check if the change was made after the original deadline passed (suspicious)
      let isSuspicious = false
      let wasOverdueWhenChanged = false
      
      if (oldDueDate) {
        const originalDeadline = new Date(oldDueDate)
        wasOverdueWhenChanged = changeDate > originalDeadline
        
        // Consider it suspicious if:
        // 1. The deadline was changed after it was already overdue, AND
        // 2. The new deadline is later than the old one (extending deadline), AND
        // 3. It hasn't been resolved yet
        if (wasOverdueWhenChanged && newDueDate && new Date(newDueDate) > originalDeadline && !change.is_resolved) {
          isSuspicious = true
        }
      }

      // Get resolver information if resolved
      let resolverInfo = null
      if (change.is_resolved && change.resolved_by) {
        const resolver = userMap[change.resolved_by]
        resolverInfo = {
          name: resolver?.full_name || 
                (resolver?.first_name && resolver?.last_name 
                  ? `${resolver.first_name} ${resolver.last_name}` 
                  : null),
          email: resolver?.email
        }
      }
      
      return {
        ...change,
        task_title: task?.title || 'Unknown Task',
        project_name: task?.project?.name || 'Unknown Project',
        changed_by_name: user?.full_name || 
                        (user?.first_name && user?.last_name 
                          ? `${user.first_name} ${user.last_name}` 
                          : null),
        changed_by_email: user?.email,
        old_due_date: oldDueDate,
        new_due_date: newDueDate,
        is_suspicious: isSuspicious,
        was_overdue_when_changed: wasOverdueWhenChanged,
        resolver: resolverInfo
      }
    })

    console.log('Processed changes:', processedChanges)
    deadlineChanges.value = processedChanges
    auditCurrentPage.value = page
  } catch (err) {
    console.error('Error fetching deadline changes:', err)
    deadlineChanges.value = []
    auditTotalCount.value = 0
  } finally {
    loadingAudit.value = false
  }
}

// Load data on mount
onMounted(async () => {
  if (user.value) {
    // Fetch user profile for display name
    const { data, error } = await client
      .from('profiles')
      .select('full_name, first_name, last_name, email')
      .eq('id', user.value.id)
      .single()
    if (!error) profile.value = data

    // First check if user is admin
    const isAdmin = await checkAdminStatus()
    
    if (isAdmin) {
      // Fetch teams that the admin is part of
      await fetchAdminTeams()
      await loadAnalytics()
    }
  }
})



// Watch for user authentication changes
watch(user, async (newUser) => {
  if (newUser) {
    // Fetch user profile for display name
    const { data, error } = await client
      .from('profiles')
      .select('full_name, first_name, last_name, email')
      .eq('id', newUser.id)
      .single()
    if (!error) profile.value = data

    const isAdmin = await checkAdminStatus()
    if (isAdmin) {
      await fetchAdminTeams()
      await loadAnalytics()
    }
  } else {
    // User logged out, reset state
    profile.value = null
    isCompanyAdmin.value = false
    currentCompany.value = null
    teams.value = []
  }
})
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style> 