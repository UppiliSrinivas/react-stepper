import { createContext, useContext } from "react";
import type { MultiStepperType } from "../types";

// Multi stepper context
export const MultiStepperContext = createContext<MultiStepperType | undefined>(
  undefined
);

// context consumer hook
export const useMultiStepper = () => {
  const context = useContext(MultiStepperContext);
  if (!context)
    throw new Error(
      "useMultiStepperForm must be used within a MultiStepperProvider"
    );
  return context;
};
