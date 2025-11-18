import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MultiStepper } from '../src/MultiStepper'
import { MultiStepperProvider } from '../src/contexts'
import { useMultiStepper } from '../src/hooks'
import "../src/index.css"

export function ReactMultiStepper() {

  const { handleNextStep, setStepStatus } = useMultiStepper()

  const validateStepContent = () => {
    setStepStatus("completed")
    handleNextStep()
  }
  return <MultiStepper onClickNext={validateStepContent} />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MultiStepperProvider steppers={[
      {
        id: 1,
        title: "Step one",
        description: "Step one description",
        children: <div className='test-step' style={{
          backgroundColor: "#0000FF90",
        }}>
          <h3>Step One Content</h3>
        </div>
      },
      {
        id: 2,
        title: "Step Two",
        description: "Step Two description",
        children: <div className='test-step' style={{
          backgroundColor: "#FF000090",
        }}>
          <h3>Step Two Content</h3>
        </div>
      },
      {
        id: 3,
        title: "Step Three",
        description: "Step Three description",
        children: <div className='test-step' style={{
          backgroundColor: "#80008090",
        }}>
          <h3>Step Three Content</h3>
        </div>
      }
    ]}
    >
      <ReactMultiStepper />
    </MultiStepperProvider>
  </StrictMode>,
)
