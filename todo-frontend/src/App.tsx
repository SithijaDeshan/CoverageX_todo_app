import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { useTasks } from "./hooks/useTasks";

/**
 * Main Application Component
 * Follows Open/Closed Principle - open for extension, closed for modification
 * Business logic delegated to useTasks hook
 */
function App() {
  const { tasks, loading, error, addTask, markComplete } = useTasks();

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-dark-900 via-primary-900 to-secondary-900 
                    relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-500/20 rounded-full 
                      blur-3xl animate-pulse-slow"
        />
        <div
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary-500/20 rounded-full 
                      blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-12">
          <h1
            className="text-5xl md:text-6xl font-bold text-white mb-4 
                       bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent"
          >
            TaskFlow
          </h1>
          <p className="text-gray-300 text-lg">
            Modern task management made simple
          </p>
        </header>

        {/* Error display */}
        {error && (
          <div className="mb-8 glass rounded-xl p-4 border-l-4 border-red-500 bg-red-500/10">
            <p className="text-red-400 font-medium">⚠️ {error}</p>
          </div>
        )}

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Task creation form - 1 column */}
          <div className="lg:col-span-1">
            <TaskForm onSubmit={addTask} isLoading={loading} />
          </div>

          {/* Task list - 2 columns */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Recent Tasks
              </h2>
              <p className="text-gray-400 text-sm">
                Showing your 5 most recent incomplete tasks
              </p>
            </div>

            <TaskList
              tasks={tasks}
              onComplete={markComplete}
              isLoading={loading && tasks.length === 0}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>Built with React, TypeScript, and Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
