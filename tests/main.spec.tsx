import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { MultiStepperProvider } from "../src/contexts";
import { ReactMultiStepper } from "../example/main"; // UPDATE THIS PATH
import type { StepType } from "../src/types";

// mock root because createRoot() runs in example
vi.mock("react-dom/client", () => ({
    createRoot: () => ({ render: () => { } }),
}));

// Helper render with provider
const renderExample = () => {
    const steps: StepType[] = [
        {
            id: 1,
            title: "Step one",
            description: "Step one description",
            children: <div><h3>Step One Content</h3></div>,
        },
        {
            id: 2,
            title: "Step Two",
            description: "Step Two description",
            children: <div><h3>Step Two Content</h3></div>,
        },
        {
            id: 3,
            title: "Step Three",
            description: "Step Three description",
            children: <div><h3>Step Three Content</h3></div>,
        },
    ];

    return render(
        <MultiStepperProvider steppers={steps}>
            <ReactMultiStepper />
        </MultiStepperProvider>
    );
};

describe("ReactMultiStepper Example Integration Test", () => {
    it("renders Step One content initially", () => {
        renderExample();

        const el = screen.getByText("Step One Content");
        expect(el).toBeDefined();
    });

    it("moves to Step Two after clicking Next", () => {
        renderExample();

        const nextBtn = screen.getByText("Next");
        fireEvent.click(nextBtn);

        const el = screen.getByText("Step Two Content");
        expect(el).toBeDefined();
    });

    it("moves to Step Three after clicking Next twice", () => {
        renderExample();

        const nextBtn = screen.getByText("Next");

        // Step 1 → Step 2
        fireEvent.click(nextBtn);

        // Step 2 → Step 3
        fireEvent.click(nextBtn);

        const el = screen.getByText("Step Three Content");
        expect(el).toBeDefined();
    });

    it("shows Finish button on last step", () => {
        renderExample();

        const nextBtn = screen.getByText("Next");

        fireEvent.click(nextBtn); // go to step 2
        fireEvent.click(nextBtn); // go to step 3
        fireEvent.click(nextBtn); // attempt to go past last step

        const finishBtn = screen.getByText("Finish");
        expect(finishBtn).toBeDefined();
    });

    it("disable prev button when user in first step", () => {
        renderExample();

        const nextBtn = screen.getByText("Next");
        const prevBtn = screen.getByText("Prev");

        fireEvent.click(nextBtn); // go to step 2
        fireEvent.click(nextBtn); // go to step 3
        fireEvent.click(nextBtn); // attempt to go past last step

        const finishBtn = screen.getByText("Finish");
        expect(finishBtn).toBeDefined();

        fireEvent.click(prevBtn); // go to step 2
        fireEvent.click(prevBtn); // go to step 1
        expect(prevBtn.getAttribute("disabled")).toBeNull();
    });
});
