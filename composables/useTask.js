import { ref, computed } from 'vue'
import { useSupabaseClient, useSupabaseUser } from '#imports'

export const useTask = () => {
  const client = useSupabaseClient()
  const user = useSupabaseUser()

  const tasks = ref([])
  const currentTask = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Fetch project's tasks
  const fetchTasks = async (projectId) => {
    try {
      loading.value = true
      error.value = null

      // First verify the user has access to this project
      const { data: project, error: projectError } = await client
        .from('projects')
        .select(`
          id,
          team_id,
          team:team_id (
            team_members!inner (
              user_id
            )
          )
        `)
        .eq('id', projectId)
        .eq('team.team_members.user_id', user.value.id)
        .single()

      if (projectError || !project) {
        tasks.value = []
        return
      }

      // Get all tasks for the project
      const { data: tasksData, error: fetchError } = await client
        .from('tasks')
        .select(`
          *,
          project:project_id (
            id,
            name,
            team_id
          )
        `)
        .eq('project_id', projectId)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      // Get all assignees for these tasks
      const taskIds = tasksData.map(task => task.id)
      let assigneeMap = {}
      
      if (taskIds.length > 0) {
        const { data: assigneesData, error: assigneesError } = await client
          .from('task_assignees')
          .select('task_id, user_id')
          .in('task_id', taskIds)

        if (assigneesError) throw assigneesError

        // Get user details for all assignees
        const userIds = [...new Set(assigneesData.map(a => a.user_id))]
        if (userIds.length > 0) {
          const { data: usersData, error: usersError } = await client
            .from('profiles')
            .select('id, email, full_name, avatar_url')
            .in('id', userIds)

          if (usersError) throw usersError

          // Create a map of user_id to user data
          const userMap = usersData.reduce((acc, user) => {
            acc[user.id] = user
            return acc
          }, {})

          // Create a map of task_id to assignee
          assigneeMap = assigneesData.reduce((acc, curr) => {
            acc[curr.task_id] = {
              ...userMap[curr.user_id],
              assignee_id: curr.user_id
            }
            return acc
          }, {})
        }
      }

      // Combine the data
      tasks.value = tasksData.map(task => ({
        ...task,
        assignee: assigneeMap[task.id] || null,
        assignee_id: assigneeMap[task.id]?.assignee_id || null
      }))
    } catch (err) {
      console.error('Error fetching tasks:', err)
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Create a new task
  const createTask = async (taskData) => {
    try {
      loading.value = true
      error.value = null

      // First get the project to verify team_id
      const { data: project, error: projectError } = await client
        .from('projects')
        .select('team_id')
        .eq('id', taskData.project_id)
        .single()

      if (projectError) throw projectError

      // Verify assignee is a team member if provided
      if (taskData.assignee_id) {
        const { data: teamMember, error: memberError } = await client
          .from('team_members')
          .select('user_id')
          .eq('team_id', project.team_id)
          .eq('user_id', taskData.assignee_id)
          .single()

        if (memberError || !teamMember) {
          throw new Error('Assignee must be a member of the team')
        }
      }

      // Create the task
      const { data: task, error: createError } = await client
        .from('tasks')
        .insert({
          title: taskData.title,
          description: taskData.description,
          project_id: taskData.project_id,
          priority: taskData.priority,
          due_date: taskData.due_date,
          color: taskData.color,
          created_by: user.value.id,
          status: 'todo'
        })
        .select()
        .single()

      if (createError) throw createError

      // If there's an assignee, create the assignment
      if (taskData.assignee_id) {
        const { error: assignError } = await client
          .from('task_assignees')
          .insert({
            task_id: task.id,
            user_id: taskData.assignee_id,
            assigned_at: new Date().toISOString()
          })

        if (assignError) throw assignError
      }

      // Refresh tasks list
      await fetchTasks(taskData.project_id)
      return task
    } catch (err) {
      console.error('Error creating task:', err)
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Update task
  const updateTask = async (taskId, updates) => {
    try {
      loading.value = true
      error.value = null

      // Handle assignee separately since it's in a different table
      let assigneeId = null
      if ('assignee_id' in updates) {
        assigneeId = updates.assignee_id
        delete updates.assignee_id // Remove from main updates
      }

      // Update the main task fields
      const { data, error: updateError } = await client
        .from('tasks')
        .update(updates)
        .eq('id', taskId)
        .select()
        .single()

      if (updateError) throw updateError

      // Handle assignee update in task_assignees table
      if (assigneeId !== null) {
        // First, remove any existing assignees
        await client
          .from('task_assignees')
          .delete()
          .eq('task_id', taskId)

        // If there's a new assignee, add them
        if (assigneeId) {
          const { error: assignError } = await client
            .from('task_assignees')
            .insert({
              task_id: taskId,
              user_id: assigneeId,
              assigned_at: new Date().toISOString()
            })

          if (assignError) throw assignError
        }
      }

      // Refresh tasks list
      await fetchTasks(data.project_id)
      return data
    } catch (err) {
      console.error('Error updating task:', err)
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Delete task
  const deleteTask = async (taskId, projectId) => {
    try {
      loading.value = true
      error.value = null

      const { error: deleteError } = await client
        .from('tasks')
        .delete()
        .eq('id', taskId)

      if (deleteError) throw deleteError

      // Refresh tasks list
      await fetchTasks(projectId)
    } catch (err) {
      console.error('Error deleting task:', err)
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Add comment to task
  const addComment = async (taskId, content) => {
    try {
      loading.value = true
      error.value = null

      const { data, error: err } = await client
        .from('task_comments')
        .insert({
          task_id: taskId,
          user_id: user.value.id,
          content
        })
        .select()
        .single()

      if (err) throw err

      // Log activity
      await client
        .from('task_activities')
        .insert({
          task_id: taskId,
          user_id: user.value.id,
          action: 'commented',
          details: { comment_id: data.id }
        })

      await fetchTasks(currentTask.value.project_id)
      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Add attachment to task
  const addAttachment = async (taskId, file) => {
    try {
      loading.value = true
      error.value = null

      // Upload file to storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const { data: fileData, error: uploadError } = await client.storage
        .from('task-attachments')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      // Create attachment record
      const { data, error: err } = await client
        .from('task_attachments')
        .insert({
          task_id: taskId,
          file_name: file.name,
          file_url: fileData.path,
          file_type: file.type
        })
        .select()
        .single()

      if (err) throw err

      // Log activity
      await client
        .from('task_activities')
        .insert({
          task_id: taskId,
          user_id: user.value.id,
          action: 'attached_file',
          details: { file_name: file.name }
        })

      await fetchTasks(currentTask.value.project_id)
      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Set current task
  const setCurrentTask = (task) => {
    currentTask.value = task
  }

  // Computed property for tasks grouped by status
  const tasksByStatus = computed(() => {
    return tasks.value.reduce((acc, task) => {
      if (!acc[task.status]) {
        acc[task.status] = []
      }
      acc[task.status].push(task)
      return acc
    }, {})
  })

  // Group tasks by priority
  const tasksByPriority = computed(() => {
    const groups = {
      high: [],
      medium: [],
      low: []
    }

    tasks.value.forEach(task => {
      if (groups[task.priority]) {
        groups[task.priority].push(task)
      }
    })

    return groups
  })

  return {
    tasks,
    currentTask,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    addComment,
    addAttachment,
    setCurrentTask,
    tasksByStatus,
    tasksByPriority
  }
} 