import React, { Fragment } from 'react';
import { useMultiStepper } from '../hooks';
import { Step } from './StepItem';


export const StepperHeader: React.FC = () => {
  const { steps, updateSteps } = useMultiStepper()
  const onClickStep = (index: number) => updateSteps(index);
  if (!steps.length) return <Fragment />
  return (
    <div className='app-container'>
      <ol className='stepper-header'>
        {
          steps.map((step, i) => {
            const isActive = Boolean(step.active);
            const isComplete = Boolean(step.completed);

            return (
              <div
                key={step.id ?? i}
                onClick={
                  () => onClickStep(i)
                }
                className={`step-item ${isActive ? 'active' : ''} ${isComplete ? 'complete' : ''}`}
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
