import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MultiStepperProvider } from "../../src/contexts";
import { useMultiStepper } from "../../src/hooks";
import type { StepType } from "../../src/types";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom"

const baseSteps: StepType[] = [
  { id: 1, title: "Step 1" },
  { id: 2, title: "Step 2" },
  { id: 3, title: "Step 3" },
];

const readSteps = () =>
  JSON.parse(screen.getByTestId("steps-state").textContent || "[]") as Array<{
    id: number;
    title?: string;
    active: boolean;
    completed: boolean;
  }>;

function Consumer() {
  const {
    currentStep,
    steps,
    handleNextStep,
    handlePrevStep,
    updateSteps,
    setStepStatus,
    options,
  } = useMultiStepper();

  return (
    <div>
      <div data-testid="current-step">{currentStep}</div>
      <div data-testid="has-options">{options?.activeIcon ? "yes" : "no"}</div>
      <div data-testid="steps-state">
        {JSON.stringify(
          steps.map((step) => ({
            id: step.id,
            title: step.title,
            active: Boolean(step.active),
            completed: Boolean(step.completed),
          }))
        )}
      </div>
      <button type="button" onClick={handleNextStep}>
        next
      </button>
      <button type="button" onClick={handlePrevStep}>
        prev
      </button>
      <button type="button" onClick={() => updateSteps(2)}>
        jump-2
      </button>
      <button type="button" onClick={() => updateSteps(99)}>
        jump-out
      </button>
      <button type="button" onClick={() => setStepStatus("completed")}>
        set-completed
      </button>
      <button type="button" onClick={() => setStepStatus("active")}>
        set-active
      </button>
    </div>
  );
}

function renderProvider(steps: StepType[] = baseSteps) {
  return render(
    <MultiStepperProvider
      steppers={steps}
      options={{ activeIcon: <span>active-icon</span> }}
    >
      <Consumer />
    </MultiStepperProvider>
  );
}

describe("MultiStepperProvider", () => {
  it("handles empty steppers safely", () => {
    renderProvider([]);

    expect(screen.getByTestId("current-step")).toHaveTextContent("0");
    expect(readSteps()).toEqual([]);

    fireEvent.click(screen.getByRole("button", { name: "next" }));
    fireEvent.click(screen.getByRole("button", { name: "prev" }));
    fireEvent.click(screen.getByRole("button", { name: "set-completed" }));

    expect(screen.getByTestId("current-step")).toHaveTextContent("0");
    expect(readSteps()).toEqual([]);
  });

  it("initializes with first step active and exposes options", async () => {
    renderProvider();

    await waitFor(() => {
      expect(readSteps()).toHaveLength(3);
    });

    expect(screen.getByTestId("current-step")).toHaveTextContent("0");
    expect(screen.getByTestId("has-options")).toHaveTextContent("yes");

    expect(readSteps()).toEqual([
      { id: 1, title: "Step 1", active: true, completed: false },
      { id: 2, title: "Step 2", active: false, completed: false },
      { id: 3, title: "Step 3", active: false, completed: false },
    ]);
  });

  it("moves forward with handleNextStep and marks previous steps completed", async () => {
    renderProvider();

    await waitFor(() => {
      expect(readSteps()).toHaveLength(3);
    });

    fireEvent.click(screen.getByRole("button", { name: "next" }));
    expect(screen.getByTestId("current-step")).toHaveTextContent("1");
    expect(readSteps()).toEqual([
      { id: 1, title: "Step 1", active: false, completed: true },
      { id: 2, title: "Step 2", active: true, completed: false },
      { id: 3, title: "Step 3", active: false, completed: false },
    ]);

    fireEvent.click(screen.getByRole("button", { name: "next" }));
    expect(screen.getByTestId("current-step")).toHaveTextContent("2");
    expect(readSteps()).toEqual([
      { id: 1, title: "Step 1", active: false, completed: true },
      { id: 2, title: "Step 2", active: false, completed: true },
      { id: 3, title: "Step 3", active: true, completed: false },
    ]);
  });

  it("marks final step completed when handleNextStep is called on the last step", async () => {
    renderProvider();

    await waitFor(() => {
      expect(readSteps()).toHaveLength(3);
    });

    fireEvent.click(screen.getByRole("button", { name: "jump-2" }));
    fireEvent.click(screen.getByRole("button", { name: "next" }));

    expect(screen.getByTestId("current-step")).toHaveTextContent("2");
    expect(readSteps()).toEqual([
      { id: 1, title: "Step 1", active: false, completed: true },
      { id: 2, title: "Step 2", active: false, completed: true },
      { id: 3, title: "Step 3", active: true, completed: true },
    ]);
  });

  it("moves backward with handlePrevStep and does nothing on first step", async () => {
    renderProvider();

    await waitFor(() => {
      expect(readSteps()).toHaveLength(3);
    });

    fireEvent.click(screen.getByRole("button", { name: "jump-2" }));
    fireEvent.click(screen.getByRole("button", { name: "prev" }));

    expect(screen.getByTestId("current-step")).toHaveTextContent("1");
    expect(readSteps()).toEqual([
      { id: 1, title: "Step 1", active: false, completed: true },
      { id: 2, title: "Step 2", active: true, completed: false },
      { id: 3, title: "Step 3", active: false, completed: false },
    ]);

    fireEvent.click(screen.getByRole("button", { name: "prev" }));
    fireEvent.click(screen.getByRole("button", { name: "prev" }));

    expect(screen.getByTestId("current-step")).toHaveTextContent("0");
    expect(readSteps()).toEqual([
      { id: 1, title: "Step 1", active: true, completed: false },
      { id: 2, title: "Step 2", active: false, completed: false },
      { id: 3, title: "Step 3", active: false, completed: false },
    ]);
  });

  it("updates status for current step using setStepStatus", async () => {
    renderProvider();

    await waitFor(() => {
      expect(readSteps()).toHaveLength(3);
    });

    fireEvent.click(screen.getByRole("button", { name: "set-completed" }));
    expect(readSteps()[0]).toEqual({
      id: 1,
      title: "Step 1",
      active: false,
      completed: true,
    });

    fireEvent.click(screen.getByRole("button", { name: "set-active" }));
    expect(readSteps()[0]).toEqual({
      id: 1,
      title: "Step 1",
      active: true,
      completed: false,
    });
  });

  it("keeps steps unchanged when updateSteps receives an out-of-range index", async () => {
    renderProvider();

    await waitFor(() => {
      expect(readSteps()).toHaveLength(3);
    });

    const before = readSteps();
    fireEvent.click(screen.getByRole("button", { name: "jump-out" }));

    expect(readSteps()).toEqual(before);
  });
});
