import React, { Fragment } from 'react';
import { useMultiStepper } from '../hooks';
import type { StepType } from '../types';
import Spinner from './spinner';

type StepItemType = {
  step: StepType,
  index: number
}

export const Step: React.FC<StepItemType> = ({
  step, index
}) => {
  const { steps } = useMultiStepper()
  if (!steps.length) return <Fragment />

  if (step.loading) return <div className='step step-loading'>
    <Spinner />
  </div>

  if (step.error) return <div className='step step-error'>
    {/* <Icon name={"X"} className='text-white' /> */}
    <span className='text-white'>&#x2717;</span> 
  </div>

  if (step.completed) return <div className='step step-complete'>
    {/* <Icon name={"Check"} className='text-white' /> */}
    <span className='text-white'>&#x2713;</span> 
  </div>

  if (step.finshed) return <div className='step step-complete'>
    {/* <Icon name={"Check"} className='text-white' /> */}
    {step.icon}
  </div>

  if (step.active) return <div className='step step-active'>
    {
      step.icon ??
      <h2 className='text-white'>{index}</h2>
    }

  </div>

  return (
    <div className={`step step-default`}>
      {step.icon ?? <h2>{index}</h2>}
    </div>
  );
};
