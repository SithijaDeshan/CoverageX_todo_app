import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TaskForm } from "../TaskForm";

describe("TaskForm", () => {
  it("renders form elements correctly", () => {
    render(<TaskForm onSubmit={async () => {}} />);

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add task/i })
    ).toBeInTheDocument();
  });

  it("shows validation error when submitting with empty title", async () => {
    render(<TaskForm onSubmit={async () => {}} />);

    const submitButton = screen.getByRole("button", { name: /add task/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/title is required/i)).toBeInTheDocument();
  });

  it("clears validation error when user types in title", async () => {
    render(<TaskForm onSubmit={async () => {}} />);

    const submitButton = screen.getByRole("button", { name: /add task/i });
    fireEvent.click(submitButton);
    expect(screen.getByText(/title is required/i)).toBeInTheDocument();

    const titleInput = screen.getByLabelText(/title/i);
    fireEvent.change(titleInput, { target: { value: "New Task" } });

    expect(screen.queryByText(/title is required/i)).not.toBeInTheDocument();
  });

  it("calls onSubmit with form data when valid", async () => {
    const mockOnSubmit = vi.fn();
    render(<TaskForm onSubmit={mockOnSubmit} />);

    const titleInput = screen.getByLabelText(/title/i);
    const descInput = screen.getByLabelText(/description/i);
    const submitButton = screen.getByRole("button", { name: /add task/i });

    fireEvent.change(titleInput, { target: { value: "Buy Groceries" } });
    fireEvent.change(descInput, { target: { value: "Milk and Eggs" } });
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: "Buy Groceries",
      description: "Milk and Eggs",
    });
  });

  it("clears form after successful submission", async () => {
    const mockOnSubmit = vi.fn().mockResolvedValue(undefined);
    render(<TaskForm onSubmit={mockOnSubmit} />);

    const titleInput = screen.getByLabelText(/title/i);
    const descInput = screen.getByLabelText(/description/i);
    const submitButton = screen.getByRole("button", { name: /add task/i });

    fireEvent.change(titleInput, { target: { value: "Task to Clear" } });
    fireEvent.change(descInput, { target: { value: "Should be cleared" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(titleInput).toHaveValue("");
      expect(descInput).toHaveValue("");
    });
  });

  it("displays loading state correctly", () => {
    render(<TaskForm onSubmit={async () => {}} isLoading={true} />);

    expect(screen.getByText(/adding.../i)).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toBeDisabled();
    expect(screen.getByLabelText(/description/i)).toBeDisabled();
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
