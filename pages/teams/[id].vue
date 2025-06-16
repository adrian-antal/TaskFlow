<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-800 shadow-xl">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
          <div class="flex-1">
            <NuxtLink to="/dashboard" class="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm mb-4">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </NuxtLink>
            <h1 class="text-3xl lg:text-4xl font-bold text-white mb-2">{{ team?.name || 'Loading...' }}</h1>
            <p class="text-blue-100 text-lg max-w-2xl">{{ team?.description || 'Team details loading...' }}</p>
            <div class="flex items-center mt-4 text-blue-100">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              {{ teamMembers.length }} Team Member{{ teamMembers.length !== 1 ? 's' : '' }}
            </div>
          </div>
          <button
            v-if="isTeamAdmin && !loading"
            class="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            @click="showAddMemberModal = true"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Member
          </button>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="team" class="space-y-8">
        <!-- Team Members -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 lg:p-8">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl lg:text-2xl font-bold text-gray-900 flex items-center">
              <svg class="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.196-2.121M9 20H4v-2a3 3 0 015.196-2.121m0 0a5.002 5.002 0 019.608 0m-9.608 0a5.002 5.002 0 019.608 0M9 9a3 3 0 116 0 3 3 0 01-6 0z" />
              </svg>
              Team Members
            </h2>
            <div class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {{ teamMembers.length }} member{{ teamMembers.length !== 1 ? 's' : '' }}
            </div>
          </div>
          
          <!-- Loading State -->
          <div v-if="loading" class="text-center py-12">
            <svg class="w-12 h-12 mx-auto text-gray-400 mb-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <p class="text-gray-500">Loading team members...</p>
          </div>

          <!-- Empty State -->
          <div v-else-if="!teamMembers.length" class="text-center py-12">
            <svg class="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <p class="text-gray-500 mb-4">No team members found</p>
            <button
              v-if="isTeamAdmin && !loading"
              @click="showAddMemberModal = true"
              class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add First Member
            </button>
          </div>

          <!-- Members Grid -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div 
              v-for="member in teamMembers" 
              :key="member.id" 
              class="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              <!-- Member Avatar & Info -->
              <div class="mb-4">
                <div class="flex items-center space-x-3 mb-3">
                  <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {{ (member.name || member.email).charAt(0).toUpperCase() }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="font-semibold text-gray-900 truncate">{{ member.name || 'Unknown User' }}</h3>
                    <p class="text-sm text-gray-500 truncate">{{ member.email }}</p>
                  </div>
                </div>
                <div class="flex justify-center">
                  <span
                    class="px-3 py-1 rounded-full text-xs font-semibold inline-block"
                    :class="{
                      'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200': member.role === 'admin',
                      'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-300': member.role === 'member'
                    }"
                  >
                    {{ member.role === 'admin' ? '👑 Admin' : '👤 Member' }}
                  </span>
                </div>
              </div>

              <!-- Member Details -->
              <div class="space-y-2 mb-4">
                <div class="flex items-center text-sm text-gray-600">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Joined {{ new Date(member.joined_at || member.created_at).toLocaleDateString() }}
                </div>
              </div>

              <!-- Admin Actions -->
              <div v-if="isTeamAdmin && member.user_id !== currentUserId" class="flex space-x-2">
                <button
                  v-if="member.role === 'member'"
                  class="flex-1 px-3 py-2 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 hover:from-green-100 hover:to-emerald-100 border border-green-200 rounded-lg text-xs font-medium transition-all duration-200"
                  @click="promoteToAdmin(member)"
                >
                  ⬆️ Promote
                </button>
                <button
                  class="flex-1 px-3 py-2 bg-gradient-to-r from-red-50 to-pink-50 text-red-700 hover:from-red-100 hover:to-pink-100 border border-red-200 rounded-lg text-xs font-medium transition-all duration-200"
                  @click="removeMember(member)"
                >
                  🗑️ Remove
                </button>
              </div>

              <!-- Current User Badge -->
              <div v-else-if="member.user_id === currentUserId" class="text-center">
                <span class="inline-flex items-center px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200 rounded-full text-xs font-medium">
                  ✨ That's you!
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Team Settings -->
        <div v-if="isTeamAdmin" class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 lg:p-8">
          <h2 class="text-xl lg:text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <svg class="w-6 h-6 mr-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Team Settings
          </h2>
          <form @submit.prevent="updateTeam" class="space-y-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-3">Team Name</label>
                <input
                  v-model="teamSettings.name"
                  type="text"
                  class="block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white/70 backdrop-blur-sm text-base p-4 transition-all duration-200"
                  placeholder="Enter team name..."
                />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-3">Description</label>
                <textarea
                  v-model="teamSettings.description"
                  rows="4"
                  class="block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white/70 backdrop-blur-sm text-base p-4 transition-all duration-200"
                  placeholder="Describe your team's purpose..."
                ></textarea>
              </div>
            </div>
            <div class="flex justify-end pt-4">
              <button 
                type="submit" 
                class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Add Member Modal -->
    <div v-if="showAddMemberModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" @click="showAddMemberModal = false">
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all" @click.stop>
        <!-- Modal Header -->
        <div class="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-2xl">
          <h3 class="text-lg font-semibold text-white">Add Team Member</h3>
          <button @click="showAddMemberModal = false" class="text-white hover:text-gray-200 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Content -->
        <div class="p-6">
          <form @submit.prevent="addMember" class="space-y-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">Email Address</label>
              <input
                v-model="newMember.email"
                type="email"
                required
                class="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-4 text-base transition-all duration-200"
                placeholder="Enter email address..."
              />
              <p class="text-xs text-gray-500 mt-2">The user must already have an account in the system</p>
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">Role</label>
              <select
                v-model="newMember.role"
                class="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-4 text-base transition-all duration-200"
              >
                <option value="member">👤 Member - Can view and participate</option>
                <option value="admin">👑 Admin - Can manage team and members</option>
              </select>
            </div>

            <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button 
                type="button" 
                @click="showAddMemberModal = false"
                class="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                class="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Member
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useSupabaseClient, useSupabaseUser } from '#imports'
import { useRoute } from 'vue-router'

const route = useRoute()
const client = useSupabaseClient()
const user = useSupabaseUser()
const team = ref(null)
const teamMembers = ref([])
const loading = ref(true)
const showAddMemberModal = ref(false)

const newMember = ref({
  email: '',
  role: 'member'
})

const teamSettings = ref({
  name: '',
  description: ''
})

const currentUserId = computed(() => user.value?.id)

const isTeamAdmin = computed(() => {
  if (!team.value || !user.value || !teamMembers.value.length) return false
  const member = teamMembers.value.find(m => m.user_id === user.value.id)
  console.log('Admin check:', { userId: user.value.id, member, role: member?.role })
  return member?.role === 'admin'
})

// Fetch team details
const fetchTeam = async () => {
  try {
    const { data, error } = await client
      .from('teams')
      .select('*')
      .eq('id', route.params.id)
      .single()

    if (error) throw error
    team.value = data
    teamSettings.value = { ...data }
  } catch (err) {
    console.error('Error fetching team:', err)
  }
}

// Fetch team members with improved error handling
const fetchTeamMembers = async () => {
  try {
    loading.value = true
    
    // Use the more reliable approach: separate queries
    const { data: members, error: membersError } = await client
      .from('team_members')
      .select('*')
      .eq('team_id', route.params.id)

    if (membersError) throw membersError

    // Get user details separately
    const userIds = members.map(m => m.user_id).filter(Boolean)
    if (userIds.length > 0) {
      const { data: profiles, error: profilesError } = await client
        .from('profiles')
        .select('id, email, full_name, first_name, last_name')
        .in('id', userIds)

      if (profilesError) throw profilesError

      const profileMap = profiles.reduce((acc, profile) => {
        acc[profile.id] = profile
        return acc
      }, {})

      teamMembers.value = members.map(member => {
        const profile = profileMap[member.user_id]
        return {
          ...member,
          email: profile?.email || 'No email',
          name: profile?.full_name || 
                (profile?.first_name && profile?.last_name 
                  ? `${profile.first_name} ${profile.last_name}` 
                  : profile?.email) || 'Unknown User'
        }
      })
    } else {
      teamMembers.value = []
    }
  } catch (err) {
    console.error('Error fetching team members:', err)
    
    // Final fallback: just return team members without profile data
    try {
      const { data: members, error: membersError } = await client
        .from('team_members')
        .select('*')
        .eq('team_id', route.params.id)

      if (membersError) throw membersError
      
      teamMembers.value = members.map(member => ({
        ...member,
        email: 'No email',
        name: 'Unknown User'
      }))
    } catch (fallbackErr) {
      console.error('All team member queries failed:', fallbackErr)
      teamMembers.value = []
    }
  } finally {
    loading.value = false
  }
}

// Add new member
const addMember = async () => {
  // Double-check admin status
  if (!isTeamAdmin.value) {
    alert('You do not have permission to add members to this team.')
    showAddMemberModal.value = false
    return
  }

  try {
    // First get the user by email
    const { data: profile, error: profileError } = await client
      .from('profiles')
      .select('id')
      .eq('email', newMember.value.email)
      .single()

    if (profileError) throw profileError

    // Add user to team
    const { error: memberError } = await client
      .from('team_members')
      .insert({
        team_id: route.params.id,
        user_id: profile.id,
        role: newMember.value.role,
        joined_at: new Date().toISOString()
      })

    if (memberError) throw memberError

    await fetchTeamMembers()
    showAddMemberModal.value = false
    newMember.value = { email: '', role: 'member' }
  } catch (err) {
    console.error('Error adding member:', err)
    alert('Error adding member. Please check if the email exists in the system.')
  }
}

// Promote member to admin
const promoteToAdmin = async (member) => {
  if (!isTeamAdmin.value) {
    alert('You do not have permission to promote members.')
    return
  }

  try {
    const { error } = await client
      .from('team_members')
      .update({ role: 'admin' })
      .eq('id', member.id)

    if (error) throw error
    await fetchTeamMembers()
  } catch (err) {
    console.error('Error promoting member:', err)
  }
}

// Remove member from team
const removeMember = async (member) => {
  if (!isTeamAdmin.value) {
    alert('You do not have permission to remove members.')
    return
  }

  if (!confirm('Are you sure you want to remove this member?')) return

  try {
    const { error } = await client
      .from('team_members')
      .delete()
      .eq('id', member.id)

    if (error) throw error
    await fetchTeamMembers()
  } catch (err) {
    console.error('Error removing member:', err)
  }
}

// Update team settings
const updateTeam = async () => {
  if (!isTeamAdmin.value) {
    alert('You do not have permission to update team settings.')
    return
  }

  try {
    const { error } = await client
      .from('teams')
      .update({
        name: teamSettings.value.name,
        description: teamSettings.value.description
      })
      .eq('id', route.params.id)

    if (error) throw error
    await fetchTeam()
    alert('Team settings updated successfully!')
  } catch (err) {
    console.error('Error updating team:', err)
    alert('Error updating team settings.')
  }
}

onMounted(async () => {
  await Promise.all([
    fetchTeam(),
    fetchTeamMembers()
  ])
})
</script>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style> 