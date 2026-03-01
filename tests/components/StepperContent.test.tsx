import { render, screen } from "@testing-library/react";
import { StepperContent } from "../../src/components/StepperContent";
import { useMultiStepper } from "../../src/hooks";
import type { StepType } from "../../src/types";

vi.mock("../../src/hooks", () => ({
  useMultiStepper: vi.fn(),
}));

const mockedUseMultiStepper = vi.mocked(useMultiStepper);

function mockContext(steps: StepType[], currentStep: number) {
  mockedUseMultiStepper.mockReturnValue({
    currentStep,
    steps,
    handleNextStep: vi.fn(),
    handlePrevStep: vi.fn(),
    updateSteps: vi.fn(),
    setStepStatus: vi.fn(),
    options: {},
  });
}

describe("StepperContent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders null when steps are empty", () => {
    mockContext([], 0);
    const { container } = render(<StepperContent />);

    expect(container).toBeEmptyDOMElement();
  });

  it("renders null when current step is out of range", () => {
    mockContext(
      [
        { id: 1, title: "Step 1", children: <div>Step 1 Content</div> },
        { id: 2, title: "Step 2", children: <div>Step 2 Content</div> },
      ],
      5
    );

    const { container } = render(<StepperContent />);

    expect(container).toBeEmptyDOMElement();
  });

  it("renders null when current step exists but has no children", () => {
    mockContext(
      [
        { id: 1, title: "Step 1", children: <div>Step 1 Content</div> },
        { id: 2, title: "Step 2" },
      ],
      1
    );

    const { container } = render(<StepperContent />);

    expect(container).toBeEmptyDOMElement();
  });

  it("renders current step children inside stepper-content container", () => {
    mockContext(
      [
        { id: 1, title: "Step 1", children: <div>Step 1 Content</div> },
        {
          id: 2,
          title: "Step 2",
          children: (
            <section>
              <h2>Step 2 Title</h2>
              <p>Step 2 Content</p>
            </section>
          ),
        },
      ],
      1
    );

    const { container } = render(<StepperContent />);

    const wrapper = container.querySelector(".stepper-content");
    expect(wrapper).toBeInTheDocument();
    expect(screen.getByText("Step 2 Title")).toBeInTheDocument();
    expect(screen.getByText("Step 2 Content")).toBeInTheDocument();
    expect(screen.queryByText("Step 1 Content")).not.toBeInTheDocument();
  });
});
