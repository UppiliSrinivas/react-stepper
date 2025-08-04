import React, { Fragment } from 'react';
import { useMultiStepper } from '../hooks';
import type { StepType } from '../types';
import Icon from './icon';
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

  if (step.loading) return <div className='step step-active'>
    <Spinner />
  </div>

  if (step.error) return <div className='step bg-red-500'>
    <Icon name={"X"} className='text-white' />
  </div>

  if (step.completed) return <div className='step bg-green-500'>
    <Icon name={"Check"} className='text-white' />
  </div>

  if (step.finshed) return <div className='step bg-green-500'>
    <Icon name={"Check"} className='text-white' />
  </div>

  if (step.active) return <div className='step bg-blue-500'>
    {
      step.icon ?
        <Icon name={step.icon} className='text-white' />
        : <h2 className='text-white'>{index}</h2>
    }
    
  </div>

  return (
    <div className={`step border border-gray-300`}>
      {
        step.icon ? <Icon name={step.icon} className={`step-icon`} />
          : <h2>{index}</h2>
      }
    </div>
  );
};
