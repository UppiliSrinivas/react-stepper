import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/index.css'
import { MultiStepper } from '../src/MultiStepper'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MultiStepper onClickNext={()=> console.log("On Click Next")} steps={[
      {
        id:1,
        title:"Step one",
        description:"Step one description",
        children:<div style={{
          width:"100%",
          height:"30vh",
          background:"blue",
          display:"flex",
          justifyContent:"center",
          alignItems:"center"
        }} >
          <h3 style={{ color:"white" }}>Step One Content</h3>
        </div>
      },
      {
        id:2,
        title:"Step Two",
        description:"Step Two description",
        children:<div style={{
          width:"100%",
          height:"30vh",
          background:"red",
          display:"flex",
          justifyContent:"center",
          alignItems:"center"
        }} >
          <h3 style={{ color:"white" }}>Step Two Content</h3>
        </div>
      },
      {
        id:3,
        title:"Step Three",
        description:"Step Three description",
        children:<div style={{
          width:"100%",
          height:"30vh",
          background:"orange",
          display:"flex",
          justifyContent:"center",
          alignItems:"center"
        }} >
          <h3 style={{ color:"white" }}>Step Three Content</h3>
        </div>
      }
    ]} />
  </StrictMode>,
)
