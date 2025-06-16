<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <!-- Company Header -->
    <div class="relative max-w-5xl mx-auto mt-4 lg:mt-8 mb-6 lg:mb-10 px-4 lg:px-0">
      <div class="absolute -top-4 lg:-top-8 left-1/2 -translate-x-1/2 z-10">
        <img src="/task-flow-logo.png" alt="TaskFlow Logo" class="h-12 w-12 lg:h-16 lg:w-16 rounded-full shadow-lg border-4 border-white dark:border-gray-800 bg-white" />
      </div>
      <div class="bg-gradient-to-r from-primary-600 to-blue-500 dark:from-primary-800 dark:to-blue-700 rounded-xl lg:rounded-2xl shadow-xl pt-8 lg:pt-12 pb-4 lg:pb-6 px-4 lg:px-8 flex flex-col items-center relative">
        <div class="flex flex-col items-center text-center mb-4 lg:mb-6">
          <h1 class="text-xl lg:text-3xl font-extrabold text-white flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-3">
            <span>{{ company?.name }}</span>
            <span v-if="isAdmin" class="px-2 lg:px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Admin</span>
          </h1>
          <div class="flex items-center justify-center mt-2">
            <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-white/80 dark:bg-gray-800/80 text-primary-700 dark:text-primary-200">
              <svg class="w-3 h-3 lg:w-4 lg:h-4 mr-1 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm-4 4v4m0 0H8m4 0h4" /></svg>
              {{ company?.domain }}
            </span>
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full lg:w-auto">
          <NuxtLink to="/dashboard" class="inline-flex items-center justify-center px-3 lg:px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 text-primary-700 dark:text-primary-200 hover:bg-white hover:shadow-md dark:hover:bg-gray-700 transition text-sm lg:text-base">
            <svg class="w-4 h-4 lg:w-5 lg:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Dashboard
          </NuxtLink>
          <button v-if="isAdmin" @click="showInviteModal = true" class="inline-flex items-center justify-center px-3 lg:px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 shadow transition text-sm lg:text-base">
            <svg class="w-4 h-4 lg:w-5 lg:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
            <span class="hidden sm:inline">Invite Member</span>
            <span class="sm:hidden">Invite</span>
          </button>
          <button v-if="isAdmin" @click="showSettingsModal = true" class="inline-flex items-center justify-center px-3 lg:px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 hover:bg-white hover:shadow-md dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 transition text-sm lg:text-base">
            <svg class="w-4 h-4 lg:w-5 lg:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3" /></svg>
            Settings
          </button>
        </div>
      </div>
    </div>

    <!-- Members Section -->
    <div class="max-w-5xl mx-auto mb-6 lg:mb-10 px-4 lg:px-0">
      <div class="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl shadow-lg p-4 lg:p-8 mb-6 lg:mb-8">
        <h2 class="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-6 flex items-center">
          <svg class="w-5 h-5 lg:w-6 lg:h-6 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          Team Members
        </h2>
        <div v-if="loading" class="text-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 lg:h-10 lg:w-10 border-b-2 border-primary-600 mx-auto"></div>
        </div>
        <div v-else-if="members.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
          No members yet
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <div v-for="member in members" :key="member.id" class="bg-gradient-to-br from-primary-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-lg lg:rounded-xl shadow p-4 lg:p-5 flex flex-col items-center hover:shadow-xl transition touch-manipulation">
            <img :src="member.user?.avatar_url || `https://ui-avatars.com/api/?name=${member.user?.email}`" class="h-12 w-12 lg:h-16 lg:w-16 rounded-full border-4 border-white dark:border-gray-800 shadow mb-2 lg:mb-3" :alt="member.user?.email" />
            <div class="text-base lg:text-lg font-semibold text-gray-900 dark:text-white mb-1 text-center">{{ member.user?.full_name || member.user?.email }}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 mb-2 text-center truncate w-full">{{ member.user?.email }}</div>
            <span class="inline-flex items-center px-2 lg:px-3 py-1 rounded-full text-xs font-semibold" :class="member.role === 'admin' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'">
              <svg v-if="member.role === 'admin'" class="w-3 h-3 lg:w-4 lg:h-4 mr-1 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
              <svg v-else class="w-3 h-3 lg:w-4 lg:h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12l2 2 4-4" /></svg>
              {{ member.role }}
            </span>
            <div class="mt-2 text-xs text-gray-400 text-center">Joined: {{ new Date(member.joined_at).toLocaleDateString() }}</div>
            <div v-if="isAdmin" class="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2 mt-3 lg:mt-4 w-full">
              <button v-if="member.role !== 'admin'" @click="updateMemberRole(member.id, 'admin')" class="flex-1 text-primary-600 hover:text-primary-900 dark:hover:text-primary-400 text-xs font-medium py-1 px-2 rounded bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/40 transition">Make Admin</button>
              <button v-if="member.role === 'admin'" @click="updateMemberRole(member.id, 'member')" class="flex-1 text-yellow-600 hover:text-yellow-900 dark:hover:text-yellow-400 text-xs font-medium py-1 px-2 rounded bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/40 transition">Remove Admin</button>
              <button @click="removeMember(member.id)" class="flex-1 text-red-600 hover:text-red-900 dark:hover:text-red-400 text-xs font-medium py-1 px-2 rounded bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 transition">Remove</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Teams Section -->
      <div class="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl shadow-lg p-4 lg:p-8">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 lg:mb-6 space-y-2 sm:space-y-0">
          <h2 class="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <svg class="w-5 h-5 lg:w-6 lg:h-6 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6" /></svg>
            Teams
          </h2>
          <button v-if="isAdmin" @click="showNewTeamModal = true" class="inline-flex items-center justify-center px-3 lg:px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 shadow transition text-sm lg:text-base w-full sm:w-auto">
            <svg class="w-4 h-4 lg:w-5 lg:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            New Team
          </button>
        </div>
        <div v-if="teamsLoading" class="text-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 lg:h-10 lg:w-10 border-b-2 border-primary-600 mx-auto"></div>
        </div>
        <div v-else-if="teams.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
          No teams yet
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <div v-for="team in teams" :key="team.id" class="bg-gradient-to-br from-blue-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-lg lg:rounded-xl shadow p-4 lg:p-6 hover:shadow-xl transition cursor-pointer flex flex-col justify-between touch-manipulation" @click="showTeamDetails(team)">
            <div class="flex justify-between items-start">
              <div class="flex-1 min-w-0">
                <h3 class="text-base lg:text-lg font-bold text-gray-900 dark:text-white truncate">{{ team.name }}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">{{ team.description }}</p>
              </div>
              <div class="flex space-x-1 ml-2 flex-shrink-0">
                <!-- View Details button for all users -->
                <NuxtLink :to="`/teams/${team.id}`" @click.stop class="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 dark:hover:bg-green-900/20 rounded transition" title="View Team Details">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </NuxtLink>
                <!-- Admin-only buttons -->
                <template v-if="isAdmin">
                  <button @click.stop="handleEditTeam(team)" class="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition" title="Edit Team">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button @click.stop="deleteTeam(team.id)" class="p-1 text-red-400 hover:text-red-500 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition" title="Delete Team">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </template>
              </div>
            </div>
            <div class="mt-3 lg:mt-4">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Team Members</h4>
              <div class="flex -space-x-1 lg:-space-x-2">
                <img v-for="member in team.team_members.slice(0,4)" :key="member.id" :src="member.user?.avatar_url || `https://ui-avatars.com/api/?name=${member.user?.email}`" class="h-6 w-6 lg:h-8 lg:w-8 rounded-full border-2 border-white dark:border-gray-800" :alt="member.user?.email" :title="member.user?.email" />
                <span v-if="team.team_members.length > 4" class="h-6 w-6 lg:h-8 lg:w-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-2xs lg:text-xs text-gray-600 dark:text-gray-300 border-2 border-white dark:border-gray-800">+{{ team.team_members.length - 4 }}</span>
              </div>
              <div class="mt-2 text-xs lg:text-sm text-gray-500 dark:text-gray-400">
                {{ team.team_members.length }} member{{ team.team_members.length !== 1 ? 's' : '' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Floating Action Button (Admin Only) -->
    <div v-if="isAdmin" class="lg:hidden fixed bottom-6 right-4 z-40">
      <div class="relative">
        <button
          @click="showMobileFAB = !showMobileFAB"
          class="w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center touch-manipulation"
        >
          <svg class="w-6 h-6" :class="{ 'transform rotate-45': showMobileFAB }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        
        <!-- FAB Menu -->
        <div v-if="showMobileFAB" class="absolute bottom-16 right-0 flex flex-col space-y-2">
          <button
            @click="showInviteModal = true; showMobileFAB = false"
            class="flex items-center space-x-2 px-3 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-all text-sm whitespace-nowrap"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            <span>Invite Member</span>
          </button>
          <button
            @click="showNewTeamModal = true; showMobileFAB = false"
            class="flex items-center space-x-2 px-3 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-all text-sm whitespace-nowrap"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>New Team</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Invite Member Modal -->
    <div v-if="showInviteModal" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-fade-in">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-primary-600 to-blue-500 dark:from-primary-800 dark:to-blue-700">
          <h3 class="text-lg font-medium text-white">Invite Team Member</h3>
          <button @click="showInviteModal = false" class="text-white hover:text-gray-200 focus:outline-none">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <div class="p-6">
          <form @submit.prevent="handleInviteMember" class="space-y-6">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                v-model="newMember.email"
                class="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                placeholder="colleague@example.com"
                required
              />
            </div>
            <div>
              <label for="role" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
              <select
                id="role"
                v-model="newMember.role"
                class="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div class="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center justify-center"
                @click="showInviteModal = false"
              >
                <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors flex items-center justify-center"
              >
                <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Invite
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- New Team Modal -->
    <div v-if="showNewTeamModal" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-fade-in">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-primary-600 to-blue-500 dark:from-primary-800 dark:to-blue-700">
          <h3 class="text-lg font-medium text-white">Create New Team</h3>
          <button @click="showNewTeamModal = false" class="text-white hover:text-gray-200 focus:outline-none">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <div class="p-6">
          <form @submit.prevent="handleCreateTeam" class="space-y-6">
            <div>
              <label for="teamName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Team Name</label>
              <input
                type="text"
                id="teamName"
                v-model="newTeam.name"
                class="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                placeholder="Enter team name..."
                required
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
            <div class="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center justify-center"
                @click="showNewTeamModal = false"
              >
                <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors flex items-center justify-center"
              >
                <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Create Team
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Edit Team Modal -->
    <div v-if="showEditTeamModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div class="p-6">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Edit Team</h3>
          <div v-if="errorMessage" class="mt-2 p-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md text-sm">
            {{ errorMessage }}
          </div>
          <form @submit.prevent="handleUpdateTeam" class="mt-4 space-y-4">
            <div>
              <label for="editTeamName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Team Name</label>
              <input
                type="text"
                id="editTeamName"
                v-model="editingTeam.name"
                class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
            </div>
            <div>
              <label for="editTeamDescription" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <textarea
                id="editTeamDescription"
                v-model="editingTeam.description"
                rows="3"
                class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              ></textarea>
            </div>
            <div class="flex justify-end space-x-3">
              <button
                type="button"
                class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                @click="showEditTeamModal = false"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Update Team
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Team Details Modal -->
    <div v-if="showTeamDetailsModal" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-primary-600 to-blue-500 dark:from-primary-800 dark:to-blue-700">
          <div class="flex-1 min-w-0">
            <h3 class="text-lg lg:text-xl font-medium text-white truncate">{{ selectedTeam?.name }}</h3>
            <p class="text-sm text-white/80 truncate">{{ selectedTeam?.description }}</p>
          </div>
          <button
            @click="showTeamDetailsModal = false"
            class="ml-4 text-white hover:text-gray-200 focus:outline-none flex-shrink-0"
          >
            <svg class="h-6 w-6 lg:h-7 lg:w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="p-4 lg:p-6">
          <!-- Team Members List -->
          <div>
            <h4 class="text-base lg:text-lg font-medium text-gray-900 dark:text-white mb-4">Team Members</h4>
            <div class="space-y-3 lg:space-y-4">
              <div
                v-for="member in selectedTeam?.team_members"
                :key="member.id"
                class="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 lg:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-3 sm:space-y-0"
              >
                <div class="flex items-center space-x-3 lg:space-x-4 min-w-0 flex-1">
                  <img
                    :src="member.user?.avatar_url || `https://ui-avatars.com/api/?name=${member.user?.email}`"
                    class="h-8 w-8 lg:h-10 lg:w-10 rounded-full flex-shrink-0"
                    :alt="member.user?.email"
                  />
                  <div class="min-w-0 flex-1">
                    <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {{ member.user?.full_name || member.user?.email }}
                    </p>
                    <p class="text-xs lg:text-sm text-gray-500 dark:text-gray-400 truncate">{{ member.user?.email }}</p>
                  </div>
                </div>
                <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 flex-shrink-0">
                  <span
                    class="px-2 py-1 text-xs font-medium rounded-full"
                    :class="{
                      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': member.role === 'admin',
                      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200': member.role === 'member'
                    }"
                  >
                    {{ member.role }}
                  </span>
                  <div v-if="isAdmin" class="flex flex-wrap gap-2">
                    <button
                      v-if="member.role !== 'admin'"
                      @click="updateTeamMemberRole(member.id, 'admin')"
                      class="text-xs px-2 py-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition"
                    >
                      Make Admin
                    </button>
                    <button
                      v-if="member.role === 'admin'"
                      @click="updateTeamMemberRole(member.id, 'member')"
                      class="text-xs px-2 py-1 text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded transition"
                    >
                      Remove Admin
                    </button>
                    <button
                      @click="removeTeamMember(member.id)"
                      class="text-xs px-2 py-1 text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Add Member Button -->
          <div v-if="isAdmin" class="mt-6">
            <button
              @click="showInviteTeamMemberModal = true; showTeamDetailsModal = false"
              class="w-full px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors flex items-center justify-center"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Add Team Member
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Team Member Invite Modal -->
    <div v-if="showInviteTeamMemberModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div class="p-6">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Invite Team Member</h3>
          <div v-if="errorMessage" class="mt-2 p-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md text-sm">
            {{ errorMessage }}
          </div>
          <form @submit.prevent="handleInviteTeamMember" class="mt-4 space-y-4">
            <div>
              <label for="memberEmail" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
              <input
                type="email"
                id="memberEmail"
                v-model="newTeamMember.email"
                class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                placeholder="colleague@example.com"
                required
              />
            </div>
            <div class="flex justify-end space-x-3">
              <button
                type="button"
                class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                @click="showInviteTeamMemberModal = false"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSupabaseClient, useSupabaseUser } from '#imports'
import { useTeam } from '~/composables/useTeam'

const client = useSupabaseClient()
const user = useSupabaseUser()

const company = ref(null)
const members = ref([])
const teams = ref([])
const loading = ref(false)
const teamsLoading = ref(false)
const errorMessage = ref('')
const isAdmin = ref(false)

const showInviteModal = ref(false)
const showNewTeamModal = ref(false)
const showSettingsModal = ref(false)
const showEditTeamModal = ref(false)
const showTeamDetailsModal = ref(false)
const selectedTeam = ref(null)

const newMember = ref({
  email: '',
  role: 'member'
})

const newTeam = ref({
  name: '',
  description: ''
})

const editingTeam = ref(null)

const showInviteTeamMemberModal = ref(false)
const newTeamMember = ref({
  email: ''
})

// Mobile state
const showMobileFAB = ref(false)

const { createTeam, editTeam } = useTeam()

// Fetch company and members
const fetchCompany = async () => {
  try {
    loading.value = true
    errorMessage.value = ''

    const { data: companyMember, error } = await client
      .from('company_members')
      .select(`
        *,
        company:company_id (*)
      `)
      .eq('user_id', user.value.id)
      .single()

    if (error) throw error

    if (companyMember?.company) {
      company.value = companyMember.company
      isAdmin.value = companyMember.role === 'admin'
      await fetchMembers()
      await fetchTeams()
    }
  } catch (err) {
    console.error('Error fetching company:', err)
    errorMessage.value = 'Failed to load company information'
  } finally {
    loading.value = false
  }
}

// Fetch company members
const fetchMembers = async () => {
  try {
    // First get company members
    const { data: companyMembers, error: membersError } = await client
      .from('company_members')
      .select('*')
      .eq('company_id', company.value.id)
      .order('joined_at', { ascending: false })

    if (membersError) throw membersError

    // Then get profiles for each member
    const userIds = companyMembers.map(member => member.user_id)
    const { data: profiles, error: profilesError } = await client
      .from('profiles')
      .select('id, email, full_name, avatar_url')
      .in('id', userIds)

    if (profilesError) throw profilesError

    // Create a map of profiles for quick lookup
    const profileMap = profiles.reduce((acc, profile) => {
      acc[profile.id] = profile
      return acc
    }, {})

    // Combine the data
    members.value = companyMembers.map(member => ({
      ...member,
      user: profileMap[member.user_id]
    }))
  } catch (error) {
    console.error('Error fetching members:', error)
    errorMessage.value = 'Failed to load members'
  }
}

// Fetch teams
const fetchTeams = async () => {
  try {
    teamsLoading.value = true
    // First get teams
    const { data: teamsData, error: teamsError } = await client
      .from('teams')
      .select('*')
      .eq('company_id', company.value.id)
      .order('created_at', { ascending: false })

    if (teamsError) throw teamsError

    // Then get team members for these teams
    const teamIds = teamsData.map(team => team.id)
    const { data: members, error: membersError } = await client
      .from('team_members')
      .select('*')
      .in('team_id', teamIds)

    if (membersError) throw membersError

    // Get profiles for all team members
    const userIds = [...new Set(members.map(member => member.user_id))]
    const { data: profiles, error: profilesError } = await client
      .from('profiles')
      .select('id, email, full_name, avatar_url')
      .in('id', userIds)

    if (profilesError) throw profilesError

    // Create a map of profiles for quick lookup
    const profileMap = profiles.reduce((acc, profile) => {
      acc[profile.id] = {
        ...profile,
        user_metadata: {
          avatar_url: profile.avatar_url
        }
      }
      return acc
    }, {})

    // Combine the data
    teams.value = teamsData.map(team => ({
      ...team,
      team_members: members
        .filter(member => member.team_id === team.id)
        .map(member => ({
          ...member,
          user: profileMap[member.user_id]
        }))
    }))
  } catch (error) {
    console.error('Error fetching teams:', error)
    errorMessage.value = 'Failed to load teams'
  } finally {
    teamsLoading.value = false
  }
}

// Handle member invite
const handleInviteMember = async () => {
  try {
    errorMessage.value = ''

    // First, check if user exists
    const { data: existingUser, error: userError } = await client
      .from('profiles')
      .select('id')
      .eq('email', newMember.value.email)
      .maybeSingle()

    if (userError) {
      console.error('Error checking user:', userError)
      errorMessage.value = 'Failed to check if user exists'
      return
    }

    if (existingUser) {
      // Check if user is already a member
      const { count, error: countError } = await client
        .from('company_members')
        .select('*', { count: 'exact', head: true })
        .eq('company_id', company.value.id)
        .eq('user_id', existingUser.id)

      if (countError) {
        console.error('Error checking member:', countError)
        errorMessage.value = 'Failed to check if user is already a member'
        return
      }

      if (count > 0) {
        errorMessage.value = 'User is already a member of this company'
        return
      }

      // Add existing user to company
      const { error: memberError } = await client
        .from('company_members')
        .insert({
          company_id: company.value.id,
          user_id: existingUser.id,
          role: newMember.value.role,
          joined_at: new Date().toISOString()
        })

      if (memberError) {
        console.error('Error adding member:', memberError)
        errorMessage.value = 'Failed to add member to company'
        return
      }

      // Close modal and reset form
      showInviteModal.value = false
      newMember.value = { email: '', role: 'member' }
      
      // Refresh members list
      await fetchMembers()
      
      // Refresh teams list to update member counts
      await fetchTeams()
    } else {
      // TODO: Implement email invitation system
      errorMessage.value = 'Email invitation system not implemented yet. Please ask the user to sign up first.'
    }
  } catch (err) {
    console.error('Error inviting member:', err)
    errorMessage.value = err.message || 'Failed to invite member'
  }
}

// Handle team creation
const handleCreateTeam = async () => {
  try {
    errorMessage.value = ''

    if (!newTeam.value.name) {
      errorMessage.value = 'Team name is required'
      return
    }

    const team = await createTeam({
      name: newTeam.value.name,
      description: newTeam.value.description,
      company_id: company.value.id
    })

    if (team) {
      showNewTeamModal.value = false
      newTeam.value = { name: '', description: '' }
      await fetchTeams()
    }
  } catch (err) {
    console.error('Error creating team:', err)
    errorMessage.value = err.message || 'Failed to create team'
  }
}

// Update member role
const updateMemberRole = async (memberId, newRole) => {
  try {
    errorMessage.value = ''

    const { error } = await client
      .from('company_members')
      .update({ role: newRole })
      .eq('id', memberId)

    if (error) throw error

    await fetchMembers()
  } catch (err) {
    console.error('Error updating member role:', err)
    errorMessage.value = err.message || 'Failed to update member role'
  }
}

// Remove member
const removeMember = async (memberId) => {
  try {
    errorMessage.value = ''

    const { error } = await client
      .from('company_members')
      .delete()
      .eq('id', memberId)

    if (error) throw error

    await fetchMembers()
  } catch (err) {
    console.error('Error removing member:', err)
    errorMessage.value = err.message || 'Failed to remove member'
  }
}

// Delete team
const deleteTeam = async (teamId) => {
  try {
    errorMessage.value = ''

    const { error } = await client
      .from('teams')
      .delete()
      .eq('id', teamId)

    if (error) throw error

    await fetchTeams()
  } catch (err) {
    console.error('Error deleting team:', err)
    errorMessage.value = err.message || 'Failed to delete team'
  }
}

const handleEditTeam = async (team) => {
  editingTeam.value = { ...team }
  showEditTeamModal.value = true
}

const handleUpdateTeam = async () => {
  try {
    if (!editingTeam.value.name.trim()) {
      errorMessage.value = 'Team name is required'
      return
    }

    const updatedTeam = await editTeam(editingTeam.value.id, {
      name: editingTeam.value.name,
      description: editingTeam.value.description
    })

    if (updatedTeam) {
      // Update the local teams state
      const index = teams.value.findIndex(t => t.id === editingTeam.value.id)
      if (index !== -1) {
        teams.value[index] = { ...teams.value[index], ...updatedTeam }
      }
      
      showEditTeamModal.value = false
      editingTeam.value = null
      errorMessage.value = ''
    }
  } catch (err) {
    console.error('Error updating team:', err)
    errorMessage.value = err.message || 'Failed to update team'
  }
}

const showTeamDetails = (team) => {
  selectedTeam.value = team
  showTeamDetailsModal.value = true
}

const updateTeamMemberRole = async (memberId, newRole) => {
  try {
    errorMessage.value = ''
    const { error } = await client
      .from('team_members')
      .update({ role: newRole })
      .eq('id', memberId)

    if (error) throw error

    // Update the local state
    if (selectedTeam.value) {
      const member = selectedTeam.value.team_members.find(m => m.id === memberId)
      if (member) {
        member.role = newRole
      }
    }
  } catch (err) {
    console.error('Error updating team member role:', err)
    errorMessage.value = err.message || 'Failed to update team member role'
  }
}

const removeTeamMember = async (memberId) => {
  try {
    errorMessage.value = ''
    const { error } = await client
      .from('team_members')
      .delete()
      .eq('id', memberId)

    if (error) throw error

    // Update the local state
    if (selectedTeam.value) {
      selectedTeam.value.team_members = selectedTeam.value.team_members.filter(m => m.id !== memberId)
    }
  } catch (err) {
    console.error('Error removing team member:', err)
    errorMessage.value = err.message || 'Failed to remove team member'
  }
}

// Handle team member invite
const handleInviteTeamMember = async () => {
  try {
    errorMessage.value = ''

    if (!newTeamMember.value.email) {
      errorMessage.value = 'Email is required'
      return
    }

    if (!selectedTeam.value) {
      errorMessage.value = 'No team selected'
      return
    }

    // First check if user exists
    const { data: profile, error: profileError } = await client
      .from('profiles')
      .select('id')
      .eq('email', newTeamMember.value.email)
      .single()

    if (profileError) {
      if (profileError.code === 'PGRST116') {
        errorMessage.value = 'User not found. They need to sign up first.'
        return
      }
      throw profileError
    }

    // Check if user is already a team member
    const { count, error: countError } = await client
      .from('team_members')
      .select('*', { count: 'exact', head: true })
      .eq('team_id', selectedTeam.value.id)
      .eq('user_id', profile.id)

    if (countError) throw countError

    if (count > 0) {
      errorMessage.value = 'User is already a member of this team'
      return
    }

    // Add user to team
    const { error: addError } = await client
      .from('team_members')
      .insert({
        team_id: selectedTeam.value.id,
        user_id: profile.id,
        role: 'member'
      })

    if (addError) throw addError

    // Close modal and reset form
    showInviteTeamMemberModal.value = false
    newTeamMember.value = { email: '' }
    
    // Refresh teams list
    await fetchTeams()
    
    // Update selected team if it's open
    if (selectedTeam.value) {
      const updatedTeam = teams.value.find(t => t.id === selectedTeam.value.id)
      if (updatedTeam) {
        selectedTeam.value = updatedTeam
      }
    }
  } catch (err) {
    console.error('Error inviting team member:', err)
    errorMessage.value = err.message || 'Failed to invite team member'
  }
}

onMounted(async () => {
  if (user.value) {
    await fetchCompany()
  }
})
</script>

<style scoped>
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

.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
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