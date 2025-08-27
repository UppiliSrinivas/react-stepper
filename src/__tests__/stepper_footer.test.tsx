import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MultiStepperProvider } from "../contexts";
import { StepperFooter } from "../components/StepperFooter";
import type { StepType } from "../types";

describe("StepperFooter", () => {
  it("calls onClickNext and shows 'Finish' on last step", () => {
    const onNext = vi.fn();
    const steps: StepType[] = [
      { title: "A", completed: true },
      { title: "B", active: true },
    ];
    render(
      <MultiStepperProvider steppers={steps}>
        <StepperFooter onClickNext={onNext} />
      </MultiStepperProvider>
    );

    // On second (last) step, button should read Finish
    expect(screen.getByRole("button", { name: /finish/i })).toBeInTheDocument();

    // Clicking Next/Finish triggers provided callback
    fireEvent.click(screen.getByRole("button", { name: /finish/i }));
    expect(onNext).toHaveBeenCalledTimes(1);

    // Prev button is present
    expect(screen.getByRole("button", { name: /prev/i })).toBeInTheDocument();
  });
});
