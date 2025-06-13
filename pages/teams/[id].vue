<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <NuxtLink to="/dashboard" class="text-blue-600 hover:text-blue-800">
        ← Back to Dashboard
      </NuxtLink>
    </div>

    <div v-if="team" class="space-y-8">
      <!-- Team Header -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold">{{ team.name }}</h1>
            <p class="text-gray-600 mt-2">{{ team.description }}</p>
          </div>
          <button
            v-if="isTeamAdmin"
            class="btn-primary"
            @click="showAddMemberModal = true"
          >
            Add Member
          </button>
        </div>
      </div>

      <!-- Team Members -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-6">Team Members</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead>
              <tr class="border-b">
                <th class="text-left py-3 px-4">Email</th>
                <th class="text-left py-3 px-4">Role</th>
                <th class="text-left py-3 px-4">Joined</th>
                <th v-if="isTeamAdmin" class="text-right py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="member in teamMembers" :key="member.id" class="border-b">
                <td class="py-3 px-4">{{ member.email }}</td>
                <td class="py-3 px-4">
                  <span
                    class="px-2 py-1 rounded text-sm"
                    :class="{
                      'bg-blue-100 text-blue-800': member.role === 'admin',
                      'bg-gray-100 text-gray-800': member.role === 'member'
                    }"
                  >
                    {{ member.role }}
                  </span>
                </td>
                <td class="py-3 px-4">
                  {{ new Date(member.joined_at).toLocaleDateString() }}
                </td>
                <td v-if="isTeamAdmin" class="py-3 px-4 text-right">
                  <button
                    v-if="member.role === 'member'"
                    class="text-blue-600 hover:text-blue-800 mr-4"
                    @click="promoteToAdmin(member)"
                  >
                    Promote to Admin
                  </button>
                  <button
                    class="text-red-600 hover:text-red-800"
                    @click="removeMember(member)"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Team Settings -->
      <div v-if="isTeamAdmin" class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-6">Team Settings</h2>
        <form @submit.prevent="updateTeam" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Team Name</label>
            <input
              v-model="teamSettings.name"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              v-model="teamSettings.description"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            ></textarea>
          </div>
          <div class="flex justify-end">
            <button type="submit" class="btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Add Member Modal -->
    <Modal v-model="showAddMemberModal" title="Add Team Member">
      <form @submit.prevent="addMember" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="newMember.email"
            type="email"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Role</label>
          <select
            v-model="newMember.role"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div class="flex justify-end">
          <button type="submit" class="btn-primary">Add Member</button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useSupabaseClient } from '#imports'
import { useRoute } from 'vue-router'

const route = useRoute()
const client = useSupabaseClient()
const team = ref(null)
const teamMembers = ref([])
const showAddMemberModal = ref(false)

const newMember = ref({
  email: '',
  role: 'member'
})

const teamSettings = ref({
  name: '',
  description: ''
})

const isTeamAdmin = computed(() => {
  if (!team.value) return false
  const member = teamMembers.value.find(m => m.user_id === client.auth.user()?.id)
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

// Fetch team members
const fetchTeamMembers = async () => {
  try {
    const { data, error } = await client
      .from('team_members')
      .select(`
        *,
        user:user_id (
          email
        )
      `)
      .eq('team_id', route.params.id)

    if (error) throw error
    teamMembers.value = data.map(member => ({
      ...member,
      email: member.user.email
    }))
  } catch (err) {
    console.error('Error fetching team members:', err)
  }
}

// Add new member
const addMember = async () => {
  try {
    // First get the user by email
    const { data: user, error: userError } = await client
      .from('users')
      .select('id')
      .eq('email', newMember.value.email)
      .single()

    if (userError) throw userError

    // Add user to team
    const { error: memberError } = await client
      .from('team_members')
      .insert({
        team_id: route.params.id,
        user_id: user.id,
        role: newMember.value.role
      })

    if (memberError) throw memberError

    await fetchTeamMembers()
    showAddMemberModal.value = false
    newMember.value = { email: '', role: 'member' }
  } catch (err) {
    console.error('Error adding member:', err)
  }
}

// Promote member to admin
const promoteToAdmin = async (member) => {
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
  } catch (err) {
    console.error('Error updating team:', err)
  }
}

onMounted(async () => {
  await fetchTeam()
  await fetchTeamMembers()
})
</script> 