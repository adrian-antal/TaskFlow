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

## Tech Stack

- **Frontend:**
  - Nuxt 3
  - Vue 3
  - Tailwind CSS
  - TypeScript
  - Vue Draggable

- **Backend:**
  - Supabase (Authentication, Database, Real-time)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/taskflow.git
   cd taskflow
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your Supabase credentials:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Setup

1. Create a new Supabase project
2. Create a `tasks` table with the following schema:
   ```sql
   create table tasks (
     id uuid default uuid_generate_v4() primary key,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null,
     title text not null,
     description text,
     status text not null,
     due_date date not null,
     user_id uuid references auth.users not null
   );
   ```

3. Set up Row Level Security (RLS) policies:
   ```sql
   -- Enable RLS
   alter table tasks enable row level security;

   -- Create policy for users to view their own tasks
   create policy "Users can view their own tasks"
     on tasks for select
     using (auth.uid() = user_id);

   -- Create policy for users to insert their own tasks
   create policy "Users can insert their own tasks"
     on tasks for insert
     with check (auth.uid() = user_id);

   -- Create policy for users to update their own tasks
   create policy "Users can update their own tasks"
     on tasks for update
     using (auth.uid() = user_id);

   -- Create policy for users to delete their own tasks
   create policy "Users can delete their own tasks"
     on tasks for delete
     using (auth.uid() = user_id);
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 