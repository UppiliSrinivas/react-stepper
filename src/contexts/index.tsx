import { useCallback, useEffect, useMemo, useState } from "react";
import type { MultiStepperProviderType, StepType } from '../types';
import { MultiStepperContext } from "../hooks";

export const MultiStepperProvider: React.FC<MultiStepperProviderType> = ({ children, steppers }) => {

    const [currentStep, setCurrentStep] = useState(0)
    const [steps, setSteps] = useState<StepType[]>([])

    useEffect(() => {
        if (steppers.length) {
            const temp = [...steppers]
            temp[0].active = true
            setSteps(temp)
        }
    }, [steppers, steppers.length])

    const updateSteps = useCallback((newStep: number) => {
        setSteps((prev) => {
            const updated = [...prev]

            // if more than length of steps array return steps array as its
            if (newStep > prev.length - 1) return prev

            // deactivate current step
            if (updated[currentStep])
                updated[currentStep] = { ...updated[currentStep], active: false }

            // activate new step
            if (updated[newStep])
                updated[newStep] = { ...updated[newStep], active: true }

            // mark prev steps as completed
            for (let i = 0; i < newStep; i++) {
                updated[i] = { ...updated[i], completed: true }
            }

            // mark future steps as incompleted
            for (let i = newStep; i < updated.length; i++) {
                updated[i] = { ...updated[i], completed: false }
            }

            return updated
        })
        setCurrentStep(newStep)
    }, [currentStep])

    const handleNextStep = useCallback(() => {
        if (currentStep < steps.length - 1) updateSteps(currentStep + 1)
        else setSteps((prev) => {
            const updated = [...prev]
            updated[currentStep] = { ...updated[currentStep], completed: true }
            return updated
        })
    }, [currentStep, steps.length, updateSteps])



    const handlePrevStep = useCallback(() => {
        if (currentStep > 0) updateSteps(currentStep - 1)
    }, [currentStep, updateSteps])


    const setStepStatus = useCallback(
        (status: "error" | "loading" | "active" | "completed") => {
            setSteps((prev) => {
                const updated = [...prev];
                if (updated[currentStep]) {
                    // reset all flags to false first
                    updated[currentStep] = {
                        ...updated[currentStep],
                        error: false,
                        loading: false,
                        active: false,
                        completed: false,
                    };

                    // now set the chosen status to true
                    updated[currentStep][status] = true;
                }
                return updated;
            });
        },
        [currentStep]
    );




    // ⚡️ Memoize the entire context value
    const contextValue = useMemo(
        () => ({
            currentStep,
            steps,
            handleNextStep,
            handlePrevStep,
            updateSteps,
            setStepStatus
        }),
        [currentStep, steps, handleNextStep, handlePrevStep, updateSteps, setStepStatus]
    );

    return <MultiStepperContext.Provider value={contextValue}>
        {children}
    </MultiStepperContext.Provider>
}