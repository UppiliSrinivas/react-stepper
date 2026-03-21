import { useEffect, useState } from 'react'
import { MultiStepperContext } from '../hooks'
import type { MultiStepperProviderType, StepType } from '../types'

export const MultiStepperProvider: React.FC<MultiStepperProviderType> = ({
  children,
  steppers,
  options,
}) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<StepType[]>([])

  useEffect(() => {
    if (steppers.length) {
      const temp = [...steppers]
      temp[0].active = true
      setSteps(temp)
    }
  }, [steppers, steppers.length])

  const updateSteps = (newStep: number) => {
    if (newStep < 0 || newStep > steps.length - 1) return

    setSteps((prev) => {
      const updated = [...prev]

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
  }

  const handleNextStep = () => {
    if (!steps.length) return

    if (currentStep < steps.length - 1) updateSteps(currentStep + 1)
    else
      setSteps((prev) => {
        const updated = [...prev]
        if (!updated[currentStep]) return prev
        updated[currentStep] = { ...updated[currentStep], completed: true }
        return updated
      })
  }

  const handlePrevStep = () => {
    if (currentStep > 0) updateSteps(currentStep - 1)
  }

  const setStepStatus = (status: 'active' | 'completed') => {
    setSteps((prev) => {
      const updated = [...prev]
      if (updated[currentStep]) {
        // reset all flags to false first
        updated[currentStep] = {
          ...updated[currentStep],
          active: false,
          completed: false,
        }

        // now set the chosen status to true
        updated[currentStep][status] = true
      }
      return updated
    })
  }

  // ⚡️ Memoize the entire context value
  const contextValue = {
    currentStep,
    steps,
    handleNextStep,
    handlePrevStep,
    updateSteps,
    setStepStatus,
    // styles,
    options,
  }

  return (
    <MultiStepperContext.Provider value={contextValue}>
      {children}
    </MultiStepperContext.Provider>
  )
}
