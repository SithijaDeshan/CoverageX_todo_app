import type { Task } from "../types/task";
import { TaskCard } from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  onComplete: (id: number) => void;
  isLoading?: boolean;
}

/**
 * TaskList Component - Single Responsibility: Render list of tasks
 * Handles empty state and loading skeleton
 */
export const TaskList = ({ tasks, onComplete, isLoading }: TaskListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass rounded-xl p-6 animate-pulse">
            <div className="h-6 bg-white/20 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-white/10 rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="glass rounded-xl p-12 text-center">
        <div className="text-6xl mb-4">✨</div>
        <h3 className="text-2xl font-semibold text-white mb-2">
          All caught up!
        </h3>
        <p className="text-gray-400">
          No tasks to show. Create one above to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onComplete={onComplete} />
      ))}
    </div>
  );
};
