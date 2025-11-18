import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MultiStepperProvider } from '../src/contexts'
import { useMultiStepper } from '../src/hooks'
import { StepperHeader } from '../src/components/StepperHeader'

function TestControls() {
	const { updateSteps, handleNextStep } = useMultiStepper()
	return (
		<div>
			<button onClick={() => updateSteps(1)}>go-1</button>
			<button onClick={() => updateSteps(2)}>go-2</button>
			<button onClick={handleNextStep}>next</button>
		</div>
	)
}

describe('StepperHeader', () => {
	it('renders titles and shows active/completed classes on navigation', () => {
		const steppers = [
			{ id: 1, title: 'One', description: 'first', children: <div>one</div> },
			{ id: 2, title: 'Two', description: 'second', children: <div>two</div> },
			{ id: 3, title: 'Three', description: 'third', children: <div>three</div> },
		]

		const { container } = render(
			<MultiStepperProvider steppers={steppers}>
				<StepperHeader />
				<TestControls />
			</MultiStepperProvider>
		)

		// initial render: first step active, others not
		const items = container.querySelectorAll('.step-item')
		expect(items.length).toBe(3)
		expect(items[0].classList.contains('active')).toBe(true)
		expect(items[1].classList.contains('active')).toBe(false)
		expect(items[2].classList.contains('active')).toBe(false)

		// navigate to step index 1 (go-1) -> indices <1 completed, index1 active
		fireEvent.click(screen.getByText('go-1'))
		const itemsAfter1 = container.querySelectorAll('.step-item')
		expect(itemsAfter1[0].classList.contains('complete')).toBe(true)
		expect(itemsAfter1[1].classList.contains('active')).toBe(true)

		// navigate to step index 2 (go-2) -> indices 0,1 completed; index2 active
		fireEvent.click(screen.getByText('go-2'))
		const itemsAfter2 = container.querySelectorAll('.step-item')
		expect(itemsAfter2[0].classList.contains('complete')).toBe(true)
		expect(itemsAfter2[1].classList.contains('complete')).toBe(true)
		expect(itemsAfter2[2].classList.contains('active')).toBe(true)
	})
})

