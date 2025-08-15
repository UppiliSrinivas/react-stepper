import React, { Fragment } from 'react';
import { useMultiStepper } from '../hooks';
import { Step } from './StepItem';


export const StepperHeader: React.FC = () => {
  const { steps } = useMultiStepper()

  if (!steps.length) return <Fragment />
  return (
    <div className='app-container'>
      <ol className='stepper-header'>
        {
          steps.map((step, i) => (
            <div
              key={i}
              className={`step-item ${step.active && "active"} ${step.completed && "complete"
                } `}
            >

              <Step index={i + 1} step={step} />

              <div className="step-text">
                {step.title && <h3 className="step-title">{step.title}</h3>}
                {step.description && <h3 className="step-description">{step.description}</h3>}
              </div>

            </div>
          ))
        }

      </ol>
    </div>
  );
};
