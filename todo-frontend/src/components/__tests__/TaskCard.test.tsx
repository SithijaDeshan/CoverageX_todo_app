import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TaskCard } from "../TaskCard";
import type { Task } from "../../types/task";

describe("TaskCard", () => {
  const mockTask: Task = {
    id: 1,
    title: "Test Task",
    description: "Test Description",
    completed: false,
  };

  const mockOnComplete = vi.fn();

  it("renders task title and description", () => {
    render(<TaskCard task={mockTask} onComplete={mockOnComplete} />);

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders task without description", () => {
    const taskNoDesc: Task = { ...mockTask, description: "" };
    render(<TaskCard task={taskNoDesc} onComplete={mockOnComplete} />);

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.queryByText("Test Description")).not.toBeInTheDocument();
  });

  it("calls onComplete when Done button is clicked", () => {
    render(<TaskCard task={mockTask} onComplete={mockOnComplete} />);

    const button = screen.getByRole("button", {
      name: /mark "test task" as done/i,
    });
    fireEvent.click(button);

    expect(mockOnComplete).toHaveBeenCalledTimes(1);
    expect(mockOnComplete).toHaveBeenCalledWith(1);
  });
});
