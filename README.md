# React Multi Stepper

A lightweight, customizable, and reusable multi-stepper component for React.  
It allows you to create step-based workflows such as onboarding, multi-step forms, or guided processes with ease.

## 🎬 Demo

![React Multi Stepper Demo](https://github.com/UppiliSrinivas/react-stepper/blob/main/src/assets/react-multi-stepper-demo.gif)

---

## 🚀 Features

- ✅ Easy to use and integrate into any React project  
- 🎨 Fully customizable step styles (active, completed)  
- ⚡ Built with **TypeScript** for type safety  
- 🧩 Context-based state management with hooks  
- 🧪 Tested with **Vitest** + **React Testing Library**  

---

## 📦 Installation

```bash
npm install react-multi-stepper
# or
yarn add react-multi-stepper
```

---

## 🔨 Basic Usage

### 1. Wrap your app with MultiStepperProvider

```javascript
import React from "react";
import { MultiStepperProvider, MultiStepper, useMultiStepper } from "react-multi-stepper";



function App() {
  return (
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
  );
}
```

### 2. Create your stepper component

```javascript
function ReactMultiStepper() {

  const { handleNextStep, setStepStatus } = useMultiStepper()

  const validateStepContent = () => {
    setStepStatus("completed")
    handleNextStep()
  }
  return <MultiStepper onClickNext={validateStepContent} />
}
```

## 🧩 API Reference

### MultiStepperProvider Props

| Prop | Type | Required | Description |
| ------------- | ------------ | -------- | -------------------------------------------------------------- |
| `steppers` | `StepperType[]` | ✅ | Array of step configurations |
| `children` | `ReactNode` | ✅ | Child components that will have access to stepper context |
| `options`   | `OptionsType`     | (Optional) Custom icons for step statuses   |

### StepperType Interface

| Property | Type | Required | Description |
| ------------- | ------------ | -------- | -------------------------------------------------------------- |
| `id` | `number` | ✅ | Unique identifier for the step |
| `title` | `string` | ✅ | Step title displayed in the stepper |
| `description` | `string` | ✅ | Step description or subtitle |
| `children` | `ReactNode` | ✅ | Content to render for this step |


### OptionsType

| Property       | Type       | Required | Description                                 |
| -------------- | ---------- | -------- | ------------------------------------------- |
| `completedIcon`| ReactNode  | No       | Icon to display for completed steps         |
| `activeIcon`   | ReactNode  | No       | Icon to display for the active step         |


### MultiStepper Props

| Prop | Type | Required | Description |
| ------------- | ------------ | -------- | -------------------------------------------------------------- |
| `onClickNext` | `() => void` | ✅ | Callback triggered when the "Next" button is clicked |

### useMultiStepper Hook

| Method/Property | Type | Description |
| ------------- | ------------ | -------------------------------------------------------------- |
| `handleNextStep` | `() => void` | Move to the next step |
| `setStepStatus` | `(status: StepStatus) => void` | Update current step status |
| `currentStep` | `number` | Current active step number |
| `totalSteps` | `number` | Total number of steps |

### Step Status Types

| Status | Description |
| ------------- | -------------------------------------------------------------- |
| `"active"` | Step is currently active and ready for user interaction |
| `"completed"` | Step has been successfully completed |

---