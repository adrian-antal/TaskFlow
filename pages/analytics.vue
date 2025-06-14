<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
            :src="user?.user_metadata?.avatar_url || 'https://ui-avatars.com/api/?name=' + user?.email"
            class="w-10 h-10 rounded-full border-2 border-primary-200 shadow"
            alt="User avatar"
          />
          <div class="ml-4 flex-1">
            <div class="flex items-center space-x-2">
              <p class="text-base font-semibold text-gray-700 dark:text-gray-200">{{ user?.email }}</p>
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
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Task Completion Trends</h3>
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
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})

import { ref, computed, onMounted, watch } from 'vue'
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

const { teams, fetchTeams, currentCompany } = useTeam()

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
const tasksPerPage = ref(20)
const showFilters = ref(false)

// Methods
const handleLogout = async () => {
  await client.auth.signOut()
  navigateTo('/login')
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
    
    await fetchTaskAnalytics(filters)
  } catch (err) {
    console.error('Error loading analytics:', err)
  }
}

// Watch for team selection changes and reload analytics
watch(selectedTeam, async (newTeam, oldTeam) => {
  if (newTeam !== oldTeam) {
    // Immediately clear task data to prevent showing old team's data
    taskAnalytics.value = []
    
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

const clearFilters = () => {
  selectedTeam.value = ''
  selectedProject.value = ''
  selectedStatus.value = ''
  selectedPriority.value = ''
  selectedAssignee.value = ''
  currentPage.value = 1
}

// Load data on mount
onMounted(async () => {
  if (user.value) {
    // First fetch company data, then teams
    const { data: companyMembers } = await client
      .from('company_members')
      .select('company_id')
      .eq('user_id', user.value.id)
      .single()
    
    if (companyMembers?.company_id) {
      await fetchTeams(companyMembers.company_id)
    }
    await loadAnalytics()
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
</style> 