# React Multi Stepper

A lightweight, customizable, and reusable multi-stepper component for React.  
It allows you to create step-based workflows such as onboarding, multi-step forms, or guided processes with ease.

## 🎬 Demo

![Image](https://github.com/user-attachments/assets/b80b151d-7b6f-4233-aa90-7672279d8049)

---

## 🚀 Features

- ✅ Easy to use and integrate into any React project
- 🎨 Fully customizable step styles (active, completed)
- ⚡ Built with **TypeScript** for type safety
- 🧩 Context-based state management with hooks
- 🧪 Tested with **Vitest** + **React Testing Library** (83% coverage)

---

## 📦 Installation

```bash
npm install reactjs-multi-stepper
# or
yarn add reactjs-multi-stepper
```

---

## 🔨 Basic Usage

```javascript
import {
  MultiStepper,
  MultiStepperProvider,
  useMultiStepper,
} from 'reactjs-multi-stepper'

function App() {
  // Define reusable base style
  const baseContentStyle = {
    width: '60%',
    height: '10vh',
    marginBlock: '5vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '0.5vw',
  }

  const Component = () => {
    const { handleNextStep } = useMultiStepper()
    return <MultiStepper onClickNext={handleNextStep} />
  }

  return (
    <MultiStepperProvider
      steppers={[
        {
          active: true,
          title: 'Step One',
          children: (
            <div
              style={{
                ...baseContentStyle,
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
              }}
            >
              Step One Content
            </div>
          ),
        },
        {
          id: 2,
          active: false,
          title: 'Step Two',
          children: (
            <div
              style={{
                ...baseContentStyle,
                backgroundColor: 'rgba(0, 0, 255, 0.5)',
              }}
            >
              Step Two Content
            </div>
          ),
        },
        {
          id: 3,
          active: false,
          title: 'Step Three',
          children: (
            <div
              style={{
                ...baseContentStyle,
                backgroundColor: 'rgba(0, 128, 0, 0.5)',
              }}
            >
              Step Three Content
            </div>
          ),
        },
      ]}
    >
      <Component />
    </MultiStepperProvider>
  )
}

export default App
```

## 🧩 API Reference

### MultiStepperProvider Props

| Prop       | Type            | Required                                  | Description                                               |
| ---------- | --------------- | ----------------------------------------- | --------------------------------------------------------- |
| `steppers` | `StepperType[]` | ✅                                        | Array of step configurations                              |
| `children` | `ReactNode`     | ✅                                        | Child components that will have access to stepper context |
| `options`  | `OptionsType`   | (Optional) Custom icons for step statuses |

### StepperType Interface

| Property      | Type        | Required | Description                         |
| ------------- | ----------- | -------- | ----------------------------------- |
| `id`          | `number`    | ✅       | Unique identifier for the step      |
| `title`       | `string`    | ✅       | Step title displayed in the stepper |
| `description` | `string`    | ✅       | Step description or subtitle        |
| `children`    | `ReactNode` | ✅       | Content to render for this step     |

### OptionsType

| Property        | Type      | Required | Description                         |
| --------------- | --------- | -------- | ----------------------------------- |
| `completedIcon` | ReactNode | No       | Icon to display for completed steps |
| `activeIcon`    | ReactNode | No       | Icon to display for the active step |

### MultiStepper Props

| Prop          | Type         | Required | Description                                          |
| ------------- | ------------ | -------- | ---------------------------------------------------- |
| `onClickNext` | `() => void` | ✅       | Callback triggered when the "Next" button is clicked |

### useMultiStepper Hook

| Method/Property  | Type                           | Description                |
| ---------------- | ------------------------------ | -------------------------- |
| `handleNextStep` | `() => void`                   | Move to the next step      |
| `setStepStatus`  | `(status: StepStatus) => void` | Update current step status |
| `currentStep`    | `number`                       | Current active step number |
| `totalSteps`     | `number`                       | Total number of steps      |

### Step Status Types

| Status        | Description                                             |
| ------------- | ------------------------------------------------------- |
| `"active"`    | Step is currently active and ready for user interaction |
| `"completed"` | Step has been successfully completed                    |

---
