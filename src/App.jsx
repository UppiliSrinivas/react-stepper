import { MultiStepper } from "./components/MultiStepper";
import { MultiStepperProvider, useMultiStepper } from "./contexts/index";

function App() {
  // Define reusable base style
  const baseContentStyle = {
    width: "60%",
    height: "10vh",
    marginBlock: "5vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "0.5vw",
  };

  const Component = () => {
    const { handleNextStep } = useMultiStepper();
    return <MultiStepper onClickNext={handleNextStep} />;
  };

  return (
    <MultiStepperProvider
      steppers={[
        {
          active: true,
          title: "Step One",
          children: (
            <div
              style={{
                ...baseContentStyle,
                backgroundColor: "rgba(255, 0, 0, 0.5)",
              }}
            >
              Step One Content
            </div>
          ),
        },
        {
          id: 2,
          active: false,
          title: "Step Two",
          children: (
            <div
              style={{
                ...baseContentStyle,
                backgroundColor: "rgba(0, 0, 255, 0.5)",
              }}
            >
              Step Two Content
            </div>
          ),
        },
        {
          id: 3,
          active: false,
          title: "Step Three",
          children: (
            <div
              style={{
                ...baseContentStyle,
                backgroundColor: "rgba(0, 128, 0, 0.5)",
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
  );
}

export default App;
