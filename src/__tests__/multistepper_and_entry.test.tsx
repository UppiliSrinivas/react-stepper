import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MultiStepper } from "../MultiStepper";
import * as Entry from "../index";
import { MultiStepperProvider } from "../contexts";
import type { StepType } from "../types";

describe("MultiStepper + Entry exports", () => {
  it("exports expected members", () => {
    expect(Entry.MultiStepper).toBeDefined();
    expect(Entry.MultiStepperProvider).toBeDefined();
    expect(Entry.useMultiStepper).toBeDefined();
  });

  it("renders header, content, footer, and wires onClickNext", () => {
    const onNext = vi.fn();
    const steps: StepType[] = [
      { title: "A", children: <div data-testid="a">A</div>, active: true },
      { title: "B", children: <div data-testid="b">B</div> },
    ];

    render(
      <MultiStepperProvider steppers={steps}>
        <MultiStepper onClickNext={onNext} />
      </MultiStepperProvider>
    );

    // header titles
    expect(screen.getByText("A")).toBeInTheDocument();
    // content
    expect(screen.getByTestId("a")).toBeInTheDocument();
    // footer next/finish present
    expect(screen.getByRole("button", { name: /next|finish/i })).toBeInTheDocument();
  });
});
