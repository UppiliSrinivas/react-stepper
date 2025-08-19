import type { ReactNode } from "react";
type StepType = {
    id?: number;
    title?: string;
    description?: string;
    icon?: ReactNode;
    active?: boolean;
    finshed?: boolean;
    error?: boolean;
    loading?: boolean;
    completed?: boolean;
    children?: ReactNode
}

type StepStyleType = {
    activeBgColor?: string;
    activeTextColor?: string;
    completedBgColor?: string;
    completedTextColor?: string
}

type MultiStepperType = {
    currentStep: number;
    steps: StepType[];
    handleNextStep: () => void;
    handlePrevStep: () => void;
    updateSteps: (newStep: number) => void;
    setStepStatus: (status: "error" | "loading" | "active" | "completed") => void;
}

type MultiStepperProviderType = {
    children: ReactNode;
    steppers: StepType[]
}
export type { MultiStepperProviderType, MultiStepperType, StepStyleType, StepType };
