import React, { Fragment } from 'react';
import { StepperContent } from './components/StepperContent';
import { StepperFooter } from './components/StepperFooter';
import { StepperHeader } from './components/StepperHeader';

type StepperProps = {
  onClickNext: () => void
}

export const MultiStepper: React.FC<StepperProps> = ({
  onClickNext
}) => {
  return (
    <Fragment>
      <StepperHeader />
      <StepperContent />
      <StepperFooter onClickNext={onClickNext} />
    </Fragment>
  );
};
