import React, { useMemo } from 'react';
import { useMultiStepper } from '../hooks';

type StepperFooterProps = {
  onClickNext: () => void
}

export const StepperFooter: React.FC<StepperFooterProps> = ({ onClickNext }) => {
  const { handlePrevStep, currentStep, steps } = useMultiStepper();
  const isFinished = currentStep === steps.length - 1;

  const handleNext = () => {

    if (!steps[currentStep].completed) {
      // handleNextStep()
      onClickNext()
    }

  }

  const buttonClass = useMemo(() => ({
    button: 'stepper-button',
    fill: 'stepper-button-fill'
  }), []);

  return (
    <div className="stepper-footer">
      <button
        type="button"
        className={buttonClass.button}
        onClick={handlePrevStep}
        disabled={currentStep < 0}
      >
        Prev
      </button>

      <button
        type="button"
        className={`${isFinished ? `${buttonClass.button} ${buttonClass.fill}` : buttonClass.button}`}
        onClick={handleNext}
      >
        {isFinished ? 'Finish' : 'Next'}
      </button>
    </div>
  );
};
