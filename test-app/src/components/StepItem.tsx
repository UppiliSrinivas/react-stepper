import React, { Fragment } from 'react';
import { useMultiStepper } from '../hooks';
import type { StepType } from '../types';

type StepItemType = {
  step: StepType,
  index: number
}

export const Step: React.FC<StepItemType> = ({
  step, index
}) => {
  const { steps, options } = useMultiStepper()
  if (!steps.length) return <Fragment />

  if (step.completed) return <div className='step step-complete'>
    {
      step.icon ? step.icon : options?.completedIcon ??
        <span className='text-white'>&#x2713;</span>
    }
  </div>

  if (step.active) return <div className='step step-active'>
    {
      step.icon ? step.icon : options?.activeIcon ??
        <h2 className='text-white'>{index}</h2>
    }
  </div>

  return (
    <div className={`step step-default`}>
      {step.icon ?? <h2>{index}</h2>}
    </div>
  );
};
