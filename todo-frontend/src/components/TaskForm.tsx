import { useState, type FormEvent } from "react";
import type { CreateTaskDto } from "../types/task";

interface TaskFormProps {
  onSubmit: (dto: CreateTaskDto) => Promise<void>;
  isLoading?: boolean;
}

/**
 * TaskForm Component - Single Responsibility: Handle task creation form
 * Features client-side validation and loading states
 */
export const TaskForm = ({ onSubmit, isLoading }: TaskFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!title.trim()) {
      setValidationError("Title is required");
      return;
    }

    setValidationError("");

    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
      });

      // Clear form on success
      setTitle("");
      setDescription("");
    } catch (error) {
      // Error handled by parent component
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="glass rounded-xl p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Add a Task</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setValidationError("");
            }}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                     text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                     focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter task title"
            disabled={isLoading}
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                     text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                     focus:ring-primary-500 focus:border-transparent transition-all duration-200 
                     resize-none"
            placeholder="Enter task description (optional)"
            disabled={isLoading}
          />
        </div>

        {validationError && (
          <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2">
            {validationError}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-6 bg-gradient-to-r from-primary-500 to-secondary-500 
                   text-white font-semibold rounded-lg hover:shadow-xl hover:shadow-primary-500/30 
                   transition-all duration-300 hover:scale-[1.02] active:scale-95
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Adding...
            </span>
          ) : (
            "Add Task"
          )}
        </button>
      </form>
    </div>
  );
};
