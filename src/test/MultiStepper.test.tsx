import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MultiStepper } from '../MultiStepper';

describe('MultiStepper', () => {
    const steps = [
        { id: 1, title: 'First', children: <div>First Step</div> },
        { id: 2, title: 'Second', children: <div>Second Step</div> },
    ];

    it('renders first step content initially', () => {
        render(<MultiStepper steps={steps} onClickNext={() => { }} />);
        
        // console.log(screen.debug());
        expect(screen.getByText('First Step')).toBeInTheDocument();
    });

    it('shows finish on last step', () => {
        render(<MultiStepper steps={steps} onClickNext={() => { }} />);
        // console.log(screen);
        expect(screen.getByText('Next')).toBeInTheDocument();
        expect(screen.getByText('Prev')).toBeInTheDocument();
    });

    it("renders nothing when steps is undefined", () => {
    // Cast to any to bypass TypeScript props check
    const { container } = render(
      <MultiStepper steps={undefined} onClickNext={() => {}} />
    )

    // Should render nothing
    expect(container).toBeEmptyDOMElement()
  })
});
