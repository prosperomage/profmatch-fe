import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "@/components/ui";

describe("Input", () => {
  it("renders with label", () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it("renders without label", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText(/enter text/i)).toBeInTheDocument();
  });

  it("handles user input", async () => {
    render(<Input label="Name" />);
    const input = screen.getByLabelText(/name/i);

    await userEvent.type(input, "John Doe");
    expect(input).toHaveValue("John Doe");
  });

  it("displays error message", () => {
    render(<Input label="Email" error="Invalid email" />);

    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("is disabled when disabled prop is true", () => {
    render(<Input label="Name" disabled />);
    expect(screen.getByLabelText(/name/i)).toBeDisabled();
  });

  it("applies error styles when error is present", () => {
    render(<Input label="Email" error="Required" />);
    expect(screen.getByRole("textbox")).toHaveClass("border-error");
  });
});