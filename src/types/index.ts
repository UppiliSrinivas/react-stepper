import type { ReactNode } from "react";
type StepType = {
    id?: number;
    title?: string;
    description?: string;
    icon?: ReactNode;
    active?: boolean;
    completed?: boolean;
    children?: ReactNode
}

type StepStyleType = {
    textColor?: string;
    activeTextColor?: string;
    bgColor?: string;
    activeBgColor?: string;
    completedBgColor?: string;
    completedTextColor?: string;
}

type OptionsType = {
    completedIcon?: ReactNode;
    activeIcon?: ReactNode;
}

type MultiStepperType = {
    currentStep: number;
    steps: StepType[];
    handleNextStep: () => void;
    handlePrevStep: () => void;
    updateSteps: (newStep: number) => void;
    setStepStatus: (status: "active" | "completed") => void;
    // styles?: StepStyleType;
    options?: OptionsType;
}

type MultiStepperProviderType = {
    children: ReactNode;
    steppers: StepType[];
    // styles?: StepStyleType;
    options?: OptionsType;
}

export type { MultiStepperProviderType, MultiStepperType, StepStyleType, StepType };
