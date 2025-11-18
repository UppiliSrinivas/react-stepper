import React, { useCallback } from 'react';
import { useMultiStepper } from '../hooks';

type StepperFooterProps = {
  onClickNext: () => void
}

export const StepperFooter: React.FC<StepperFooterProps> = React.memo(({ onClickNext }) => {
  const { handlePrevStep, currentStep, steps } = useMultiStepper();
  const isLastStep = currentStep === steps.length - 1;
  const isPrevDisabled = currentStep === 0;

  const handleNext = useCallback(() => {
    if (!steps[currentStep].completed) {
      onClickNext()
    }
  }, [steps, currentStep, onClickNext])

  const handlePrev = useCallback(() => {
    if (!isPrevDisabled) handlePrevStep()
  }, [isPrevDisabled, handlePrevStep])

  return <div className="stepper-footer">
    <button
      type="button"
      className={`stepper-button 
        ${isPrevDisabled ? 'stepper-button-disbled' : ''}`}
      onClick={handlePrev}
      disabled={currentStep < 0}
    >
      Prev
    </button>

    <button
      type="button"
      className={isLastStep ?
        'stepper-button stepper-button-fill' :
        'stepper-button'}
      onClick={handleNext}
    >
      {isLastStep ? 'Finish' : 'Next'}
    </button>
  </div>
})