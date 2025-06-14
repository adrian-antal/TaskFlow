import { ref, computed } from 'vue'
import { useSupabaseClient, useSupabaseUser } from '#imports'

export const useAnalytics = () => {
  const client = useSupabaseClient()
  const user = useSupabaseUser()

  const taskAnalytics = ref([])
  const teamPerformance = ref([])
  const userPerformance = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Fetch task analytics with calculated metrics
  const fetchTaskAnalytics = async (filters = {}) => {
    try {
      loading.value = true
      error.value = null

      // Step 1: If filtering by team, first get the project IDs for that team
      let projectIds = null
      if (filters.teamId) {
        const { data: projects, error: projectsError } = await client
          .from('projects')
          .select('id')
          .eq('team_id', filters.teamId)
        
        if (projectsError) throw projectsError
        
        projectIds = projects?.map(p => p.id) || []
        
        // If no projects found for this team, return empty results
        if (projectIds.length === 0) {
          taskAnalytics.value = []
          return []
        }
      }

      // Step 2: Build the main tasks query
      let query = client
        .from('tasks')
        .select(`
          *,
          project:project_id (
            id,
            name,
            team_id,
            team:team_id (
              id,
              name
            )
          )
        `)

      // Apply filters
      if (filters.projectId) {
        query = query.eq('project_id', filters.projectId)
      } else if (projectIds) {
        // Filter by the project IDs we found for the team
        query = query.in('project_id', projectIds)
      }
      if (filters.status) {
        query = query.eq('status', filters.status)
      }
      if (filters.priority) {
        query = query.eq('priority', filters.priority)
      }
      if (filters.dateFrom) {
        query = query.gte('created_at', filters.dateFrom)
      }
      if (filters.dateTo) {
        query = query.lte('created_at', filters.dateTo)
      }

      const { data, error: fetchError } = await query.order('created_at', { ascending: false })

      if (fetchError) throw fetchError



      // Get assignees for all tasks
      let assigneeMap = {}
      if (data && data.length > 0) {
        const taskIds = data.map(task => task.id)
        
        const { data: assigneesData, error: assigneesError } = await client
          .from('task_assignees')
          .select('task_id, user_id, assigned_at')
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
              assignee_id: curr.user_id,
              assigned_at: curr.assigned_at
            }
            return acc
          }, {})
        }
      }

      // Process the data to add calculated metrics
      const processedData = (data || []).map(task => {
        const assignee = assigneeMap[task.id]
        const assigneeId = assignee?.assignee_id
        
        // Calculate time metrics
        const createdAt = new Date(task.created_at)
        const startedAt = task.started_at ? new Date(task.started_at) : null
        const completedAt = task.completed_at ? new Date(task.completed_at) : null
        const dueDate = task.due_date ? new Date(task.due_date + 'T23:59:59') : null
        
        let totalHoursToComplete = null
        let activeHoursToComplete = null
        let hoursBeforeStart = null
        let hoursOverdue = null
        
        if (completedAt) {
          totalHoursToComplete = (completedAt - createdAt) / (1000 * 60 * 60)
          
          if (startedAt) {
            activeHoursToComplete = (completedAt - startedAt) / (1000 * 60 * 60)
            hoursBeforeStart = (startedAt - createdAt) / (1000 * 60 * 60)
          }
          
          if (dueDate && completedAt > dueDate) {
            hoursOverdue = (completedAt - dueDate) / (1000 * 60 * 60)
          }
        }
        
        // Add minute-precision calculations
        let totalMinutesToComplete = null
        let activeMinutesToComplete = null
        let minutesBeforeStart = null
        let minutesOverdue = null
        
        if (completedAt) {
          totalMinutesToComplete = Math.round((completedAt - createdAt) / (1000 * 60))
          
          if (startedAt) {
            activeMinutesToComplete = Math.round((completedAt - startedAt) / (1000 * 60))
            minutesBeforeStart = Math.round((startedAt - createdAt) / (1000 * 60))
          }
          
          if (dueDate && completedAt > dueDate) {
            minutesOverdue = Math.round((completedAt - dueDate) / (1000 * 60))
          }
        }
        
        return {
          ...task,
          assignee_id: assigneeId,
          assignee_name: assignee?.full_name || assignee?.email,
          assignee,
          project_name: task.project?.name,
          team_id: task.project?.team_id,
          team_name: task.project?.team?.name,
          total_hours_to_complete: totalHoursToComplete,
          active_hours_to_complete: activeHoursToComplete,
          hours_before_start: hoursBeforeStart,
          hours_overdue: hoursOverdue,
          total_minutes_to_complete: totalHoursToComplete ? Math.round(totalHoursToComplete * 60) : 0,
          active_minutes_to_complete: activeHoursToComplete ? Math.round(activeHoursToComplete * 60) : 0,
          minutes_before_start: hoursBeforeStart ? Math.round(hoursBeforeStart * 60) : 0,
          minutes_overdue: hoursOverdue ? Math.round(hoursOverdue * 60) : 0,
          is_completed: task.status === 'done',
          is_overdue: dueDate && new Date() > dueDate && task.status !== 'done',
          completed_late: completedAt && dueDate && completedAt > dueDate
        }
      })

      taskAnalytics.value = processedData
      return processedData
    } catch (err) {
      console.error('Error fetching task analytics:', err)
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Fetch team performance data
  const fetchTeamPerformance = async (teamId = null) => {
    try {
      loading.value = true
      error.value = null

      // Get teams and their task data
      let query = client
        .from('teams')
        .select(`
          id,
          name,
          projects (
            id,
            tasks (
              id,
              status,
              created_at,
              completed_at,
              started_at,
              due_date
            )
          )
        `)

      if (teamId) {
        query = query.eq('id', teamId)
      }

      const { data, error: fetchError } = await query

      if (fetchError) throw fetchError

      // Process team performance metrics
      const teamStats = (data || []).map(team => {
        const allTasks = team.projects?.flatMap(p => p.tasks) || []
        const completedTasks = allTasks.filter(t => t.status === 'done')
        const overdueTasks = allTasks.filter(t => {
          const dueDate = t.due_date ? new Date(t.due_date + 'T23:59:59') : null
          return dueDate && new Date() > dueDate && t.status !== 'done'
        })
        const lateCompletions = completedTasks.filter(t => {
          const dueDate = t.due_date ? new Date(t.due_date + 'T23:59:59') : null
          const completedAt = new Date(t.completed_at)
          return dueDate && completedAt > dueDate
        })

        const avgCompletionTime = completedTasks.length > 0
          ? completedTasks.reduce((sum, t) => {
              const created = new Date(t.created_at)
              const completed = new Date(t.completed_at)
              return sum + ((completed - created) / (1000 * 60 * 60))
            }, 0) / completedTasks.length
          : 0

        return {
          team_id: team.id,
          team_name: team.name,
          total_tasks: allTasks.length,
          completed_tasks: completedTasks.length,
          overdue_tasks: overdueTasks.length,
          late_completions: lateCompletions.length,
          avg_completion_time_hours: Math.round(avgCompletionTime * 100) / 100
        }
      })

      teamPerformance.value = teamStats
      return teamStats
    } catch (err) {
      console.error('Error fetching team performance:', err)
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Calculate user performance from task data
  const calculateUserPerformance = () => {
    if (!taskAnalytics.value.length) return []

    const userStats = {}

    taskAnalytics.value.forEach(task => {
      if (!task.assignee_id || !task.assignee_name) return

      if (!userStats[task.assignee_id]) {
        userStats[task.assignee_id] = {
          user_id: task.assignee_id,
          user_name: task.assignee_name,
          total_tasks: 0,
          completed_tasks: 0,
          total_completion_time: 0,
          overdue_tasks: 0,
          late_completions: 0,
          avg_completion_time: 0
        }
      }

      const stats = userStats[task.assignee_id]
      stats.total_tasks++

      if (task.is_completed) {
        stats.completed_tasks++
        if (task.total_hours_to_complete) {
          stats.total_completion_time += task.total_hours_to_complete
        }
      }

      if (task.is_overdue) stats.overdue_tasks++
      if (task.completed_late) stats.late_completions++
    })

    // Calculate averages
    Object.values(userStats).forEach(stats => {
      stats.avg_completion_time = stats.completed_tasks > 0 
        ? Math.round((stats.total_completion_time / stats.completed_tasks) * 100) / 100
        : 0
    })

    userPerformance.value = Object.values(userStats)
    return userPerformance.value
  }

  // Get task lifecycle events for a specific task
  const fetchTaskLifecycle = async (taskId) => {
    try {
      loading.value = true
      error.value = null

      // Get task activities
      const { data: activities, error: fetchError } = await client
        .from('task_activities')
        .select('*')
        .eq('task_id', taskId)
        .order('created_at', { ascending: true })

      if (fetchError) throw fetchError

      if (!activities || activities.length === 0) return []

      // Get user details for all activities
      const userIds = [...new Set(activities.map(a => a.user_id))]
      const { data: usersData, error: usersError } = await client
        .from('profiles')
        .select('id, full_name, email, avatar_url')
        .in('id', userIds)

      if (usersError) throw usersError

      // Create a map of user_id to user data
      const userMap = usersData.reduce((acc, user) => {
        acc[user.id] = user
        return acc
      }, {})

      // Combine activities with user data
      const activitiesWithUsers = activities.map(activity => ({
        ...activity,
        user: userMap[activity.user_id] || { 
          id: activity.user_id, 
          full_name: 'Unknown User', 
          email: 'unknown@example.com' 
        }
      }))

      return activitiesWithUsers
    } catch (err) {
      console.error('Error fetching task lifecycle:', err)
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }



  // Computed properties for dashboard metrics
  const dashboardMetrics = computed(() => {
    if (!taskAnalytics.value.length) return null

    const tasks = taskAnalytics.value
    const completed = tasks.filter(t => t.is_completed)
    const overdue = tasks.filter(t => t.is_overdue)
    const completedLate = tasks.filter(t => t.completed_late)

    return {
      totalTasks: tasks.length,
      completedTasks: completed.length,
      overdueTasks: overdue.length,
      lateCompletions: completedLate.length,
      completionRate: tasks.length > 0 ? (completed.length / tasks.length * 100).toFixed(1) : 0,
      avgCompletionTime: completed.length > 0 
        ? (completed.reduce((sum, t) => sum + (t.total_hours_to_complete || 0), 0) / completed.length)
        : 0,
      avgActiveTime: completed.length > 0 
        ? (completed.reduce((sum, t) => sum + (t.active_hours_to_complete || 0), 0) / completed.length)
        : 0,
      avgCompletionMinutes: completed.length > 0 
        ? Math.round(completed.reduce((sum, t) => sum + (t.total_minutes_to_complete || 0), 0) / completed.length)
        : 0,
      avgActiveMinutes: completed.length > 0 
        ? Math.round(completed.reduce((sum, t) => sum + (t.active_minutes_to_complete || 0), 0) / completed.length)
        : 0
    }
  })

  // Get tasks by status distribution
  const statusDistribution = computed(() => {
    if (!taskAnalytics.value.length) return []

    const distribution = taskAnalytics.value.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1
      return acc
    }, {})

    return Object.entries(distribution).map(([status, count]) => ({
      status,
      count,
      percentage: ((count / taskAnalytics.value.length) * 100).toFixed(1)
    }))
  })

  // Get tasks by priority distribution
  const priorityDistribution = computed(() => {
    if (!taskAnalytics.value.length) return []

    const distribution = taskAnalytics.value.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1
      return acc
    }, {})

    return Object.entries(distribution).map(([priority, count]) => ({
      priority,
      count,
      percentage: ((count / taskAnalytics.value.length) * 100).toFixed(1)
    }))
  })

  // Get completion trends over time
  const completionTrends = computed(() => {
    if (!taskAnalytics.value.length) return []

    const completed = taskAnalytics.value.filter(t => t.completed_at)
    const trends = {}

    completed.forEach(task => {
      const date = new Date(task.completed_at).toISOString().split('T')[0]
      trends[date] = (trends[date] || 0) + 1
    })

    return Object.entries(trends)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
  })

  // Get average completion time by team member
  const memberPerformance = computed(() => {
    if (!taskAnalytics.value.length) return []

    const memberStats = {}

    taskAnalytics.value.forEach(task => {
      if (!task.assignee_id || !task.assignee_name) return

      if (!memberStats[task.assignee_id]) {
        memberStats[task.assignee_id] = {
          id: task.assignee_id,
          name: task.assignee_name,
          totalTasks: 0,
          completedTasks: 0,
          totalCompletionTime: 0,
          overdueTasks: 0,
          lateCompletions: 0
        }
      }

      const stats = memberStats[task.assignee_id]
      stats.totalTasks++

      if (task.is_completed) {
        stats.completedTasks++
        if (task.total_hours_to_complete) {
          stats.totalCompletionTime += task.total_hours_to_complete
        }
      }

      if (task.is_overdue) stats.overdueTasks++
      if (task.completed_late) stats.lateCompletions++
    })

    return Object.values(memberStats).map(stats => ({
      ...stats,
      completionRate: stats.totalTasks > 0 ? (stats.completedTasks / stats.totalTasks * 100).toFixed(1) : 0,
      avgCompletionTime: stats.completedTasks > 0 ? (stats.totalCompletionTime / stats.completedTasks) : 0
    }))
  })

  // Helper function to format time with minutes
  const formatTimeWithMinutes = (minutes) => {
    if (!minutes || minutes < 1) return '0m'
    
    if (minutes < 60) {
      return `${minutes}m`
    } else {
      const hours = Math.floor(minutes / 60)
      const remainingMinutes = minutes % 60
      if (remainingMinutes === 0) {
        return `${hours}h`
      } else {
        return `${hours}h ${remainingMinutes}m`
      }
    }
  }

  return {
    // State
    taskAnalytics,
    teamPerformance,
    userPerformance,
    loading,
    error,

    // Methods
    fetchTaskAnalytics,
    fetchTeamPerformance,
    calculateUserPerformance,
    fetchTaskLifecycle,
    formatTimeWithMinutes,

    // Computed
    dashboardMetrics,
    statusDistribution,
    priorityDistribution,
    completionTrends,
    memberPerformance
  }
} 