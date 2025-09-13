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

  if (step.loading) return <div className='step step-active'>
    <div className="spinner" role="status" aria-label="Loading"></div>
  </div>

  if (step.error) return <div className='step step-error'>
    {
      step.icon ? step.icon : options?.errorIcon ??
        <span className='text-white'>&#x2717;</span>
    }
  </div>

  if (step.completed) return <div className='step step-complete'>
    {
      step.icon ? step.icon : options?.completedIcon ??
        <span className='text-white'>&#x2713;</span>
    }
  </div>

  if (step.finshed) return <div className='step step-complete'>
    {step.icon}
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
