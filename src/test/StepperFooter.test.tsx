import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StepperFooter } from '../components/StepperFooter';
import { MultiStepperProvider } from '../contexts';

const steps = [
  { id: 1, title: 'Step 1', children: <div /> },
  { id: 2, title: 'Step 2', children: <div /> },
];

describe('StepperFooter', () => {
    it('increments step when next is clicked', () => {
        render(
            <MultiStepperProvider steppers={steps}>
                <StepperFooter onClickNext={() => { }} />
            </MultiStepperProvider>
        );

        const next = screen.getByText('Next');
        fireEvent.click(next);
        expect(screen.getByText('Finish')).toBeInTheDocument();
    });
});
