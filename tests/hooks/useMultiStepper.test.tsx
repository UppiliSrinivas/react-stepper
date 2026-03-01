import { render, screen } from "@testing-library/react";
import { MultiStepperContext, useMultiStepper } from "../../src/hooks";
import type { MultiStepperType } from "../../src/types";

function HookConsumer() {
  const { currentStep, steps, options } = useMultiStepper();

  return (
    <div>
      <div data-testid="current-step">{currentStep}</div>
      <div data-testid="steps-count">{steps.length}</div>
      <div data-testid="has-active-icon">{options?.activeIcon ? "yes" : "no"}</div>
    </div>
  );
}

describe("useMultiStepper", () => {
  it("throws when used outside MultiStepperProvider context", () => {
    expect(() => render(<HookConsumer />)).toThrow(
      "useMultiStepperForm must be used within a MultiStepperProvider"
    );
  });

  it("returns context value when used inside MultiStepperContext provider", () => {
    const value: MultiStepperType = {
      currentStep: 2,
      steps: [
        { id: 1, title: "Step 1", completed: true },
        { id: 2, title: "Step 2", completed: true },
        { id: 3, title: "Step 3", active: true },
      ],
      handleNextStep: vi.fn(),
      handlePrevStep: vi.fn(),
      updateSteps: vi.fn(),
      setStepStatus: vi.fn(),
      options: {
        activeIcon: <span>active</span>,
      },
    };

    render(
      <MultiStepperContext.Provider value={value}>
        <HookConsumer />
      </MultiStepperContext.Provider>
    );

    expect(screen.getByTestId("current-step")).toHaveTextContent("2");
    expect(screen.getByTestId("steps-count")).toHaveTextContent("3");
    expect(screen.getByTestId("has-active-icon")).toHaveTextContent("yes");
  });
});
