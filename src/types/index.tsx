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
    textColor?: string;
    activeTextColor?: string;
    bgColor?: string;
    activeBgColor?: string;
    completedBgColor?: string;
    completedTextColor?: string;
    errorBgColor?: string;
    errorTextColor?: string;
    loadingBgColor?: string;
}

type OptionsType = {
    completedIcon?: ReactNode;
    activeIcon?: ReactNode;
    errorIcon?: ReactNode;
    loadingIcon?: ReactNode;
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
