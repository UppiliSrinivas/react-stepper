# React Multi Stepper

A lightweight, customizable, and reusable multi-stepper component for React.  
It allows you to create step-based workflows such as onboarding, multi-step forms, or guided processes with ease.

## 🎬 Demo

![React Multi Stepper Demo](https://github.com/UppiliSrinivas/react-stepper/blob/multi-stepper/src/assets/react-multi-stepper-demo.gif)

---

## 🚀 Features

- ✅ Easy to use and integrate into any React project  
- 🎨 Fully customizable step styles (active, completed, loading, error)  
- ⚡ Built with **TypeScript** for type safety  
- 🧩 Context-based state management with hooks  
- 🔄 Built-in step validation and status management  
- 🎯 Support for async operations with loading states  
- ❌ Error handling for failed step validations  
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
        title: "Personal Info",
        description: "Enter your personal details",
        children: <PersonalInfoForm />
      },
      {
        id: 2,
        title: "Address",
        description: "Enter your address details",
        children: <AddressForm />
      },
      {
        id: 3,
        title: "Review",
        description: "Review and confirm",
        children: <ReviewStep />
      }
    ]}>
      <MyMultiStepper />
    </MultiStepperProvider>
  );
}
```

### 2. Create your stepper component

```javascript
function MyMultiStepper() {
  const { handleNextStep, setStepStatus } = useMultiStepper();

  const validateAndProceed = async () => {
    // Set loading state
    setStepStatus("loading");

    try {
      // Simulate async validation
      await validateCurrentStep();
      
      // Mark as completed and move to next
      setStepStatus("completed");
      handleNextStep();
    } catch (error) {
      // Show error state
      setStepStatus("error");
    }
  };

  return <MultiStepper onClickNext={validateAndProceed} />;
}
```

---

## 🔧 Advanced Usage

### Step Validation with Custom Logic

```javascript
function ReactMultiStepper() {
  const { handleNextStep, setStepStatus, currentStep } = useMultiStepper();

  const validateStepContent = async () => {
    setStepStatus("loading");

    try {
      // Custom validation based on current step
      switch (currentStep) {
        case 1:
          await validatePersonalInfo();
          break;
        case 2:
          await validateAddress();
          break;
        case 3:
          await submitForm();
          break;
      }

      setStepStatus("completed");
      handleNextStep();
    } catch (error) {
      setStepStatus("error");
      console.error("Step validation failed:", error);
    }
  };

  return <MultiStepper onClickNext={validateStepContent} />;
}
```

### Custom Step Content

```javascript
const steppers = [
  {
    id: 1,
    title: "Step One",
    description: "Step one description",
    children: (
      <div className="custom-step">
        <h3>Custom Step Content</h3>
        <form>
          <input type="text" placeholder="Enter data..." />
        </form>
      </div>
    )
  },
  // ... more steps
];
```

---

## 🧩 API Reference

### MultiStepperProvider Props

| Prop | Type | Required | Description |
| ------------- | ------------ | -------- | -------------------------------------------------------------- |
| `steppers` | `StepperType[]` | ✅ | Array of step configurations |
| `children` | `ReactNode` | ✅ | Child components that will have access to stepper context |

### StepperType Interface

| Property | Type | Required | Description |
| ------------- | ------------ | -------- | -------------------------------------------------------------- |
| `id` | `number` | ✅ | Unique identifier for the step |
| `title` | `string` | ✅ | Step title displayed in the stepper |
| `description` | `string` | ✅ | Step description or subtitle |
| `children` | `ReactNode` | ✅ | Content to render for this step |

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
| `"loading"` | Step is processing/validating (shows loading indicator) |
| `"completed"` | Step has been successfully completed |
| `"error"` | Step has validation errors or failed processing |

---