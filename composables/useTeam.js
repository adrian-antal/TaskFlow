import { ref, computed } from 'vue'
import { useSupabaseClient, useSupabaseUser } from '#imports'

export const useTeam = () => {
  const client = useSupabaseClient()
  const user = useSupabaseUser()

  const teams = ref([])
  const currentTeam = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchTeams = async (companyId) => {
    try {
      loading.value = true
      error.value = null

      // First get the teams where the user is a member
      const { data: teamMemberships, error: membershipsError } = await client
        .from('team_members')
        .select('team_id')
        .eq('user_id', user.value.id)

      if (membershipsError) throw membershipsError

      if (!teamMemberships || teamMemberships.length === 0) {
        teams.value = []
        return
      }

      // Then get the team details for those teams
      const teamIds = teamMemberships.map(m => m.team_id)
      const { data, error: fetchError } = await client
        .from('teams')
        .select('*')
        .eq('company_id', companyId)
        .in('id', teamIds)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      teams.value = data
    } catch (err) {
      console.error('Error fetching teams:', err)
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const createTeam = async (teamData) => {
    try {
      // Create the team
      const { data: team, error: teamError } = await client
        .from('teams')
        .insert({
          name: teamData.name,
          description: teamData.description,
          company_id: teamData.company_id,
          created_by: user.value.id
        })
        .select()
        .single()

      if (teamError) throw teamError

      // Add creator as team admin
      const { error: memberError } = await client
        .from('team_members')
        .insert({
          team_id: team.id,
          user_id: user.value.id,
          role: 'admin'
        })

      if (memberError) {
        // If adding member fails, delete the team
        await client.from('teams').delete().eq('id', team.id)
        throw memberError
      }

      // Refresh teams list
      await fetchTeams(teamData.company_id)
      return team
    } catch (error) {
      console.error('Error creating team:', error)
      throw error
    }
  }

  const addTeamMember = async (teamId, userId, role = 'member') => {
    try {
      const { error } = await client
        .from('team_members')
        .insert({
          team_id: teamId,
          user_id: userId,
          role
        })

      if (error) throw error
    } catch (error) {
      console.error('Error adding team member:', error)
      throw error
    }
  }

  const removeTeamMember = async (teamId, userId) => {
    try {
      const { error } = await client
        .from('team_members')
        .delete()
        .match({ team_id: teamId, user_id: userId })

      if (error) throw error
    } catch (error) {
      console.error('Error removing team member:', error)
      throw error
    }
  }

  const editTeam = async (teamId, updates) => {
    try {
      // First get the team to get its company_id
      const { data: existingTeam, error: fetchError } = await client
        .from('teams')
        .select('company_id')
        .eq('id', teamId)
        .single()

      if (fetchError) throw fetchError

      // Update the team
      const { data, error } = await client
        .from('teams')
        .update({
          name: updates.name,
          description: updates.description,
          updated_at: new Date().toISOString()
        })
        .eq('id', teamId)
        .select()
        .single()

      if (error) throw error

      // Update the teams list with the correct company_id
      if (existingTeam?.company_id) {
        // Update the local teams state
        const index = teams.value.findIndex(t => t.id === teamId)
        if (index !== -1) {
          teams.value[index] = { ...teams.value[index], ...data }
        }
        // Also refresh from the server
        await fetchTeams(existingTeam.company_id)
      }

      return data
    } catch (error) {
      console.error('Error editing team:', error)
      throw error
    }
  }

  const setCurrentTeam = async (teamId) => {
    try {
      // First get the team
      const { data: team, error: teamError } = await client
        .from('teams')
        .select('*')
        .eq('id', teamId)
        .single()

      if (teamError) throw teamError

      // Then get team members
      const { data: members, error: membersError } = await client
        .from('team_members')
        .select('*')
        .eq('team_id', teamId)

      if (membersError) throw membersError

      // Get profiles for all team members
      const userIds = members.map(member => member.user_id)
      const { data: profiles, error: profilesError } = await client
        .from('profiles')
        .select('*')
        .in('id', userIds)

      if (profilesError) throw profilesError

      // Create a map of profiles for quick lookup
      const profileMap = profiles.reduce((acc, profile) => {
        acc[profile.id] = profile
        return acc
      }, {})

      // Combine the data
      const teamWithMembers = {
        ...team,
        team_members: members.map(member => ({
          ...member,
          user: profileMap[member.user_id]
        }))
      }

      currentTeam.value = teamWithMembers
      return teamWithMembers
    } catch (error) {
      console.error('Error setting current team:', error)
      throw error
    }
  }

  const isTeamAdmin = computed(() => {
    if (!currentTeam.value || !user.value) return false
    const member = currentTeam.value.team_members?.find(m => m.user_id === user.value.id)
    return member?.role === 'admin'
  })

  const inviteTeamMember = async (teamId, email) => {
    try {
      // First check if user exists
      const { data: profile, error: profileError } = await client
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single()

      if (profileError) {
        if (profileError.code === 'PGRST116') {
          throw new Error('User not found. They need to sign up first.')
        }
        throw profileError
      }

      // Check if user is already a team member using count
      const { count, error: countError } = await client
        .from('team_members')
        .select('*', { count: 'exact', head: true })
        .eq('team_id', teamId)
        .eq('user_id', profile.id)

      if (countError) {
        throw countError
      }

      if (count > 0) {
        throw new Error('User is already a member of this team')
      }

      // Add user to team
      const { error: addError } = await client
        .from('team_members')
        .insert({
          team_id: teamId,
          user_id: profile.id,
          role: 'member'
        })

      if (addError) throw addError

      // Refresh teams list
      await fetchTeams(currentTeam.value.company_id)
      
      // Refresh current team data if it's the same team
      if (currentTeam.value && currentTeam.value.id === teamId) {
        await setCurrentTeam(teamId)
      }
    } catch (error) {
      console.error('Error inviting team member:', error)
      throw error
    }
  }

  const isTeamMember = async (teamId, userId) => {
    try {
      const { data, error } = await client
        .from('team_members')
        .select('id')
        .eq('team_id', teamId)
        .eq('user_id', userId)
        .maybeSingle()

      if (error) {
        console.error('Error checking team membership:', error)
        return false
      }

      return !!data
    } catch (err) {
      console.error('Error in isTeamMember:', err)
      return false
    }
  }

  return {
    teams,
    currentTeam,
    loading,
    error,
    fetchTeams,
    createTeam,
    addTeamMember,
    removeTeamMember,
    setCurrentTeam,
    isTeamAdmin,
    inviteTeamMember,
    isTeamMember,
    editTeam
  }
} 