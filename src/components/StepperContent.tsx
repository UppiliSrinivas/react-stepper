import React from 'react';
import { useMultiStepper } from '../hooks';


export const StepperContent: React.FC = () => {
  const { steps, currentStep } = useMultiStepper()
  return (
    <div className='stepper-content'>
      {
        steps[currentStep] && 
        steps[currentStep].children && 
        steps[currentStep].children
      }
    </div>
  );
};
