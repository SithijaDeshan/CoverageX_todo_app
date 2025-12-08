import type { Task } from "../types/task";

interface TaskCardProps {
  task: Task;
  onComplete: (id: number) => void;
}


/**
 * TaskCard Component - Single Responsibility: Display individual task
 * Follows Interface Segregation: Minimal, focused props
 */
export const TaskCard = ({ task, onComplete }: TaskCardProps) => {
  return (
    <div className="glass rounded-xl p-6 hover:bg-white/15 transition-all duration-300 animate-slide-in group">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold text-white mb-2 break-words">
            {task.title}
          </h3>
          {task.description && (
            <p className="text-gray-300 text-sm leading-relaxed break-words">
              {task.description}
            </p>
          )}
        </div>

        <button
          onClick={() => onComplete(task.id)}
          className="flex-shrink-0 px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 
                     text-white rounded-lg font-medium hover:shadow-lg hover:shadow-primary-500/50 
                     transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label={`Mark "${task.title}" as done`}
        >
          Done
        </button>
      </div>
    </div>
  );
};
