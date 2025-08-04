import React, { useMemo } from 'react';
import { useMultiStepper } from '../hooks';

export const StepperFooter: React.FC = () => {
  const { handleNextStep, handlePrevStep, currentStep, steps } = useMultiStepper();
  const isFinshed = currentStep === steps.length - 1

  const buttonClass = useMemo(() => ({
    button: ` px-8 py-1.5 text-md rounded-md border border-gray-400`,
    fill: ` border-blue-500 bg-blue-500 text-white`
  }), [])

  return (
    <div className='w-full flex justify-around items-center p-6'>
      {
        currentStep > 0 ?
          <button type="button"
            className={buttonClass.button}
            onClick={handlePrevStep} >Prev</button>
          : <div />
      }
      <button type="button"
        className={`${isFinshed ?
          buttonClass.button + buttonClass.fill :
          buttonClass.button} cursor-pointer`}
        onClick={handleNextStep}>
        {isFinshed ? `Finish` : `Next`}
      </button>
    </div>
  );
};
