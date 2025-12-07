import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TaskList } from "../TaskList";
import type { Task } from "../../types/task";

describe("TaskList", () => {
  const mockTasks: Task[] = [
    { id: 1, title: "Task 1", description: "Desc 1", completed: false },
    { id: 2, title: "Task 2", description: "Desc 2", completed: false },
  ];
  const mockOnComplete = vi.fn();

  it("renders loading skeletons when isLoading is true", () => {
    const { container } = render(
      <TaskList tasks={[]} onComplete={mockOnComplete} isLoading={true} />
    );

    // Check for pulse animation class which indicates skeletons
    const skeletons = container.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("renders empty state when no tasks are provided", () => {
    render(<TaskList tasks={[]} onComplete={mockOnComplete} />);

    expect(screen.getByText(/all caught up!/i)).toBeInTheDocument();
    expect(screen.getByText(/no tasks to show/i)).toBeInTheDocument();
  });

  it("renders a list of tasks", () => {
    render(<TaskList tasks={mockTasks} onComplete={mockOnComplete} />);

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    // Check if description is rendered
    expect(screen.getByText("Desc 1")).toBeInTheDocument();
  });

  it("propagates onComplete event when a task is completed", () => {
    render(<TaskList tasks={mockTasks} onComplete={mockOnComplete} />);

    const completeButtons = screen.getAllByRole("button", {
      name: /mark .* as done/i,
    });
    fireEvent.click(completeButtons[0]);

    expect(mockOnComplete).toHaveBeenCalledWith(1);
  });
});
