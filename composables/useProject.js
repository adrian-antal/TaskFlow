import { ref, computed } from 'vue'
import { useSupabaseClient, useSupabaseUser } from '#imports'
import { useTask } from './useTask'

export const useProject = () => {
  const client = useSupabaseClient()
  const user = useSupabaseUser()
  const { fetchTasks } = useTask()

  const projects = ref([])
  const currentProject = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Fetch team's projects
  const fetchProjects = async (teamId) => {
    try {
      loading.value = true
      error.value = null

      // First verify the user is a member of this team
      const { data: teamMember, error: memberError } = await client
        .from('team_members')
        .select('user_id')
        .eq('team_id', teamId)
        .eq('user_id', user.value.id)
        .single()

      if (memberError || !teamMember) {
        projects.value = []
        return
      }

      // Then get the projects for this team
      const { data, error: fetchError } = await client
        .from('projects')
        .select('*')
        .eq('team_id', teamId)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      projects.value = data
    } catch (err) {
      console.error('Error fetching projects:', err)
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Create a new project
  const createProject = async (projectData) => {
    try {
      loading.value = true
      error.value = null

      const { data: project, error: createError } = await client
        .from('projects')
        .insert({
          name: projectData.name,
          description: projectData.description,
          color: projectData.color,
          team_id: projectData.team_id,
          created_by: user.value.id,
          status: 'active'
        })
        .select()
        .single()

      if (createError) throw createError

      // Refresh projects list
      await fetchProjects(projectData.team_id)
      return project
    } catch (err) {
      console.error('Error creating project:', err)
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Update project
  const updateProject = async (projectId, updates) => {
    try {
      loading.value = true
      error.value = null

      const { data, error: err } = await client
        .from('projects')
        .update(updates)
        .eq('id', projectId)
        .select()
        .single()

      if (err) throw err
      await fetchProjects(currentProject.value.team_id)
      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Delete project
  const deleteProject = async (projectId) => {
    try {
      loading.value = true
      error.value = null

      const { error: err } = await client
        .from('projects')
        .delete()
        .eq('id', projectId)

      if (err) throw err
      await fetchProjects(currentProject.value.team_id)
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Set current project
  const setCurrentProject = async (project) => {
    try {
      currentProject.value = project
    } catch (err) {
      console.error('Error setting current project:', err)
      error.value = err.message
      throw err
    }
  }

  // Computed properties
  const projectStats = computed(() => {
    if (!currentProject.value) return null

    const tasks = currentProject.value.tasks || []
    const total = tasks.length
    const completed = tasks.filter(t => t.status === 'done').length
    const inProgress = tasks.filter(t => t.status === 'in_progress').length
    const todo = tasks.filter(t => t.status === 'todo').length

    return {
      total,
      completed,
      inProgress,
      todo,
      completionRate: total ? Math.round((completed / total) * 100) : 0
    }
  })

  return {
    projects,
    currentProject,
    loading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    setCurrentProject,
    projectStats
  }
} 