import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { StepperFooter } from "../src/components/StepperFooter";
import { MultiStepperProvider } from "../src/contexts";
import type { StepType } from "../src/types";


describe("StepperFooter (no jest-dom)", () => {
    it("shows Prev and Next and Prev gets disabled-class on first step", () => {
        const steps: StepType[] = [
            { id: 1, title: "Step 1", children: <div>one</div> },
            { id: 2, title: "Step 2", children: <div>two</div> },
        ];

        render(
            <MultiStepperProvider steppers={steps}>
                <StepperFooter onClickNext={() => { }} />
            </MultiStepperProvider>
        );

        const prevBtn = screen.getByText("Prev");
        const nextBtn = screen.getByText("Next");

        // Buttons exist
        expect(prevBtn).toBeDefined();
        expect(nextBtn).toBeDefined();

        // check token in className
        expect(prevBtn.className.includes("stepper-button-disbled")).toBe(true);

        // Note: disabled attribute in code is currentStep < 0 => false for step 0
        expect(prevBtn.getAttribute("disabled")).toBeNull();
    });

    it("calls onClickNext when current step is not completed", () => {
        const onClickNext = vi.fn();
        const steps: StepType[] = [
            { id: 1, title: "Step 1", children: <div>one</div>, completed: false },
            { id: 2, title: "Step 2", children: <div>two</div> },
        ];

        render(
            <MultiStepperProvider steppers={steps}>
                <StepperFooter onClickNext={onClickNext} />
            </MultiStepperProvider>
        );

        const nextBtn = screen.getByText("Next");
        fireEvent.click(nextBtn);

        expect(onClickNext).toHaveBeenCalledTimes(1);
    });

    it("does NOT call onClickNext when current step is already completed", () => {
        const onClickNext = vi.fn();
        const steps: StepType[] = [
            { id: 1, title: "Step 1", children: <div>one</div>, completed: true },
            { id: 2, title: "Step 2", children: <div>two</div> },
        ];

        render(
            <MultiStepperProvider steppers={steps}>
                <StepperFooter onClickNext={onClickNext} />
            </MultiStepperProvider>
        );

        const nextBtn = screen.getByText("Next");
        fireEvent.click(nextBtn);

        expect(onClickNext).toHaveBeenCalledTimes(0);
    });

    it("shows Finish and filled class when on last step", () => {
        const onClickNext = vi.fn();
        const steps: StepType[] = [
            {
                id: 1,
                title: "Only Step",
                children: <div>only</div>,
                completed: false,
            },
        ];

        render(
            <MultiStepperProvider steppers={steps}>
                <StepperFooter onClickNext={onClickNext} />
            </MultiStepperProvider>
        );

        // Since only step index 0 is also last index -> should show Finish
        const finishBtn = screen.getByText("Finish");
        expect(finishBtn).toBeDefined();

        // Check that the fill class is applied
        expect(finishBtn.className.includes("stepper-button-fill")).toBe(true);

        // clicking finish should invoke onClickNext when not completed
        fireEvent.click(finishBtn);
        expect(onClickNext).toHaveBeenCalledTimes(1);
    });
});
