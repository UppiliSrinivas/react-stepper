import { renderHook, act, render } from '@testing-library/react';
import { useMultiStepper } from '../hooks';
import { MultiStepperProvider } from '../contexts';
import React from 'react';
import { describe, it, expect } from 'vitest';

// Dummy component that calls the hook
const Dummy = () => {
  useMultiStepper()
  return <div>Test</div>
}

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MultiStepperProvider
    steppers={[
      { id: 1, title: 'A', children: <></> },
      { id: 2, title: 'B', children: <></> },
    ]}
  >
    {children}
  </MultiStepperProvider>
);

describe('useMultiStepper hook', () => {
  it('should move to next step', () => {
    const { result } = renderHook(() => useMultiStepper(), { wrapper });
    act(() => result.current.handleNextStep());
    expect(result.current.currentStep).toBe(1);
    act(() => result.current.handleNextStep());
    act(() => result.current.handlePrevStep());
  });

  it('throws error when used outside provider', () => {
    expect(() => render(<Dummy />)).toThrowError(
      "useMultiStepperForm must be used within a MultiStepperProvider"
    )
  });
});
