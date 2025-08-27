import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MultiStepperProvider } from "../contexts";
import { StepperHeader } from "../components/StepperHeader";
import type { StepType } from "../types";

describe("StepperHeader + StepItem", () => {
  it("renders nothing when no steps", () => {
    const { container } = render(
      <MultiStepperProvider steppers={[]}>
        <StepperHeader />
      </MultiStepperProvider>
    );
    expect(container.querySelector(".stepper-header")).toBeNull();
  });

  it("renders titles/descriptions and various statuses", () => {
    const steps: StepType[] = [
      { title: "Loading", loading: true },
      { title: "Error", error: true },
      { title: "Done", completed: true, description: "All set" },
      { title: "Active", active: true },
      { title: "Default" },
    ];

    render(
      <MultiStepperProvider steppers={steps}>
        <StepperHeader />
      </MultiStepperProvider>
    );

    // Titles visible
    steps.forEach(s => {
      if (s.title) expect(screen.getByText(s.title)).toBeInTheDocument();
    });
    // Description visible where provided
    expect(screen.getByText("All set")).toBeInTheDocument();

    // Icons/spinner branches present
    expect(screen.getByRole("status", { name: /loading/i })).toBeInTheDocument(); // spinner
    expect(screen.getByText("✓")).toBeInTheDocument(); // completed check mark
    expect(screen.getByText("✗")).toBeInTheDocument(); // error cross
  });
});
