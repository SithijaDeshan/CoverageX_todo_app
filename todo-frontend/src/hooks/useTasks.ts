import { useState, useEffect, useCallback } from "react";
import type { Task, CreateTaskDto } from "../types/task";
import { taskService } from "../services/taskService";

/**
 * Custom hook for managing task state and operations
 * Implements DRY principle - centralizes all task-related business logic
 */
export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await taskService.getRecentTasks();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Creates a new task
   * @param dto - Task creation data
   */
  const addTask = useCallback(
    async (dto: CreateTaskDto): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        await taskService.createTask(dto);
        await fetchTasks();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create task");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchTasks]
  );

  /**
   * Marks a task as completed
   * @param id - Task ID
   */
  const markComplete = useCallback(
    async (id: number): Promise<void> => {
      setError(null);

      try {
        await taskService.completeTask(id);
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to complete task"
        );
        await fetchTasks();
        throw err;
      }
    },
    [fetchTasks]
  );

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    markComplete,
  };
};
