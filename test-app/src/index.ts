import "./index.css";

export { MultiStepper } from "./components/MultiStepper";
export { MultiStepperProvider } from "./contexts";
export { useMultiStepper } from "./hooks";

/* ✅ IMPORTANT: re-export ALL public types */
export type {
  StepType,
  MultiStepperType,
  MultiStepperProviderType,
  StepStyleType,
} from "./types";
