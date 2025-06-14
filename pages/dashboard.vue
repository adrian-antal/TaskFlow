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

        <!-- Company Info -->
        <div v-if="currentCompany" class="p-6 border-b border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 rounded-b-2xl shadow">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-white">
            {{ currentCompany.name }}
          </h2>
          <p class="text-sm text-gray-600 dark:text-gray-400 flex items-center mt-1">
            <svg class="w-4 h-4 mr-1 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm-4 4v4m0 0H8m4 0h4" /></svg>
            {{ currentCompany.domain }}
          </p>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
          <!-- Analytics Link -->
          <NuxtLink
            to="/analytics"
            class="flex items-center w-full px-4 py-3 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/40 transition font-semibold shadow-sm"
          >
            <svg class="w-5 h-5 mr-3 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Analytics
          </NuxtLink>

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

          <!-- Teams Section -->
          <div>
            <div class="flex justify-between items-center mb-2">
              <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Teams</h3>
              <div class="flex space-x-2">
                <button
                  v-if="isCompanyAdmin"
                  class="text-blue-600 hover:text-blue-800"
                  @click="showNewTeamModal = true"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
                <button
                  v-if="currentTeam && isTeamAdmin"
                  class="text-blue-600 hover:text-blue-800"
                  @click="showInviteTeamMemberModal = true"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </button>
              </div>
            </div>
            <div v-if="teamsLoading" class="text-sm text-gray-500 dark:text-gray-400 px-4">Loading teams...</div>
            <div v-else-if="teams.length === 0" class="text-sm text-gray-500 dark:text-gray-400 px-4">No teams yet</div>
            <div v-else class="space-y-1">
              <button
                v-for="team in teams"
                :key="team.id"
                class="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/40 transition font-semibold shadow-sm"
                :class="{ 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400': currentTeam?.id === team.id }"
                @click="setCurrentTeam(team.id)"
              >
                <svg class="w-5 h-5 mr-3 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {{ team.name }}
              </button>
            </div>
          </div>

          <!-- Projects Section -->
          <div class="mt-6">
            <h3 class="px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Projects</h3>
            <div v-if="projectsLoading" class="text-sm text-gray-500 dark:text-gray-400 px-4">Loading projects...</div>
            <div v-else class="space-y-1">
              <button
                v-for="project in projects"
                :key="project.id"
                class="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/40 transition font-semibold shadow-sm"
                :class="{ 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400': currentProject?.id === project.id }"
                @click="setCurrentProject(project)"
              >
                <span class="w-2 h-2 mr-3 rounded-full" :style="{ backgroundColor: project.color }"></span>
                {{ project.name }}
              </button>
              <button
                class="flex items-center w-full px-4 py-2 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition font-semibold shadow-sm"
                @click="showNewProjectModal = true"
              >
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                New Project
              </button>
            </div>
          </div>
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
            <p class="text-base font-semibold text-gray-700 dark:text-gray-200">{{ userDisplayName }}</p>
              <span v-if="isCompanyAdmin" class="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Admin</span>
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
          <!-- Single row with proper alignment -->
          <div class="flex items-center justify-between w-full">
            <!-- Left side: Hamburger + Title -->
            <div class="flex items-center space-x-3 flex-1 min-w-0">
              <button
                @click="sidebarOpen = !sidebarOpen"
                class="p-1.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex-shrink-0"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h2 class="text-sm font-semibold text-gray-800 dark:text-white truncate">
                {{ selectedProject ? projects.find(p => p.id === selectedProject)?.name : 'All Tasks' }}
              </h2>
            </div>

            <!-- Center: View buttons -->
            <div class="flex items-center space-x-0.5 mx-2">
              <button
                v-for="view in views"
                :key="view.id"
                class="px-2 py-1 text-xs rounded-md font-medium whitespace-nowrap"
                :class="currentView === view.id ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'"
                @click="currentView = view.id"
              >
                {{ view.name }}
              </button>
            </div>

            <!-- Right side: New Task button -->
            <button
              class="p-2 text-white bg-primary-600 rounded-lg shadow hover:bg-primary-700 transition flex-shrink-0"
              @click="showNewTaskModal = true"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Desktop Layout -->
        <div class="hidden lg:flex items-center justify-between px-10 h-full">
        <div class="flex items-center space-x-6">
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white">
            {{ selectedProject ? projects.find(p => p.id === selectedProject)?.name : 'All Tasks' }}
          </h2>
          <div class="flex items-center space-x-2">
            <button
              v-for="view in views"
              :key="view.id"
              class="px-4 py-2 text-base rounded-xl font-semibold shadow-sm"
              :class="currentView === view.id ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'"
              @click="currentView = view.id"
            >
              {{ view.name }}
            </button>
          </div>
        </div>

          <button
            class="px-6 py-3 text-base font-bold text-white bg-primary-600 rounded-xl shadow hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition"
            @click="showNewTaskModal = true"
          >
            <svg class="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            New Task
          </button>
        </div>
      </div>

      <!-- Content Area -->
      <div class="p-4 lg:p-10">
        <!-- Calendar View -->
        <div v-if="currentView === 'calendar'" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div class="p-4 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">Calendar</h3>
              <div class="flex items-center space-x-2">
                <button
                  @click="currentMonth--"
                  class="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {{ currentMonthName }} {{ currentYear }}
                </span>
                <button
                  @click="currentMonth++"
                  class="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="p-4">
            <!-- Calendar Grid -->
            <div class="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700">
              <!-- Weekday Headers -->
              <div
                v-for="day in weekDays"
                :key="day"
                class="bg-white dark:bg-gray-800 p-2 lg:p-2 text-center text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {{ day }}
              </div>
              <!-- Calendar Days -->
              <div
                v-for="day in calendarDays"
                :key="day.date"
                class="bg-white dark:bg-gray-800 p-1 lg:p-2 min-h-[80px] lg:min-h-[100px]"
                :class="{ 'bg-gray-50 dark:bg-gray-700': !day.isCurrentMonth }"
              >
                <div class="flex items-center justify-between mb-1">
                  <span
                    class="text-xs lg:text-sm"
                    :class="{
                      'text-gray-400 dark:text-gray-500': !day.isCurrentMonth,
                      'text-gray-900 dark:text-white': day.isCurrentMonth,
                      'font-bold text-primary-600 dark:text-primary-400': day.isToday
                    }"
                  >
                    {{ day.dayNumber }}
                  </span>
                  <button
                    v-if="day.isCurrentMonth"
                    @click="showNewTaskModal = true; newTask.dueDate = day.date"
                    class="p-1 lg:p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 touch-manipulation"
                  >
                    <svg class="w-3 h-3 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
                <!-- Tasks for this day -->
                <div class="space-y-1">
                  <div
                    v-for="task in getTasksForDate(day.date).slice(0, 2)"
                    :key="task.id"
                    class="p-1 text-2xs lg:text-xs rounded truncate cursor-pointer touch-manipulation"
                    :class="{
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200': task.priority === 'high',
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200': task.priority === 'medium',
                      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': task.priority === 'low'
                    }"
                    @click="selectedTask = task"
                  >
                    {{ task.title }}
                  </div>
                  <div 
                    v-if="getTasksForDate(day.date).length > 2" 
                    class="text-2xs lg:text-xs text-gray-500 dark:text-gray-400 cursor-pointer"
                    @click="showDayTasks(day.date)"
                  >
                    +{{ getTasksForDate(day.date).length - 2 }} more
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Board View -->
        <div v-else-if="currentView === 'board'">
          <!-- Board Filters -->
          <div class="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <div class="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
              <div class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Board View</h3>
                </div>
                <!-- Quick Filter Buttons -->
                <div class="flex items-center space-x-2">
                  <button
                    @click="setQuickFilter('all')"
                    class="px-2 lg:px-3 py-1 text-xs lg:text-sm rounded-md transition-colors"
                    :class="quickFilter === 'all' ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'"
                  >
                    All
                  </button>
                  <button
                    @click="setQuickFilter('me')"
                    class="px-2 lg:px-3 py-1 text-xs lg:text-sm rounded-md transition-colors"
                    :class="quickFilter === 'me' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'"
                  >
                    Mine
                  </button>
                  <button
                    @click="setQuickFilter('unassigned')"
                    class="px-2 lg:px-3 py-1 text-xs lg:text-sm rounded-md transition-colors"
                    :class="quickFilter === 'unassigned' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'"
                  >
                    Unassigned
                  </button>
                </div>
              </div>
              
              <!-- Mobile Filter Toggle -->
              <div class="flex lg:hidden justify-end">
                <button
                  @click="showMobileBoardFilters = !showMobileBoardFilters"
                  class="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors flex items-center"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                  </svg>
                  Filters
                </button>
              </div>
              
              <!-- Desktop Filters -->
              <div class="hidden lg:flex lg:items-center lg:space-x-4">
                <!-- Filter by Assignee -->
                <select
                  v-model="boardViewFilters.assignee"
                  class="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-xs lg:text-sm"
                >
                  <option value="">All Assignees</option>
                  <option value="unassigned">Unassigned</option>
                  <option value="me">Assigned to me</option>
                  <option 
                    v-for="member in teamMembers" 
                    :key="member.id" 
                    :value="member.id"
                  >
                    {{ member.full_name || (member.first_name || '') + ' ' + (member.last_name || '') || member.email }}
                  </option>
                </select>

                <!-- Filter by Priority -->
                <select
                  v-model="boardViewFilters.priority"
                  class="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-xs lg:text-sm"
                >
                  <option value="">All Priorities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
            
            <!-- Mobile Filter Panel -->
            <div v-if="showMobileBoardFilters" class="lg:hidden mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-3">
              <div class="grid grid-cols-1 gap-3">
                <!-- Filter by Assignee -->
                <select
                  v-model="boardViewFilters.assignee"
                  class="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
                >
                  <option value="">All Assignees</option>
                  <option value="unassigned">Unassigned</option>
                  <option value="me">Assigned to me</option>
                  <option 
                    v-for="member in teamMembers" 
                    :key="member.id" 
                    :value="member.id"
                  >
                    {{ member.full_name || (member.first_name || '') + ' ' + (member.last_name || '') || member.email }}
                  </option>
                </select>

                <!-- Filter by Priority -->
                <select
                  v-model="boardViewFilters.priority"
                  class="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
                >
                  <option value="">All Priorities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Board Columns -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          <div
            v-for="status in taskStatuses"
            :key="status.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-sm flex flex-col"
            @dragover.prevent
            @drop.prevent="handleDrop($event, status.id)"
          >
            <div class="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-sm font-medium text-gray-700 dark:text-gray-200">
                {{ status.name }}
                <span class="ml-2 text-gray-500 dark:text-gray-400">
                  ({{ filteredBoardTasks[status.id]?.length || 0 }})
                </span>
              </h3>
            </div>
            <div class="p-4 space-y-4 overflow-y-auto" :style="{ maxHeight: '420px' }">
              <div
                v-for="(task, idx) in (filteredBoardTasks[status.id] || []).slice(0, 6)"
                :key="task.id"
                class="px-2 py-1.5 rounded-lg cursor-move hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 text-xs flex flex-col gap-1"
                :style="{ backgroundColor: task.color ? (task.color + '22') : (status.id === 'todo' ? '#e3eafe' : status.id === 'in_progress' ? '#fef9e3' : status.id === 'review' ? '#f3e3fe' : status.id === 'done' ? '#e3fee7' : '#fff') }"
                @click="selectedTask = task"
                draggable="true"
                @dragstart="handleDragStart($event, task)"
                @dragend="handleDragEnd"
              >
                <div class="flex items-center justify-between">
                  <span class="font-semibold text-gray-900 dark:text-white truncate">{{ task.title }}</span>
                  <span
                    class="px-2 py-0.5 text-2xs font-medium rounded-full"
                    :class="task.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'"
                  >
                    {{ task.priority }}
                  </span>
                </div>
                <div class="truncate text-gray-500 dark:text-gray-400">{{ task.description }}</div>
                <div class="flex items-center justify-between mt-1">
                  <div class="flex items-center space-x-1">
                  <img
                    v-if="task.assignee"
                    :src="task.assignee.user_metadata?.avatar_url || 'https://ui-avatars.com/api/?name=' + task.assignee.email"
                    class="w-4 h-4 rounded-full"
                    :alt="task.assignee.email"
                    :title="task.assignee.email"
                  />
                    <div
                      v-else
                      class="w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center"
                      title="Unassigned"
                    >
                      <svg class="w-2 h-2 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span
                      v-if="task.assignee_id === user?.id"
                      class="px-1 py-0.5 text-2xs font-medium bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 rounded"
                      title="Assigned to you"
                    >
                      You
                    </span>
                    <!-- Time tracking indicator -->
                    <span
                      v-if="task.estimated_hours"
                      class="px-1 py-0.5 text-2xs font-medium bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 rounded"
                      :title="task.completed_at ? `Estimated: ${task.estimated_hours}h, Actual: ${calculateActualTime(task)}` : `Estimated: ${task.estimated_hours}h`"
                    >
                      <svg class="w-2 h-2 inline mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span v-if="task.completed_at">{{ calculateActualTime(task) }}</span>
                      <span v-else>{{ task.estimated_hours }}h</span>
                    </span>
                  </div>
                  <span class="text-2xs text-gray-400 ml-auto">{{ task.due_date }}</span>
                </div>
              </div>
              <button
                v-if="(filteredBoardTasks[status.id]?.length || 0) > 6"
                class="w-full mt-2 py-1 text-xs font-semibold text-primary-600 bg-primary-50 dark:bg-primary-900 rounded hover:bg-primary-100 dark:hover:bg-primary-800 transition"
                @click="openShowAllModal(status.id)"
              >
                Show All
              </button>
            </div>
            </div>
          </div>
        </div>

        <!-- List View -->
        <div v-else-if="currentView === 'list'" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div class="p-4 border-b border-gray-200 dark:border-gray-700">
            <div class="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
              <div class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">Task List</h3>
                  <!-- Mobile View Toggle -->
                  <div class="flex lg:hidden items-center space-x-1 ml-4">
                    <button
                      @click="mobileListView = 'cards'"
                      class="p-2 rounded-md transition-colors"
                      :class="mobileListView === 'cards' ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-7H5m14 14H5" />
                      </svg>
                    </button>
                    <button
                      @click="mobileListView = 'table'"
                      class="p-2 rounded-md transition-colors"
                      :class="mobileListView === 'table' ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10V9a2 2 0 00-2-2H5a2 2 0 00-2-2v10z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <!-- Quick Filter Buttons -->
                <div class="flex items-center space-x-2">
                  <button
                    @click="setQuickFilter('all')"
                    class="px-2 lg:px-3 py-1 text-xs lg:text-sm rounded-md transition-colors"
                    :class="quickFilter === 'all' ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'"
                  >
                    All
                  </button>
                  <button
                    @click="setQuickFilter('me')"
                    class="px-2 lg:px-3 py-1 text-xs lg:text-sm rounded-md transition-colors"
                    :class="quickFilter === 'me' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'"
                  >
                    Mine
                  </button>
                  <button
                    @click="setQuickFilter('unassigned')"
                    class="px-2 lg:px-3 py-1 text-xs lg:text-sm rounded-md transition-colors"
                    :class="quickFilter === 'unassigned' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'"
                  >
                    Unassigned
                  </button>
                </div>
              </div>
              
              <!-- Mobile Filter Toggle -->
              <div class="flex lg:hidden justify-end">
                <button
                  @click="showMobileFilters = !showMobileFilters"
                  class="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors flex items-center"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                  </svg>
                  Filters
                </button>
              </div>
              
              <!-- Desktop Filters -->
              <div class="hidden lg:flex lg:items-center lg:space-x-4">
                <!-- Filter by Assignee -->
                <select
                  v-model="listViewFilters.assignee"
                  class="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-xs lg:text-sm"
                >
                  <option value="">All Assignees</option>
                  <option value="unassigned">Unassigned</option>
                  <option value="me">Assigned to me</option>
                  <option 
                    v-for="member in teamMembers" 
                    :key="member.id" 
                    :value="member.id"
                  >
                    {{ member.full_name || (member.first_name || '') + ' ' + (member.last_name || '') || member.email }}
                  </option>
                </select>

                <!-- Filter by Status -->
                <select
                  v-model="listViewFilters.status"
                  class="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-xs lg:text-sm"
                >
                  <option value="">All Statuses</option>
                  <option v-for="status in taskStatuses" :key="status.id" :value="status.id">
                    {{ status.name }}
                  </option>
                </select>

                <!-- Filter by Priority -->
                <select
                  v-model="listViewFilters.priority"
                  class="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-xs lg:text-sm"
                >
                  <option value="">All Priorities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>

                <!-- Sort by -->
                <select
                  v-model="listViewSort.by"
                  class="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-xs lg:text-sm"
                >
                  <option value="due_date">Due Date</option>
                  <option value="priority">Priority</option>
                  <option value="status">Status</option>
                  <option value="title">Title</option>
                </select>

                <!-- Sort Direction -->
                <button
                  @click="listViewSort.asc = !listViewSort.asc"
                  class="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <svg
                    class="w-5 h-5"
                    :class="{ 'transform rotate-180': !listViewSort.asc }"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <!-- Mobile Filter Panel -->
            <div v-if="showMobileFilters" class="lg:hidden mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-3">
              <div class="grid grid-cols-1 gap-3">
                <!-- Filter by Assignee -->
                <select
                  v-model="listViewFilters.assignee"
                  class="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
                >
                  <option value="">All Assignees</option>
                  <option value="unassigned">Unassigned</option>
                  <option value="me">Assigned to me</option>
                  <option 
                    v-for="member in teamMembers" 
                    :key="member.id" 
                    :value="member.id"
                  >
                    {{ member.full_name || (member.first_name || '') + ' ' + (member.last_name || '') || member.email }}
                  </option>
                </select>

                <div class="grid grid-cols-2 gap-3">
                  <!-- Filter by Status -->
                  <select
                    v-model="listViewFilters.status"
                    class="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
                  >
                    <option value="">All Statuses</option>
                    <option v-for="status in taskStatuses" :key="status.id" :value="status.id">
                      {{ status.name }}
                    </option>
                  </select>

                  <!-- Filter by Priority -->
                  <select
                    v-model="listViewFilters.priority"
                    class="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
                  >
                    <option value="">All Priorities</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
          </div>

                <div class="flex items-center justify-between">
                  <!-- Sort by -->
                  <select
                    v-model="listViewSort.by"
                    class="flex-1 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
                  >
                    <option value="due_date">Due Date</option>
                    <option value="priority">Priority</option>
                    <option value="status">Status</option>
                    <option value="title">Title</option>
                  </select>

                  <!-- Sort Direction -->
                  <button
                    @click="listViewSort.asc = !listViewSort.asc"
                    class="ml-3 p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg"
                  >
                    <svg
                      class="w-5 h-5"
                      :class="{ 'transform rotate-180': !listViewSort.asc }"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Mobile Card View -->
          <div v-if="mobileListView === 'cards'" class="lg:hidden p-4">
            <div class="space-y-3">
              <div
                v-for="task in filteredAndSortedTasks"
                :key="task.id"
                class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow cursor-pointer"
                @click="selectedTask = task"
              >
                <div class="flex items-start justify-between mb-2">
                  <div class="flex items-center space-x-2 flex-1 min-w-0">
                    <div class="flex-shrink-0 h-3 w-3 rounded-full" :style="{ backgroundColor: task.color }"></div>
                    <h4 class="font-medium text-gray-900 dark:text-white truncate">{{ task.title }}</h4>
                  </div>
                  <span
                    class="flex-shrink-0 px-2 py-1 text-xs leading-4 font-semibold rounded-full"
                    :class="{
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200': task.priority === 'high',
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200': task.priority === 'medium',
                      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': task.priority === 'low'
                    }"
                  >
                    {{ task.priority }}
                  </span>
                </div>
                
                <p v-if="task.description" class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {{ task.description }}
                </p>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <!-- Status -->
                    <span
                      class="px-2 py-1 text-xs leading-4 font-semibold rounded-full"
                      :class="{
                        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200': task.status === 'todo',
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200': task.status === 'in_progress',
                        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200': task.status === 'review',
                        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': task.status === 'done'
                      }"
                    >
                      {{ taskStatuses.find(s => s.id === task.status)?.name }}
                    </span>
                    
                    <!-- Assignee -->
                    <div class="flex items-center">
                      <img
                        v-if="task.assignee"
                        :src="task.assignee.user_metadata?.avatar_url || 'https://ui-avatars.com/api/?name=' + task.assignee.email"
                        class="h-6 w-6 rounded-full"
                        :alt="task.assignee.email"
                      />
                      <div
                        v-else
                        class="h-6 w-6 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center"
                      >
                        <svg class="w-3 h-3 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Due Date -->
                  <div class="text-right">
                    <div class="text-xs text-gray-900 dark:text-white font-medium">
                      {{ new Date(task.due_date).toLocaleDateString() }}
                    </div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">
                      {{ getDaysUntilDue(task.due_date) }}
                    </div>
                  </div>
                </div>
              </div>
              
              <div v-if="filteredAndSortedTasks.length === 0" class="text-center text-gray-500 dark:text-gray-400 py-8">
                No tasks found.
              </div>
            </div>
          </div>

                    <!-- Desktop Table View -->
          <div class="hidden lg:block overflow-x-auto -mx-4 lg:mx-0">
            <div class="inline-block min-w-full align-middle">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Task
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Priority
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Assignee
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Project
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr
                  v-for="task in filteredAndSortedTasks"
                  :key="task.id"
                  class="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  @click="selectedTask = task"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-4 w-4 rounded-full" :style="{ backgroundColor: task.color }"></div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900 dark:text-white">
                          {{ task.title }}
                        </div>
                        <div class="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                          {{ task.description }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                      :class="{
                        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200': task.status === 'todo',
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200': task.status === 'in_progress',
                        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200': task.status === 'review',
                        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': task.status === 'done'
                      }"
                    >
                      {{ taskStatuses.find(s => s.id === task.status)?.name }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                      :class="{
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200': task.priority === 'high',
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200': task.priority === 'medium',
                        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': task.priority === 'low'
                      }"
                    >
                      {{ task.priority }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900 dark:text-white">
                      {{ new Date(task.due_date).toLocaleDateString() }}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      {{ getDaysUntilDue(task.due_date) }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <img
                        v-if="task.assignee"
                        :src="task.assignee.user_metadata?.avatar_url || 'https://ui-avatars.com/api/?name=' + task.assignee.email"
                        class="h-8 w-8 rounded-full"
                        :alt="task.assignee.email"
                      />
                      <span v-else class="text-sm text-gray-500 dark:text-gray-400">Unassigned</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-4 w-4 rounded-full" :style="{ backgroundColor: projects.find(p => p.id === task.project_id)?.color }"></div>
                      <div class="ml-2 text-sm text-gray-900 dark:text-white">
                        {{ projects.find(p => p.id === task.project_id)?.name }}
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
            
            <!-- Empty state for desktop -->
            <div v-if="filteredAndSortedTasks.length === 0" class="text-center text-gray-500 dark:text-gray-400 py-12">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No tasks found</h3>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by creating a new task.</p>
              <div class="mt-6">
                <button
                  @click="showNewTaskModal = true"
                  class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <svg class="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  New Task
                </button>
              </div>
            </div>
          </div>
          
          <!-- Mobile Table View -->
          <div v-if="mobileListView === 'table'" class="lg:hidden overflow-x-auto -mx-4">
            <div class="inline-block min-w-full align-middle">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Task
                    </th>
                    <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Due
                    </th>
                    <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Assignee
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr
                    v-for="task in filteredAndSortedTasks"
                    :key="task.id"
                    class="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    @click="selectedTask = task"
                  >
                    <td class="px-3 py-4">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-3 w-3 rounded-full" :style="{ backgroundColor: task.color }"></div>
                        <div class="ml-2 min-w-0 flex-1">
                          <div class="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {{ task.title }}
                          </div>
                          <div class="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {{ task.description }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-3 py-4">
                      <span
                        class="px-2 py-1 text-xs leading-4 font-semibold rounded-full"
                        :class="{
                          'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200': task.status === 'todo',
                          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200': task.status === 'in_progress',
                          'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200': task.status === 'review',
                          'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': task.status === 'done'
                        }"
                      >
                        {{ taskStatuses.find(s => s.id === task.status)?.name.slice(0, 6) }}
                      </span>
                    </td>
                    <td class="px-3 py-4 text-xs text-gray-900 dark:text-white">
                      {{ new Date(task.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }}
                    </td>
                    <td class="px-3 py-4">
                      <img
                        v-if="task.assignee"
                        :src="task.assignee.user_metadata?.avatar_url || 'https://ui-avatars.com/api/?name=' + task.assignee.email"
                        class="h-6 w-6 rounded-full"
                        :alt="task.assignee.email"
                      />
                      <div
                        v-else
                        class="h-6 w-6 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center"
                      >
                        <svg class="w-3 h-3 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Mobile Floating Action Button -->
    <div class="lg:hidden fixed bottom-6 right-4 z-40">
      <button
        @click="showNewTaskModal = true"
        class="w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center touch-manipulation"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </div>

    <!-- New Task Modal -->
    <div v-if="showNewTaskModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-primary-600 to-blue-500 dark:from-primary-800 dark:to-blue-700">
          <h3 class="text-lg font-medium text-white">Create New Task</h3>
          <button @click="showNewTaskModal = false" class="text-white hover:text-gray-200 focus:outline-none">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <!-- Main Content -->
        <div class="p-6">
          <form @submit.prevent="handleCreateTask" class="space-y-6">
            <!-- Title and Description -->
            <div class="space-y-4">
              <div>
                <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                <input
                  type="text"
                  id="title"
                  v-model="newTask.title"
                  class="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Enter task title..."
                />
              </div>
              <div>
                <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                <textarea
                  id="description"
                  v-model="newTask.description"
                  rows="3"
                  class="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Enter task description..."
                ></textarea>
              </div>
            </div>

            <!-- Priority, Due Date, and Estimated Hours -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label for="priority" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Priority</label>
                <div class="mt-1 relative">
                  <select
                    id="priority"
                    v-model="newTask.priority"
                    class="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm appearance-none"
                  >
                    <option value="low" class="flex items-center">
                      <span class="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                      Low
                    </option>
                    <option value="medium" class="flex items-center">
                      <span class="inline-block w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
                      Medium
                    </option>
                    <option value="high" class="flex items-center">
                      <span class="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                      High
                    </option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label for="dueDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Due Date</label>
                <div class="mt-1 relative">
                  <input
                    type="date"
                    id="dueDate"
                    v-model="newTask.dueDate"
                    class="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label for="estimatedHours" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Estimated Hours</label>
                <div class="mt-1 relative">
                  <input
                    type="number"
                    id="estimatedHours"
                    v-model="newTask.estimatedHours"
                    min="0"
                    step="0.5"
                    placeholder="e.g. 4"
                    class="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Color and Assignee -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="taskColor" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Color</label>
                <div class="mt-1 flex items-center space-x-2">
                  <input
                    type="color"
                    id="taskColor"
                    v-model="newTask.color"
                    class="h-10 w-20 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700"
                  />
                  <span class="text-sm text-gray-500 dark:text-gray-400">Choose a color for the task</span>
                </div>
              </div>
              <div>
                <label for="assignee" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Assignee</label>
                <div class="mt-1 relative">
                  <select
                    id="assignee"
                    v-model="newTask.assignee_id"
                    class="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm appearance-none"
                  >
                    <option :value="null">Unassigned</option>
                    <option
                      v-for="member in teamMembers"
                      :key="member.id"
                      :value="member.id"
                      class="flex items-center"
                    >
                      {{ member.full_name || (member.first_name || '') + ' ' + (member.last_name || '') || member.email }}
                    </option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <div v-if="newTaskAssignee" class="mt-2 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <img
                    :src="newTaskAssignee.avatar_url || 'https://ui-avatars.com/api/?name=' + (newTaskAssignee.full_name || newTaskAssignee.email)"
                    class="w-6 h-6 rounded-full"
                    :alt="newTaskAssignee.full_name || newTaskAssignee.email"
                  />
                  <span>Will be assigned to: {{ newTaskAssignee.full_name || (newTaskAssignee.first_name || '') + ' ' + (newTaskAssignee.last_name || '') || newTaskAssignee.email }}</span>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                @click="showNewTaskModal = false"
                class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center"
              >
                <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors flex items-center"
              >
                <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- New Team Modal -->
    <div v-if="showNewTeamModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-fade-in">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-primary-600 to-blue-500 dark:from-primary-800 dark:to-blue-700">
          <h3 class="text-lg font-medium text-white">Create New Team</h3>
          <button @click="showNewTeamModal = false" class="text-white hover:text-gray-200 focus:outline-none">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div class="p-6">
          <div v-if="errorMessage" class="mb-4 p-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md text-sm">
            {{ errorMessage }}
          </div>
          <form @submit.prevent="handleCreateTeam" class="space-y-6">
            <div>
              <label for="teamName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Team Name</label>
              <input
                type="text"
                id="teamName"
                v-model="newTeam.name"
                class="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                placeholder="Enter team name..."
              />
            </div>
            <div>
              <label for="teamDescription" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <textarea
                id="teamDescription"
                v-model="newTeam.description"
                rows="3"
                class="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                placeholder="Enter team description..."
              ></textarea>
            </div>
            <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                @click="showNewTeamModal = false"
                class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center"
              >
                <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors flex items-center"
              >
                <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create Team
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- New Project Modal -->
    <div v-if="showNewProjectModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-fade-in">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-primary-600 to-blue-500 dark:from-primary-800 dark:to-blue-700">
          <h3 class="text-lg font-medium text-white">Create New Project</h3>
          <button @click="showNewProjectModal = false" class="text-white hover:text-gray-200 focus:outline-none">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div class="p-6">
          <div v-if="errorMessage" class="mb-4 p-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md text-sm">
            {{ errorMessage }}
          </div>
          <form @submit.prevent="handleCreateProject" class="space-y-6">
            <div>
              <label for="projectName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Project Name</label>
              <input
                type="text"
                id="projectName"
                v-model="newProject.name"
                class="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                placeholder="Enter project name..."
              />
            </div>
            <div>
              <label for="projectDescription" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <textarea
                id="projectDescription"
                v-model="newProject.description"
                rows="3"
                class="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                placeholder="Enter project description..."
              ></textarea>
            </div>
            <div>
              <label for="projectColor" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Color</label>
              <input
                type="color"
                id="projectColor"
                v-model="newProject.color"
                class="mt-1 h-10 w-20 rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700"
              />
            </div>
            <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                @click="showNewProjectModal = false"
                class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center"
              >
                <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors flex items-center"
              >
                <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Team Member Invite Modal -->
    <div v-if="showInviteTeamMemberModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-fade-in">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-primary-600 to-blue-500 dark:from-primary-800 dark:to-blue-700">
          <h3 class="text-lg font-medium text-white">Invite Team Member</h3>
          <button @click="showInviteTeamMemberModal = false" class="text-white hover:text-gray-200 focus:outline-none">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div class="p-6">
          <div v-if="errorMessage" class="mb-4 p-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md text-sm">
            {{ errorMessage }}
          </div>
          <form @submit.prevent="handleInviteTeamMember" class="space-y-6">
            <div>
              <label for="memberEmail" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
              <input
                type="email"
                id="memberEmail"
                v-model="newTeamMember.email"
                class="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                placeholder="colleague@example.com"
              />
            </div>
            <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                @click="showInviteTeamMemberModal = false"
                class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center"
              >
                <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors flex items-center"
              >
                <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Invite Member
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="fixed top-4 right-4 z-50">
      <div class="bg-red-50 border-l-4 border-red-400 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-700">{{ errorMessage }}</p>
          </div>
          <div class="ml-auto pl-3">
            <div class="-mx-1.5 -my-1.5">
              <button
                @click="errorMessage = ''"
                class="inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
              >
                <span class="sr-only">Dismiss</span>
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Message -->
    <div v-if="successMessage" class="fixed top-4 right-4 z-50">
      <div class="bg-green-50 border-l-4 border-green-400 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-green-700">{{ successMessage }}</p>
          </div>
          <div class="ml-auto pl-3">
            <div class="-mx-1.5 -my-1.5">
              <button
                @click="successMessage = ''"
                class="inline-flex bg-green-50 rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
              >
                <span class="sr-only">Dismiss</span>
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Task Details Modal -->
    <div v-if="selectedTask" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-primary-600 to-blue-500 dark:from-primary-800 dark:to-blue-700">
          <div class="flex items-center space-x-4">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-300 shadow">
              <svg v-if="selectedTask.status === 'todo'" class="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12l2 2 4-4" /></svg>
              <svg v-else-if="selectedTask.status === 'in_progress'" class="w-4 h-4 mr-1 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3" /></svg>
              <svg v-else-if="selectedTask.status === 'review'" class="w-4 h-4 mr-1 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3" /></svg>
              <svg v-else-if="selectedTask.status === 'done'" class="w-4 h-4 mr-1 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12l2 2 4-4" /></svg>
              {{ taskStatuses.find(s => s.id === selectedTask.status)?.name }}
            </span>
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-200">
              <svg class="w-4 h-4 mr-1 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 17l4 4 4-4m0-5V3" /></svg>
              {{ selectedTask.priority.charAt(0).toUpperCase() + selectedTask.priority.slice(1) }}
            </span>
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              <svg class="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              {{ new Date(selectedTask.due_date).toLocaleDateString() }}
            </span>
          </div>
          <button @click="selectedTask = null" class="text-white hover:text-gray-200 focus:outline-none">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <!-- Main Content -->
        <div class="px-4 lg:px-6 py-4 lg:py-6 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
          <!-- Left: Assignee, Project, Team -->
            <div class="lg:col-span-1 flex flex-col items-center space-y-4 lg:space-y-6">
            <div class="flex flex-col items-center">
                <img v-if="currentAssignee" :src="currentAssignee.avatar_url || 'https://ui-avatars.com/api/?name=' + (currentAssignee.full_name || currentAssignee.email)" class="w-12 lg:w-16 h-12 lg:h-16 rounded-full border-4 border-primary-200 shadow" :alt="currentAssignee.full_name || currentAssignee.email" />
                <div class="mt-2 text-base lg:text-lg font-semibold text-gray-900 dark:text-white text-center">{{ currentAssignee?.full_name || (currentAssignee?.first_name || '') + ' ' + (currentAssignee?.last_name || '') || currentAssignee?.email || 'Unassigned' }}</div>
              <div v-if="currentAssignee" class="text-xs text-gray-500 dark:text-gray-400">Assignee</div>
            </div>
            <div class="flex flex-col items-center space-y-2">
                <span class="inline-flex items-center px-2 lg:px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200">
                  <svg class="w-3 lg:w-4 h-3 lg:h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6" /></svg>
                {{ projects.find(p => p.id === selectedTask.project_id)?.name || 'No Project' }}
              </span>
                <span v-if="currentTeam" class="inline-flex items-center px-2 lg:px-3 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200">
                  <svg class="w-3 lg:w-4 h-3 lg:h-4 mr-1 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                {{ currentTeam?.name || 'No Team' }}
              </span>
            </div>
          </div>
            <!-- Middle: Task Details & Description -->
            <div class="lg:col-span-2">
              <!-- Editable Task Details -->
              <div class="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Title -->
          <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Task Title</label>
                  <input
                    v-model="selectedTask.title"
                    type="text"
                    class="w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
                    placeholder="Enter task title..."
                  />
              </div>

                <!-- Status -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                  <select
                    v-model="selectedTask.status"
                    class="w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
                  >
                    <option v-for="status in taskStatuses" :key="status.id" :value="status.id">
                      {{ status.name }}
                    </option>
                  </select>
                </div>

                <!-- Priority -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
                  <select
                    v-model="selectedTask.priority"
                    class="w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <!-- Due Date -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Due Date</label>
                  <input
                    v-model="selectedTask.due_date"
                    type="date"
                    class="w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
                  />
                </div>

                <!-- Assignee -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Assignee</label>
                  <select
                    v-model="selectedTask.assignee_id"
                    class="w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
                  >
                    <option :value="null">Unassigned</option>
                    <option
                      v-for="member in teamMembers"
                      :key="member.id"
                      :value="member.id"
                    >
                      {{ member.full_name || (member.first_name || '') + ' ' + (member.last_name || '') || member.email }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- Estimated Hours -->
            <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Estimated Hours</label>
                <input
                  v-model="selectedTask.estimated_hours"
                  type="number"
                  min="0"
                  step="0.5"
                  placeholder="e.g. 4"
                  class="w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
                />
                <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Time will be automatically tracked based on when the task moves through different statuses.
                </p>
              </div>

              <!-- Analytics Info (Read-only) -->
              <div v-if="selectedTask.started_at || selectedTask.completed_at" class="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Time Analytics</h4>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div v-if="selectedTask.started_at">
                    <span class="text-gray-500 dark:text-gray-400">Started:</span>
                    <div class="font-medium">{{ new Date(selectedTask.started_at).toLocaleString() }}</div>
                  </div>
                  <div v-if="selectedTask.completed_at">
                    <span class="text-gray-500 dark:text-gray-400">Completed:</span>
                    <div class="font-medium">{{ new Date(selectedTask.completed_at).toLocaleString() }}</div>
                  </div>
                  <div v-if="selectedTask.completed_at">
                    <span class="text-gray-500 dark:text-gray-400">Active Work Time:</span>
                    <div class="font-medium">{{ calculateTotalTime(selectedTask) }}</div>
                    <div class="text-xs text-gray-400">Time spent working</div>
                  </div>
                  <div v-if="selectedTask.estimated_hours">
                    <span class="text-gray-500 dark:text-gray-400">Estimated:</span>
                    <div class="font-medium">{{ selectedTask.estimated_hours }} hours</div>
                  </div>
                  <div v-if="selectedTask.completed_at && selectedTask.estimated_hours">
                    <span class="text-gray-500 dark:text-gray-400">Variance:</span>
                    <div class="font-medium" :class="getVarianceClass(selectedTask)">
                      {{ calculateVariance(selectedTask) }}
                    </div>
                    <div class="text-xs text-gray-400">vs estimate</div>
                  </div>
                </div>
              </div>

              <!-- Description -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea
                  v-model="selectedTask.description"
                  rows="4"
                  class="w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
                  placeholder="Enter task description..."
                ></textarea>
            </div>
            <!-- Comments Timeline -->
            <div>
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Comments</h4>
              <div v-if="taskComments.length === 0" class="text-gray-400 italic">No comments yet.</div>
              <ol v-else class="relative border-l border-primary-200 dark:border-primary-700 ml-4">
                <li v-for="comment in taskComments" :key="comment.id" class="mb-8 ml-6">
                  <span class="absolute -left-3 flex items-center justify-center w-6 h-6 bg-primary-100 dark:bg-primary-800 rounded-full ring-8 ring-white dark:ring-gray-900">
                    <img :src="comment.user?.avatar_url || 'https://ui-avatars.com/api/?name=' + (comment.user?.full_name || comment.user?.email)" class="w-6 h-6 rounded-full" :alt="comment.user?.full_name || comment.user?.email" />
                  </span>
                  <div class="flex items-center space-x-2">
                    <span class="font-semibold text-gray-900 dark:text-white">{{ comment.user?.full_name || (comment.user?.first_name || '') + ' ' + (comment.user?.last_name || '') || comment.user?.email || 'Unknown User' }}</span>
                    <span class="text-xs text-gray-500 dark:text-gray-400">{{ new Date(comment.created_at).toLocaleString() }}</span>
                  </div>
                  <div class="text-gray-700 dark:text-gray-200 mt-1">{{ comment.content }}</div>
                </li>
              </ol>
              <!-- Add Comment Form -->
              <form class="mt-4 flex items-center space-x-2" @submit.prevent="handleAddComment">
                <textarea v-model="newComment" rows="1" class="flex-1 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm resize-none" placeholder="Add a comment..."></textarea>
                <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center">
                  <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
        <!-- Footer: Actions -->
        <div class="flex justify-end space-x-3 px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <button type="button" @click="handleDeleteTask" class="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 dark:bg-red-900 rounded-md flex items-center">
            <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            Delete Task
          </button>
          <button type="button" @click="selectedTask = null" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center">
            <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            Close
          </button>
          <button type="button" @click="handleUpdateTask" class="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md flex items-center">
            <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
            Save Changes
          </button>
        </div>
      </div>
    </div>

    <!-- Show All Tasks Modal -->
    <div v-if="showAllModal.open" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-fade-in">
        <div class="flex items-center justify-between px-4 lg:px-6 py-4 bg-gradient-to-r from-primary-600 to-blue-500 dark:from-primary-800 dark:to-blue-700">
          <h3 class="text-base lg:text-lg font-medium text-white">
            {{ showAllModal.title || `All ${taskStatuses.find(s => s.id === showAllModal.status)?.name} Tasks` }}
          </h3>
          <button @click="showAllModal.open = false" class="text-white hover:text-gray-200 focus:outline-none">
            <svg class="w-6 h-6 lg:w-7 lg:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div class="p-4 lg:p-6">
          <input v-model="showAllModal.search" type="text" placeholder="Search tasks..." class="mb-4 w-full rounded border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          <div class="space-y-2 max-h-96 overflow-y-auto">
            <div
              v-for="task in (showAllModal.tasks || filteredShowAllTasks)"
              :key="task.id"
              class="p-3 lg:p-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-700 hover:shadow transition cursor-pointer touch-manipulation"
              @click="selectedTask = task; showAllModal.open = false"
            >
              <div class="flex items-center justify-between mb-1">
                <span class="font-semibold text-sm lg:text-base text-gray-900 dark:text-white">{{ task.title }}</span>
                <span class="px-2 py-0.5 text-2xs lg:text-xs font-medium rounded-full" :class="task.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'">{{ task.priority }}</span>
              </div>
              <div class="text-2xs lg:text-xs text-gray-500 dark:text-gray-400 truncate">{{ task.description }}</div>
            </div>
            <div v-if="(showAllModal.tasks || filteredShowAllTasks).length === 0" class="text-center text-gray-400 py-8 text-sm">No tasks found.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Use no layout for dashboard since it has its own sidebar navigation
definePageMeta({
  layout: false
})

import { ref, computed, onMounted, watch } from 'vue'
import { useSupabaseClient, useSupabaseUser } from '#imports'
import { useTeam } from '~/composables/useTeam'
import { useProject } from '~/composables/useProject'
import { useTask } from '~/composables/useTask'

const client = useSupabaseClient()
const user = useSupabaseUser()

const profile = ref(null)

onMounted(async () => {
  if (user.value) {
    const { data, error } = await client
      .from('profiles')
      .select('full_name, first_name, last_name, email')
      .eq('id', user.value.id)
      .single()
    if (!error) profile.value = data
  }
})

const userDisplayName = computed(() => {
  if (!profile.value) return ''
  if (profile.value.full_name) return profile.value.full_name
  if (profile.value.first_name || profile.value.last_name) return `${profile.value.first_name || ''} ${profile.value.last_name || ''}`.trim()
  return profile.value.email
})

// Add currentCompany ref and isCompanyAdmin computed
const currentCompany = ref(null)
const isCompanyAdmin = ref(false)

const { teams, currentTeam, loading: teamsLoading, fetchTeams, createTeam, setCurrentTeam, isTeamAdmin, inviteTeamMember } = useTeam()
const { projects, currentProject, loading: projectsLoading, fetchProjects, createProject, setCurrentProject } = useProject()
const { tasks, loading: tasksLoading, fetchTasks, createTask, tasksByStatus, updateTask, deleteTask, addComment } = useTask()

// State
const showNewTaskModal = ref(false)
const showNewTeamModal = ref(false)
const showNewProjectModal = ref(false)
const selectedProject = ref(null)
const selectedTask = ref(null)
const currentView = ref('board')
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const showCreateTeamModal = ref(false)
const showInviteTeamMemberModal = ref(false)

// Sample data (replace with actual data from your database)
const views = ref([
  { id: 'list', name: 'List' },
  { id: 'board', name: 'Board' },
  { id: 'calendar', name: 'Calendar' },
])

const taskStatuses = ref([
  { id: 'todo', name: 'To Do' },
  { id: 'in_progress', name: 'In Progress' },
  { id: 'review', name: 'Review' },
  { id: 'done', name: 'Done' },
])

const newTask = ref({
  title: '',
  description: '',
  priority: 'medium',
  dueDate: null,
  color: '#3B82F6', // Default blue color
  assignee_id: null,
  estimatedHours: null
})

const newTeam = ref({
  name: '',
  description: ''
})

const newProject = ref({
  name: '',
  description: '',
  color: '#3B82F6'
})

const newTeamMember = ref({
  email: ''
})

// Calendar state
const currentMonth = ref(new Date().getMonth())
const currentYear = ref(new Date().getFullYear())
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Computed properties for calendar
const currentMonthName = computed(() => {
  return new Date(currentYear.value, currentMonth.value, 1).toLocaleString('default', { month: 'long' })
})

const calendarDays = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)
  const days = []
  
  // Add days from previous month
  const firstDayOfWeek = firstDay.getDay()
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(currentYear.value, currentMonth.value, -i)
    days.push({
      date: date.toISOString().split('T')[0],
      dayNumber: date.getDate(),
      isCurrentMonth: false
    })
  }
  
  // Add days from current month
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(currentYear.value, currentMonth.value, i)
    days.push({
      date: date.toISOString().split('T')[0],
      dayNumber: i,
      isCurrentMonth: true,
      isToday: date.toDateString() === new Date().toDateString()
    })
  }
  
  // Add days from next month
  const remainingDays = 42 - days.length // 6 rows * 7 days
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(currentYear.value, currentMonth.value + 1, i)
    days.push({
      date: date.toISOString().split('T')[0],
      dayNumber: date.getDate(),
      isCurrentMonth: false
    })
  }
  
  return days
})

// Add team members ref
const teamMembers = ref([])

// Add function to fetch team members
const fetchTeamMembers = async (teamId) => {
  try {
    // First get team members
    const { data: membersData, error: membersError } = await client
      .from('team_members')
      .select('user_id')
      .eq('team_id', teamId)

    if (membersError) throw membersError

    if (membersData.length > 0) {
      // Then get user details for all team members
      const userIds = membersData.map(m => m.user_id)
      const { data: usersData, error: usersError } = await client
        .from('profiles')
        .select('id, email, full_name, avatar_url')
        .in('id', userIds)

      if (usersError) throw usersError

      teamMembers.value = usersData
    } else {
      teamMembers.value = []
    }
  } catch (err) {
    console.error('Error fetching team members:', err)
    errorMessage.value = 'Failed to load team members'
    teamMembers.value = []
  }
}

// Methods
const handleLogout = async () => {
  await client.auth.signOut()
  navigateTo('/login')
}

const handleCreateTask = async () => {
  try {
    if (!newTask.value.title) {
      errorMessage.value = 'Task name is required'
      return
    }

    if (!currentProject.value) {
      errorMessage.value = 'Please select a project first'
      return
    }

    const task = await createTask({
      title: newTask.value.title,
      description: newTask.value.description,
      project_id: currentProject.value.id,
      priority: newTask.value.priority,
      due_date: newTask.value.dueDate,
      color: newTask.value.color,
      assignee_id: newTask.value.assignee_id,
      estimated_hours: newTask.value.estimatedHours
    })

    if (task) {
      showNewTaskModal.value = false
      newTask.value = {
        title: '',
        description: '',
        priority: 'medium',
        dueDate: null,
        color: '#3B82F6',
        assignee_id: null,
        estimatedHours: null
      }
      errorMessage.value = ''
    }
  } catch (err) {
    console.error('Error creating task:', err)
    errorMessage.value = err.message || 'Failed to create task'
  }
}

const handleCreateTeam = async () => {
  try {
    if (!newTeam.value.name?.trim()) {
      errorMessage.value = 'Team name is required'
      return
    }

    const team = await createTeam({
      name: newTeam.value.name,
      description: newTeam.value.description,
      company_id: currentCompany.value.id
    })

    if (team) {
      showNewTeamModal.value = false
      newTeam.value = { name: '', description: '' }
      errorMessage.value = ''
    }
  } catch (err) {
    console.error('Error creating team:', err)
    errorMessage.value = err.message || 'Failed to create team'
  }
}

const handleCreateProject = async () => {
  try {
    if (!newProject.value.name) {
      errorMessage.value = 'Project name is required'
      return
    }

    if (!currentTeam.value) {
      errorMessage.value = 'Please select a team first'
      return
    }

    const project = await createProject({
      name: newProject.value.name,
      description: newProject.value.description,
      color: newProject.value.color,
      team_id: currentTeam.value.id
    })

    if (project) {
      await setCurrentProject(project)
      showNewProjectModal.value = false
      newProject.value = {
        name: '',
        description: '',
        color: '#3B82F6'
      }
      errorMessage.value = ''
    }
  } catch (err) {
    console.error('Error creating project:', err)
    errorMessage.value = err.message || 'Failed to create project'
  }
}

const handleInviteTeamMember = async () => {
  try {
    if (!newTeamMember.value.email) {
      errorMessage.value = 'Email is required'
      return
    }

    if (!currentTeam.value) {
      errorMessage.value = 'Please select a team first'
      return
    }

    await inviteTeamMember(currentTeam.value.id, newTeamMember.value.email)
    
    // Reset form
    newTeamMember.value.email = ''
    showInviteTeamMemberModal.value = false
    errorMessage.value = ''
  } catch (err) {
    console.error('Error inviting team member:', err)
    errorMessage.value = err.message || 'Failed to invite team member'
  }
}

// Methods for calendar
const getTasksForDate = (date) => {
  return tasks.value.filter(task => task.due_date === date)
}

const showDayTasks = (date) => {
  const dayTasks = getTasksForDate(date)
  showAllModal.value = {
    open: true,
    status: 'day',
    search: '',
    tasks: dayTasks,
    title: `Tasks for ${new Date(date).toLocaleDateString()}`
  }
}

// Update fetchCurrentCompany function
const fetchCurrentCompany = async () => {
  try {
    const { data: companyMembers, error: companyError } = await client
      .from('company_members')
      .select(`
        *,
        company:companies(*)
      `)
      .eq('user_id', user.value.id)
      .maybeSingle()

    if (companyError) throw companyError

    if (!companyMembers) {
      currentCompany.value = null
      return
    }

    currentCompany.value = companyMembers.company
    isCompanyAdmin.value = companyMembers.role === 'admin'

    // Fetch teams for the company
    if (currentCompany.value) {
      await fetchTeams(currentCompany.value.id)
    }
  } catch (err) {
    console.error('Error fetching company:', err)
    currentCompany.value = null
    isCompanyAdmin.value = false
  }
}

// Add onMounted hook
onMounted(async () => {
  if (user.value) {
    await fetchCurrentCompany()
  }
})

// Add watcher for user changes
watch(user, async (newUser) => {
  if (newUser) {
    await fetchCurrentCompany()
  } else {
    currentCompany.value = null
    isCompanyAdmin.value = false
  }
})

// Watch for team changes
watch(currentTeam, async (newTeam) => {
  if (newTeam) {
    try {
      await fetchTeamMembers(newTeam.id)
      await fetchProjects(newTeam.id)
      // Clear current project if it doesn't belong to the new team
      if (currentProject.value && currentProject.value.team_id !== newTeam.id) {
        await setCurrentProject(null)
      }
      // Set first project if available
      if (projects.value.length > 0) {
        await setCurrentProject(projects.value[0])
      }
    } catch (err) {
      console.error('Error loading team data:', err)
      errorMessage.value = 'Failed to load team data. Please try again.'
    }
  } else {
    projects.value = []
    currentProject.value = null
    tasks.value = []
    teamMembers.value = []
  }
})

// Watch for current project changes
watch(currentProject, async (newProject) => {
  if (newProject) {
    try {
      // Only fetch tasks if the project belongs to the current team
      if (newProject.team_id === currentTeam.value?.id) {
        await fetchTasks(newProject.id)
      } else {
        tasks.value = []
      }
    } catch (err) {
      console.error('Error loading tasks:', err)
      errorMessage.value = 'Failed to load tasks. Please try again.'
    }
  } else {
    tasks.value = []
  }
}, { immediate: true })

// Update the project selection in the template
const handleProjectSelect = (project) => {
  console.log('Project selected:', project)
  setCurrentProject(project)
}

// Add these to the script setup section:
const taskComments = ref([])
const newComment = ref('')

// Add these functions to handle task operations:
const handleUpdateTask = async () => {
  try {
    if (!selectedTask.value) return

    const updates = {
      title: selectedTask.value.title,
      description: selectedTask.value.description,
      priority: selectedTask.value.priority,
      status: selectedTask.value.status,
      due_date: selectedTask.value.due_date,
      color: selectedTask.value.color,
      project_id: selectedTask.value.project_id,
      assignee_id: selectedTask.value.assignee_id,
      estimated_hours: selectedTask.value.estimated_hours
    }

    // Update the task
    await updateTask(selectedTask.value.id, updates)

    // Show success message
    successMessage.value = 'Task updated successfully!'
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)

    // Refresh the tasks list
    await fetchTasks(selectedTask.value.project_id)
    selectedTask.value = null
    errorMessage.value = ''
  } catch (err) {
    console.error('Error updating task:', err)
    errorMessage.value = err.message || 'Failed to update task'
  }
}

const handleDeleteTask = async () => {
  if (!selectedTask.value) return
  
  if (confirm('Are you sure you want to delete this task?')) {
    try {
      await deleteTask(selectedTask.value.id, selectedTask.value.project_id)
      selectedTask.value = null
      errorMessage.value = ''
    } catch (err) {
      console.error('Error deleting task:', err)
      errorMessage.value = err.message || 'Failed to delete task'
    }
  }
}

const handleAddComment = async () => {
  if (!selectedTask.value || !newComment.value.trim()) return

  try {
    const { data: comment, error } = await client
      .from('task_comments')
      .insert({
        task_id: selectedTask.value.id,
        user_id: user.value.id,
        content: newComment.value.trim()
      })
      .select()
      .single()

    if (error) throw error

    // Refresh comments
    taskComments.value = await fetchComments(selectedTask.value.id)
    newComment.value = ''
    errorMessage.value = ''
  } catch (err) {
    console.error('Error adding comment:', err)
    errorMessage.value = err.message || 'Failed to add comment'
  }
}

// Add watcher for selectedTask to load comments
watch(selectedTask, async (task) => {
  if (task) {
    try {
      taskComments.value = await fetchComments(task.id)
    } catch (err) {
      console.error('Error fetching comments:', err)
      errorMessage.value = 'Failed to load comments'
    }
  } else {
    taskComments.value = []
  }
})

// Fetch comments for a task
const fetchComments = async (taskId) => {
  try {
    // First get comments
    const { data: comments, error: commentsError } = await client
      .from('task_comments')
      .select('*')
      .eq('task_id', taskId)
      .order('created_at', { ascending: false })

    if (commentsError) throw commentsError

    if (comments.length === 0) return []

    // Then get profiles for each comment
    const userIds = [...new Set(comments.map(comment => comment.user_id))]
    const { data: profiles, error: profilesError } = await client
      .from('profiles')
      .select('id, email, full_name, first_name, last_name, avatar_url')
      .in('id', userIds)

    if (profilesError) throw profilesError

    // Create a map of profiles for quick lookup
    const profileMap = profiles.reduce((acc, profile) => {
      acc[profile.id] = profile
      return acc
    }, {})

    // Combine the data
    return comments.map(comment => ({
      ...comment,
      user: profileMap[comment.user_id] || { email: 'Unknown User', full_name: 'Unknown User' }
    }))
  } catch (error) {
    console.error('Error fetching comments:', error)
    return []
  }
}

// Add this computed property for the current assignee
const currentAssignee = computed(() => {
  if (!selectedTask.value?.assignee_id) return null
  return teamMembers.value.find(member => member.id === selectedTask.value.assignee_id)
})

// Add this computed property for the new task assignee
const newTaskAssignee = computed(() => {
  if (!newTask.value.assignee_id) return null
  return teamMembers.value.find(member => member.id === newTask.value.assignee_id)
})

// Add these to the script setup section:
const listViewFilters = ref({
  status: '',
  priority: '',
  assignee: ''
})

const listViewSort = ref({
  by: 'due_date',
  asc: true
})

const quickFilter = ref('all')
const sidebarOpen = ref(false)
const mobileListView = ref('cards')
const showMobileFilters = ref(false)
const showMobileBoardFilters = ref(false)

// Board view filters (separate from list view)
const boardViewFilters = ref({
  priority: '',
  assignee: ''
})

// Add this computed property
const filteredAndSortedTasks = computed(() => {
  let filtered = [...tasks.value]

  // Apply filters
  if (listViewFilters.value.status) {
    filtered = filtered.filter(task => task.status === listViewFilters.value.status)
  }
  if (listViewFilters.value.priority) {
    filtered = filtered.filter(task => task.priority === listViewFilters.value.priority)
  }
  if (listViewFilters.value.assignee) {
    if (listViewFilters.value.assignee === 'unassigned') {
      filtered = filtered.filter(task => !task.assignee_id)
    } else if (listViewFilters.value.assignee === 'me') {
      filtered = filtered.filter(task => task.assignee_id === user.value?.id)
    } else {
      filtered = filtered.filter(task => task.assignee_id === listViewFilters.value.assignee)
    }
  }

  // Apply sorting
  filtered.sort((a, b) => {
    let comparison = 0
    switch (listViewSort.value.by) {
      case 'due_date':
        comparison = new Date(a.due_date) - new Date(b.due_date)
        break
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        comparison = priorityOrder[a.priority] - priorityOrder[b.priority]
        break
      case 'status':
        const statusOrder = { todo: 1, in_progress: 2, review: 3, done: 4 }
        comparison = statusOrder[a.status] - statusOrder[b.status]
        break
      case 'title':
        comparison = a.title.localeCompare(b.title)
        break
    }
    return listViewSort.value.asc ? comparison : -comparison
  })

  return filtered
})

// Computed property for filtered board tasks
const filteredBoardTasks = computed(() => {
  const filtered = {}
  
  // Initialize each status with empty array
  taskStatuses.value.forEach(status => {
    filtered[status.id] = []
  })
  
  // Filter tasks based on board filters
  let tasksToFilter = [...tasks.value]
  
  // Apply board-specific filters
  if (boardViewFilters.value.priority) {
    tasksToFilter = tasksToFilter.filter(task => task.priority === boardViewFilters.value.priority)
  }
  if (boardViewFilters.value.assignee) {
    if (boardViewFilters.value.assignee === 'unassigned') {
      tasksToFilter = tasksToFilter.filter(task => !task.assignee_id)
    } else if (boardViewFilters.value.assignee === 'me') {
      tasksToFilter = tasksToFilter.filter(task => task.assignee_id === user.value?.id)
    } else {
      tasksToFilter = tasksToFilter.filter(task => task.assignee_id === boardViewFilters.value.assignee)
    }
  }
  
  // Group filtered tasks by status
  tasksToFilter.forEach(task => {
    if (filtered[task.status]) {
      filtered[task.status].push(task)
    }
  })

  return filtered
})

// Add this helper function
const getDaysUntilDue = (dueDate) => {
  const today = new Date()
  const due = new Date(dueDate)
  const diffTime = due - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) {
    return `${Math.abs(diffDays)} days overdue`
  } else if (diffDays === 0) {
    return 'Due today'
  } else if (diffDays === 1) {
    return 'Due tomorrow'
  } else {
    return `Due in ${diffDays} days`
  }
}

// Add these new refs and functions for drag and drop
const draggedTask = ref(null)

const handleDragStart = (event, task) => {
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('text/plain', task.id)
  event.target.classList.add('opacity-50')
}

const handleDragEnd = (event) => {
  event.target.classList.remove('opacity-50')
}

const handleDrop = async (event, newStatus) => {
  const taskId = event.dataTransfer.getData('text/plain')
  if (!taskId) return
  const task = tasks.value.find(t => t.id == taskId)
  if (!task) return

  try {
    // Use the updateTask function from the composable to ensure proper timestamp handling
    await updateTask(task.id, { status: newStatus })

    // Show success message
    successMessage.value = 'Task status updated successfully'
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  } catch (err) {
    console.error('Error updating task status:', err)
    errorMessage.value = 'Failed to update task status'
  }
}

// Watch for teams changes to auto-select the first team
watch(teams, async (newTeams) => {
  if (newTeams && newTeams.length > 0 && !currentTeam.value) {
    await setCurrentTeam(newTeams[0].id)
  }
})

// Watch for projects changes to auto-select the first project
watch(projects, async (newProjects) => {
  if (newProjects && newProjects.length > 0 && !currentProject.value) {
    await setCurrentProject(newProjects[0])
  }
})

const assigneeDisplayName = computed(() => {
  if (!selectedTask.value?.assignee) return ''
  const a = selectedTask.value.assignee
  if (a.full_name) return a.full_name
  if (a.first_name || a.last_name) return `${a.first_name || ''} ${a.last_name || ''}`.trim()
  return a.email
})

const showAllModal = ref({ open: false, status: null, search: '' })

function openShowAllModal(statusId) {
  showAllModal.value = { open: true, status: statusId, search: '' }
}

const filteredShowAllTasks = computed(() => {
  if (!showAllModal.value.open) return []
  const allTasks = tasksByStatus[showAllModal.value.status] || []
  if (!showAllModal.value.search) return allTasks
  return allTasks.filter(task =>
    task.title.toLowerCase().includes(showAllModal.value.search.toLowerCase()) ||
    (task.description && task.description.toLowerCase().includes(showAllModal.value.search.toLowerCase()))
  )
})

// Quick filter function
const setQuickFilter = (filter) => {
  quickFilter.value = filter
  if (filter === 'all') {
    listViewFilters.value.assignee = ''
    boardViewFilters.value.assignee = ''
  } else if (filter === 'me') {
    listViewFilters.value.assignee = 'me'
    boardViewFilters.value.assignee = 'me'
  } else if (filter === 'unassigned') {
    listViewFilters.value.assignee = 'unassigned'
    boardViewFilters.value.assignee = 'unassigned'
  }
}

// Watch for changes in assignee filter to update quick filter buttons
watch(() => listViewFilters.value.assignee, (newAssignee) => {
  if (newAssignee === '') {
    quickFilter.value = 'all'
  } else if (newAssignee === 'me') {
    quickFilter.value = 'me'
  } else if (newAssignee === 'unassigned') {
    quickFilter.value = 'unassigned'
  } else {
    quickFilter.value = 'custom'
  }
})

// Watch for changes in board assignee filter to update quick filter buttons
watch(() => boardViewFilters.value.assignee, (newAssignee) => {
  if (newAssignee === '') {
    quickFilter.value = 'all'
  } else if (newAssignee === 'me') {
    quickFilter.value = 'me'
  } else if (newAssignee === 'unassigned') {
    quickFilter.value = 'unassigned'
  } else {
    quickFilter.value = 'custom'
  }
})

// Helper function to calculate total time
const calculateTotalTime = (task) => {
  if (!task.started_at || !task.completed_at) return 'N/A'
  
  const start = new Date(task.started_at)
  const end = new Date(task.completed_at)
  const diffMs = end - start
  const totalMinutes = Math.round(diffMs / (1000 * 60))
  
  if (totalMinutes < 60) {
    return `${totalMinutes} minutes`
  } else {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    if (minutes === 0) {
      return `${hours} hour${hours !== 1 ? 's' : ''}`
    } else {
      return `${hours}h ${minutes}m`
    }
  }
}

// Calculate variance between estimated and actual time
const calculateVariance = (task) => {
  if (!task.estimated_hours || !task.started_at || !task.completed_at) return 'N/A'
  
  const start = new Date(task.started_at)
  const end = new Date(task.completed_at)
  const diffMs = end - start
  const actualMinutes = Math.round(diffMs / (1000 * 60))
  const estimatedMinutes = task.estimated_hours * 60
  const varianceMinutes = actualMinutes - estimatedMinutes
  
  if (Math.abs(varianceMinutes) < 1) {
    return 'On target'
  }
  
  if (varianceMinutes > 0) {
    if (varianceMinutes < 60) {
      return `+${varianceMinutes}m over`
    } else {
      const hours = Math.floor(varianceMinutes / 60)
      const minutes = varianceMinutes % 60
      if (minutes === 0) {
        return `+${hours}h over`
      } else {
        return `+${hours}h ${minutes}m over`
      }
    }
  } else {
    const absVariance = Math.abs(varianceMinutes)
    if (absVariance < 60) {
      return `${absVariance}m under`
    } else {
      const hours = Math.floor(absVariance / 60)
      const minutes = absVariance % 60
      if (minutes === 0) {
        return `${hours}h under`
      } else {
        return `${hours}h ${minutes}m under`
      }
    }
  }
}

// Get CSS class for variance display
const getVarianceClass = (task) => {
  if (!task.estimated_hours || !task.started_at || !task.completed_at) return ''
  
  const actualHours = calculateActualHours(task)
  const variance = actualHours - task.estimated_hours
  
  if (variance > 0) {
    return 'text-red-600 dark:text-red-400'
  } else if (variance < 0) {
    return 'text-green-600 dark:text-green-400'
  } else {
    return 'text-blue-600 dark:text-blue-400'
  }
}

// Calculate actual hours from timestamps
const calculateActualHours = (task) => {
  if (!task.started_at || !task.completed_at) return 0
  
  const start = new Date(task.started_at)
  const end = new Date(task.completed_at)
  const diffMs = end - start
  const diffHours = Math.round((diffMs / (1000 * 60 * 60)) * 10) / 10
  
  return diffHours
}

// Calculate actual time with minutes precision
const calculateActualTime = (task) => {
  if (!task.started_at || !task.completed_at) return 'N/A'
  
  const start = new Date(task.started_at)
  const end = new Date(task.completed_at)
  const diffMs = end - start
  const totalMinutes = Math.round(diffMs / (1000 * 60))
  
  if (totalMinutes < 60) {
    return `${totalMinutes}m`
  } else {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    if (minutes === 0) {
      return `${hours}h`
    } else {
      return `${hours}h ${minutes}m`
    }
  }
}

// Close sidebar when modals open
watch([showNewTaskModal, showNewTeamModal, showNewProjectModal, showInviteTeamMemberModal, selectedTask, () => showAllModal.value.open], (values) => {
  if (values.some(Boolean)) {
    sidebarOpen.value = false
    showMobileFilters.value = false
    showMobileBoardFilters.value = false
  }
})
</script>

<style scoped>
.cursor-move {
  cursor: move;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.text-2xs {
  font-size: 0.625rem;
  line-height: 0.75rem;
}

.touch-manipulation {
  touch-action: manipulation;
}

/* Improve mobile scrolling */
@media (max-width: 1024px) {
  .overflow-x-auto {
    -webkit-overflow-scrolling: touch;
  }
}

/* Animate the floating action button */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.lg\:hidden .w-14.h-14 {
  animation: float 3s ease-in-out infinite;
}
</style> 