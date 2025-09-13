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
          steps.map((step, i) => {
            const isActive = step.active && !step.completed && !step.loading && !step.error
            const isComplete = step.completed && !step.active && !step.loading && !step.error
            const isError = step.error && !step.active && !step.completed && !step.loading
            const isLoading = step.loading && !step.completed && !step.active && !step.error



            console.log( step.id, {  isActive, isComplete,isError, isLoading });

            return (
              <div
                key={i}
                className={`step-item ${isLoading && "active"} ${isActive && "active"} ${isComplete && "complete"} ${isError && "error"}`}
              >
                <Step index={i + 1} step={step} />
                <div className="step-text">
                  {step.title && <h3 className="step-title">{step.title}</h3>}
                  {step.description && <h3 className="step-description">{step.description}</h3>}
                </div>
              </div>
            )
          })
        }
      </ol>
    </div>
  );
};
