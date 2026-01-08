import { render, screen } from "@testing-library/react";
import { ProgressBar } from "@/components/ui";

describe("ProgressBar", () => {
  it("renders with correct progress value", () => {
    render(<ProgressBar value={50} />);

    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveAttribute("aria-valuenow", "50");
    expect(progressbar).toHaveAttribute("aria-valuemin", "0");
    expect(progressbar).toHaveAttribute("aria-valuemax", "100");
  });

  it("displays percentage when showPercentage is true", () => {
    render(<ProgressBar value={75} showPercentage />);
    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  it("hides percentage when showPercentage is false", () => {
    render(<ProgressBar value={75} showPercentage={false} />);
    expect(screen.queryByText("75%")).not.toBeInTheDocument();
  });

  it("displays label when provided", () => {
    render(<ProgressBar value={50} label="Loading" />);
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  it("clamps progress to 0-100 range", () => {
    const { rerender } = render(<ProgressBar value={150} />);
    expect(screen.getByText("100%")).toBeInTheDocument();

    rerender(<ProgressBar value={-50} />);
    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  it("handles custom max value", () => {
    render(<ProgressBar value={25} max={50} />);
    expect(screen.getByText("50%")).toBeInTheDocument();
  });
});
