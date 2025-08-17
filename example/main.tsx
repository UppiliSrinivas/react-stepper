import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { MultiStepper } from 'reactjs-multi-stepper'
import { MultiStepper } from '../src/MultiStepper'
import "../src/index.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MultiStepper onClickNext={() => console.log("On Click Next")} steps={[
      {
        id: 1,
        title: "Step one",
        description: "Step one description",
        children: <div className='test-step' style={{
          background: "blue",
        }}>
          <h3>Step One Content</h3>
        </div>
      },
      {
        id: 2,
        title: "Step Two",
        description: "Step Two description",
        children: <div className='test-step' style={{
          background: "red",
        }}>
          <h3>Step Two Content</h3>
        </div>
      },
      {
        id: 3,
        title: "Step Three",
        description: "Step Three description",
        children: <div className='test-step' style={{
          background: "orange",
        }}>
          <h3>Step Three Content</h3>
        </div>
      }
    ]} />
  </StrictMode>,
)
