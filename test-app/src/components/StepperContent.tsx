import React from "react";
import { useMultiStepper } from "../hooks";

export const StepperContent: React.FC = () => {
  const { steps, currentStep } = useMultiStepper();

  const current = steps?.[currentStep];

  if (!current || !current.children) return null;

  return <div className="stepper-content">{current.children}</div>;
};
