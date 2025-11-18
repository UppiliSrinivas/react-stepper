import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { StepperContent } from "../src/components/StepperContent";
import { MultiStepperProvider } from "../src/contexts";
import { StepType } from "../src/types";

const renderWithProvider = (steps: StepType[]) => {
    return render(
        <MultiStepperProvider steppers={steps}>
            {/* override initial currentStep state */}
            <StepperContent />
        </MultiStepperProvider>
    );
};

describe("StepperContent Component", () => {
    it("renders children of the active step", () => {
        const steps = [
            {
                id: 1,
                title: "Step 1",
                active: true,
                children: <div>Step One Content</div>,
            },
        ];

        renderWithProvider(steps);

        // It should find the child content
        const content = screen.getByText("Step One Content");
        expect(content).toBeDefined();
    });

    it("returns null when current step has no children", () => {
        const steps = [
            {
                id: 1,
                title: "Step 1",
                active: true,
                children: null,
            },
        ];

        const { container } = renderWithProvider(steps);

        // StepperContent returns null → container should be empty
        expect(container.innerHTML.trim()).toBe("");
    });

    it("renders the correct step when multiple steps exist", () => {
        const steps = [
            {
                id: 1,
                title: "Step 1",
                active: true,
                children: <div>Step One</div>,
            },
            {
                id: 2,
                title: "Step 2",
                active: false,
                children: <div>Step Two</div>,
            },
        ];

        // The provider automatically sets step 0 as active
        renderWithProvider(steps);

        const content = screen.getByText("Step One");
        expect(content).toBeDefined();
    });
});
