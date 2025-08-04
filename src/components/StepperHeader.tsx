import React, { Fragment } from 'react';
import { useMultiStepper } from '../hooks';
import { Step } from './StepperIcon';


export const StepperHeader: React.FC = () => {
  const { steps } = useMultiStepper()

  if (!steps.length) return <Fragment />
  return (
    <div className='app-container w-full'>
      <ol className='flex w-full justify-between'>
        {
          steps.map((step, i) => (
            <div
              key={i}
              className={`step-item ${step.active && "active"} ${step.completed && "complete"
                } `}
            >

              <Step index={i + 1} step={step} />

              <div className='text-center mt-4'>
                {step.title && <h3 className='text-md text-gray-900 font-medium mb-1'>{step.title}</h3>}
                {step.description && <h3 className='text-sm text-gray-600 font-light'>{step.description}</h3>}
              </div>

            </div>
          ))
        }

      </ol>
    </div>
  );
};
