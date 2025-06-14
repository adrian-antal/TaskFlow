# TaskFlow - Modern Task Management Platform

TaskFlow is a modern, responsive task management application built with Nuxt 3, Vue 3, Tailwind CSS, and Supabase. It provides a beautiful and intuitive interface for managing tasks with features like drag-and-drop task organization, real-time updates, and dark mode support.

## Features

- 🔐 User Authentication
- 📱 Responsive Design
- 🌓 Dark/Light Mode
- 🎯 Task Management
- 📅 Due Date Tracking
- 🔄 Drag-and-Drop Interface
- ⚡ Real-time Updates
- 🎨 Modern UI with Tailwind CSS

## Time Tracking System

TaskFlow automatically tracks time for tasks without requiring manual input. Here's how it works:

### Automatic Timestamps

- **Created**: When a task is first created
- **Started**: When task status changes to "In Progress" (first time only)
- **Completed**: When task status changes to "Done"

### Time Calculations

1. **Active Work Time** (`started_at` → `completed_at`)
   - Time spent actively working on the task
   - Shown in task details and board view
   - Used for variance calculations against estimates

2. **Total Lifecycle Time** (`created_at` → `completed_at`)
   - Complete time from task creation to completion
   - Includes waiting time before work started
   - Used in analytics averages

### Analytics Metrics

- **Estimated vs Actual**: Compare estimated hours with active work time
- **Variance Analysis**: Color-coded indicators showing over/under estimates
- **Team Performance**: Average completion times and efficiency metrics
- **Minute Precision**: All times displayed with minute-level accuracy (e.g., "2h 45m")

### Example Timeline

```
Task Created → [2h waiting] → Started Work → [1h 30m active] → Completed
|              |              |              |
created_at     started_at     |              completed_at
|                             |              |
|<-- Total Lifecycle: 3h 30m ----------------->|
               |<-- Active Work: 1h 30m ------>|
```

## Tech Stack

- **Frontend:**
  - Nuxt 3
  - Vue 3
  - Tailwind CSS
  - TypeScript
  - Vue Draggable

- **Backend:**
  - Supabase (Authentication, Database, Real-time)


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 