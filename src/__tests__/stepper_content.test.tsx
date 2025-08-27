import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MultiStepperProvider } from "../contexts";
import { StepperContent } from "../components/StepperContent";
import type { StepType } from "../types";

describe("StepperContent", () => {
  it("shows current step children", () => {
    const steps: StepType[] = [
      { title: "A", children: <div>First Body</div>, active: true },
      { title: "B", children: <div>Second Body</div> },
    ];
    const { rerender } = render(
      <MultiStepperProvider steppers={steps}>
        <StepperContent />
      </MultiStepperProvider>
    );
    expect(screen.getByText("First Body")).toBeInTheDocument();

    // Switch active step and check re-render (by giving a new steppers array)
    const steps2: StepType[] = [
      { title: "A", children: <div>First Body</div> },
      { title: "B", children: <div>Second Body</div>, active: true },
    ];
    rerender(
      <MultiStepperProvider steppers={steps2}>
        <StepperContent />
      </MultiStepperProvider>
    );
    expect(screen.getByText("Second Body")).toBeInTheDocument();
  });
});
