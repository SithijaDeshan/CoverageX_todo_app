import type { Task, CreateTaskDto } from "../types/task";

const API_BASE_URL = "http://localhost:8080/api/tasks";

/**
 * Service layer for Task-related API calls
 * Implements Dependency Inversion Principle - components depend on this abstraction
 */
class TaskService {
  /**
   * Fetches the 5 most recent incomplete tasks
   * @returns Promise<Task[]>
   * @throws Error if request fails
   */
  async getRecentTasks(): Promise<Task[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/recent`);

      if (!response.ok) {
        throw new Error(`Failed to fetch tasks: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  }

  /**
   * Creates a new task
   * @param dto - Task creation data
   * @returns Promise<Task> - The created task
   * @throws Error if request fails
   */
  async createTask(dto: CreateTaskDto): Promise<Task> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dto),
      });

      if (!response.ok) {
        throw new Error(`Failed to create task: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }

  /**
   * Marks a task as completed
   * @param id - Task ID
   * @returns Promise<void>
   * @throws Error if request fails
   */
  async completeTask(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error(`Failed to complete task: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error completing task:", error);
      throw error;
    }
  }
}

// Export singleton instance
export const taskService = new TaskService();
