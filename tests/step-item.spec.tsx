// __tests__/StepItem.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Step } from "../src/components/StepItem";
import { MultiStepperProvider } from "../src/contexts";
import { StepType } from "../src/types";

describe("StepItem Component (no jest-dom)", () => {
    const renderWithProvider = (step: StepType, index = 1) =>
        render(
            <MultiStepperProvider steppers={[step]}>
                <Step step={step} index={index} />
            </MultiStepperProvider>
        );

    it("renders active step correctly", () => {
        const step = { id: 1, title: "Step 1", active: true };
        renderWithProvider(step, 1);

        const stepElement = screen.getByText("1");
        // existence
        expect(stepElement).toBeDefined();

        // parent element class contains expected token
        const parent = stepElement.parentElement;
        expect(parent).not.toBeNull();
        expect(parent?.className.includes("step-active")).toBe(true);
    });

    it("renders completed step correctly", () => {
        const step = { id: 2, title: "Step 2", completed: true };
        renderWithProvider(step, 2);

        // completed UI renders a tick ✓ — adjust if your component renders different char
        const tick = screen.getByText("✓");
        expect(tick).toBeDefined();

        const parent = tick.parentElement;
        expect(parent).not.toBeNull();
        expect(parent?.className.includes("step-complete") || parent?.className.includes("step-completed")).toBe(true);
    });

    it("renders default step correctly", () => {
        const step = { id: 3, title: "Step 3" };
        renderWithProvider(step, 3);

        const stepElement = screen.getByText("3");
        expect(stepElement).toBeDefined();

        const parent = stepElement.parentElement;
        expect(parent).not.toBeNull();
        // check for default class name or border class
        expect(parent?.className.includes("step-default") || parent?.className.includes("step")).toBe(true);
    });
});
