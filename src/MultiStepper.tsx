import React from 'react';
import type { StepType } from './types';
import { MultiStepperProvider } from './contexts';
import { StepperHeader } from './components/StepperHeader';
import { StepperFooter } from './components/StepperFooter';
import { StepperContent } from './components/StepperContent';

type StepperProps = {
  steps?: StepType[];
  onClickNext:(currentStep:number)=> void
}

export const MultiStepper: React.FC<StepperProps> = ({
  steps,
  onClickNext
}) => {
  if (!steps) return <></>
  return (
    <MultiStepperProvider steppers={steps}>
      <StepperHeader />
      <StepperContent />
      <StepperFooter onClickNext={onClickNext}/>
    </MultiStepperProvider>
  );
};
