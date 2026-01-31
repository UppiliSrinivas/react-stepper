import React, { Fragment } from 'react';
import { StepperContent } from './StepperContent';
import { StepperFooter } from './StepperFooter';
import { StepperHeader } from './StepperHeader';

type StepperProps = {
  onClickNext: () => void
}

export const MultiStepper: React.FC<StepperProps> = ({
  onClickNext,
}) => {
  return (
    <Fragment>
      <StepperHeader />
      <StepperContent />
      <StepperFooter onClickNext={onClickNext} />
    </Fragment>
  );
};
