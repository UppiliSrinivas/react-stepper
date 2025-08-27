import { describe, it, expect } from "vitest";
import React, { type PropsWithChildren } from "react";
import { renderHook, act } from "@testing-library/react";
import { useMultiStepper } from "../hooks";
import { MultiStepperProvider } from "../contexts";
import type { StepType } from "../types";

describe("useMultiStepper and MultiStepperProvider", () => {
  // it("throws if used outside provider", () => {
  //   const { result } = renderHook(() => useMultiStepper());
  //   expect(result.current.).toBeInstanceOf(Error);
  //   expect(result.error?.message).toBe("useMultiStepperForm must be used within a MultiStepperProvider");
  // });

  it("initializes with first step active and supports navigation and status updates", () => {
    const steps: StepType[] = [
      { id: 1, title: "One", description: "First" },
      { id: 2, title: "Two", description: "Second" },
      { id: 3, title: "Three", description: "Third" },
    ];

    const wrapper: React.FC<PropsWithChildren> = ({ children }) => (
      <MultiStepperProvider steppers={steps}>{children}</MultiStepperProvider>
    );

    const { result } = renderHook(() => useMultiStepper(), { wrapper });

    // First step active by default
    expect(result.current.currentStep).toBe(0);
    expect(result.current.steps[0].active).toBe(true);

    // set status variations
    act(() => result.current.setStepStatus("loading"));
    expect(result.current.steps[0].loading).toBe(true);

    act(() => result.current.setStepStatus("error"));
    expect(result.current.steps[0].error).toBe(true);

    act(() => result.current.setStepStatus("completed"));
    expect(result.current.steps[0].completed).toBe(true);

    // updateSteps should move the current step and clear future completions
    act(() => result.current.updateSteps(2));
    expect(result.current.currentStep).toBe(2);
    expect(result.current.steps[2].active).toBe(true);

    // move prev and next
    act(() => result.current.handlePrevStep());
    expect(result.current.currentStep).toBe(1);
    act(() => result.current.handleNextStep());
    expect(result.current.currentStep).toBe(2);
  });
});
