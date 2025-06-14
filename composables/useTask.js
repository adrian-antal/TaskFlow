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
          status: 'todo',
          estimated_hours: taskData.estimated_hours || null
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

        // Log initial assignment
        await logTaskActivity(task.id, 'assigned', {
          field_changed: 'assignee',
          old_value: null,
          new_value: taskData.assignee_id,
          details: {
            assigned_to: taskData.assignee_id,
            timestamp: new Date().toISOString()
          }
        })
      }

      // Log task creation
      await logTaskActivity(task.id, 'created', {
        field_changed: null,
        old_value: null,
        new_value: null,
        details: {
          title: task.title,
          priority: task.priority,
          due_date: task.due_date,
          timestamp: new Date().toISOString()
        }
      })

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

  // Update task with analytics tracking
  const updateTask = async (taskId, updates) => {
    try {
      loading.value = true
      error.value = null

      // Get current task data for comparison
      const { data: currentTask, error: fetchError } = await client
          .from('tasks')
        .select('*')
          .eq('id', taskId)
          .single()

      if (fetchError) throw fetchError

      // Handle assignee separately since it's in a different table
      let assigneeId = null
      if ('assignee_id' in updates) {
        assigneeId = updates.assignee_id
        delete updates.assignee_id // Remove from main updates
      }

      // Analytics: Handle status changes
      if (updates.status && updates.status !== currentTask.status) {
        const now = new Date().toISOString()
        
        // If moving to 'in_progress' and no started_at, set it
        if (updates.status === 'in_progress' && !currentTask.started_at) {
          updates.started_at = now
        }
        
        // If moving to 'done' and no completed_at, set it
        if (updates.status === 'done' && !currentTask.completed_at) {
          updates.completed_at = now
        }
        
        // If moving from 'done' to something else, clear completed_at
        if (currentTask.status === 'done' && updates.status !== 'done') {
          updates.completed_at = null
        }

        // Log status change activity
        await logTaskActivity(taskId, 'status_changed', {
          field_changed: 'status',
          old_value: currentTask.status,
          new_value: updates.status,
          details: {
            from_status: currentTask.status,
            to_status: updates.status,
            timestamp: now
          }
        })
      }

      // Analytics: Log priority changes
      if (updates.priority && updates.priority !== currentTask.priority) {
        await logTaskActivity(taskId, 'priority_changed', {
          field_changed: 'priority',
          old_value: currentTask.priority,
          new_value: updates.priority,
          details: {
            from_priority: currentTask.priority,
            to_priority: updates.priority,
            timestamp: new Date().toISOString()
          }
        })
      }

      // Analytics: Log due date changes
      if (updates.due_date && updates.due_date !== currentTask.due_date) {
        await logTaskActivity(taskId, 'due_date_changed', {
          field_changed: 'due_date',
          old_value: currentTask.due_date,
          new_value: updates.due_date,
          details: {
            from_due_date: currentTask.due_date,
            to_due_date: updates.due_date,
            timestamp: new Date().toISOString()
          }
        })
      }

      // Analytics: Log estimated hours changes
      if (updates.estimated_hours !== undefined && updates.estimated_hours !== currentTask.estimated_hours) {
        await logTaskActivity(taskId, 'estimated_hours_changed', {
          field_changed: 'estimated_hours',
          old_value: currentTask.estimated_hours,
          new_value: updates.estimated_hours,
          details: {
            from_estimated_hours: currentTask.estimated_hours,
            to_estimated_hours: updates.estimated_hours,
            timestamp: new Date().toISOString()
          }
        })
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
        // Get current assignee for logging
        const { data: currentAssignees } = await client
          .from('task_assignees')
          .select('user_id')
          .eq('task_id', taskId)

        const currentAssigneeId = currentAssignees?.[0]?.user_id

        // First, remove any existing assignees
        await client
          .from('task_assignees')
          .delete()
          .eq('task_id', taskId)

        // Log unassignment if there was a previous assignee
        if (currentAssigneeId) {
          await logTaskActivity(taskId, 'unassigned', {
            field_changed: 'assignee',
            old_value: currentAssigneeId,
            new_value: null,
            details: {
              unassigned_from: currentAssigneeId,
              timestamp: new Date().toISOString()
            }
          })
        }

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

          // Log new assignment
          await logTaskActivity(taskId, 'assigned', {
            field_changed: 'assignee',
            old_value: currentAssigneeId || null,
            new_value: assigneeId,
            details: {
              assigned_to: assigneeId,
              timestamp: new Date().toISOString()
            }
          })
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

  // Helper function to log task activities
  const logTaskActivity = async (taskId, action, activityData) => {
    try {
      await client
        .from('task_activities')
        .insert({
          task_id: taskId,
          user_id: user.value.id,
          action: action,
          field_changed: activityData.field_changed || null,
          old_value: activityData.old_value || null,
          new_value: activityData.new_value || null,
          details: activityData.details || {}
        })
    } catch (err) {
      console.error('Error logging task activity:', err)
      // Don't throw here - activity logging shouldn't break the main operation
    }
  }

  // Delete task
  const deleteTask = async (taskId, projectId) => {
    try {
      loading.value = true
      error.value = null

      // Get task data before deletion for logging
      const { data: taskToDelete } = await client
        .from('tasks')
        .select('title, status, priority')
        .eq('id', taskId)
        .single()

      // Log task deletion
      if (taskToDelete) {
        await logTaskActivity(taskId, 'deleted', {
          field_changed: null,
          old_value: null,
          new_value: null,
          details: {
            title: taskToDelete.title,
            status: taskToDelete.status,
            priority: taskToDelete.priority,
            timestamp: new Date().toISOString()
          }
        })
      }

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

      // Log comment activity
      await logTaskActivity(taskId, 'commented', {
        field_changed: 'comments',
        old_value: null,
        new_value: content.substring(0, 100),
        details: { 
          comment_id: data.id,
          comment_preview: content.substring(0, 100),
          comment_length: content.length,
          timestamp: new Date().toISOString()
        }
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

      // Log attachment activity
      await logTaskActivity(taskId, 'attached_file', {
        field_changed: 'attachments',
        old_value: null,
        new_value: file.name,
        details: { 
          file_name: file.name,
          file_type: file.type,
          file_size: file.size,
          timestamp: new Date().toISOString()
        }
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