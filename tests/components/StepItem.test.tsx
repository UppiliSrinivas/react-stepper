import { render, screen } from "@testing-library/react";
import { Step } from "../../src/components/StepItem";
import { useMultiStepper } from "../../src/hooks";
import type { MultiStepperType, StepType } from "../../src/types";

vi.mock("../../src/hooks", () => ({
  useMultiStepper: vi.fn(),
}));

const mockedUseMultiStepper = vi.mocked(useMultiStepper);

function mockContext(overrides?: Partial<MultiStepperType>) {
  mockedUseMultiStepper.mockReturnValue({
    currentStep: 0,
    steps: [{ id: 1, title: "Step 1", active: true }],
    handleNextStep: vi.fn(),
    handlePrevStep: vi.fn(),
    updateSteps: vi.fn(),
    setStepStatus: vi.fn(),
    options: {},
    ...overrides,
  });
}

describe("Step", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders nothing when context steps are empty", () => {
    mockContext({ steps: [] });
    const { container } = render(<Step step={{ active: true }} index={1} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("renders completed state with step icon when provided", () => {
    const step: StepType = {
      completed: true,
      icon: <span data-testid="custom-complete">done-icon</span>,
    };

    mockContext();
    const { container } = render(<Step step={step} index={1} />);

    expect(container.querySelector(".step")).toHaveClass("step-complete");
    expect(screen.getByTestId("custom-complete")).toBeInTheDocument();
  });

  it("renders completed state with options.completedIcon when step icon is missing", () => {
    mockContext({
      options: { completedIcon: <span data-testid="completed-option">C</span> },
    });

    const { container } = render(<Step step={{ completed: true }} index={1} />);

    expect(container.querySelector(".step")).toHaveClass("step-complete");
    expect(screen.getByTestId("completed-option")).toBeInTheDocument();
  });

  it("renders completed state fallback checkmark when no icons are provided", () => {
    mockContext({ options: {} });
    const { container } = render(<Step step={{ completed: true }} index={1} />);

    expect(container.querySelector(".step")).toHaveClass("step-complete");
    expect(container.querySelector(".text-white")).toHaveTextContent("✓");
  });

  it("renders active state with step icon when provided", () => {
    mockContext();
    const { container } = render(
      <Step
        step={{
          active: true,
          icon: <span data-testid="custom-active">active-icon</span>,
        }}
        index={2}
      />
    );

    expect(container.querySelector(".step")).toHaveClass("step-active");
    expect(screen.getByTestId("custom-active")).toBeInTheDocument();
  });

  it("renders active state with options.activeIcon when step icon is missing", () => {
    mockContext({
      options: { activeIcon: <span data-testid="active-option">A</span> },
    });

    const { container } = render(<Step step={{ active: true }} index={2} />);

    expect(container.querySelector(".step")).toHaveClass("step-active");
    expect(screen.getByTestId("active-option")).toBeInTheDocument();
  });

  it("renders active state fallback index when no icons are provided", () => {
    mockContext({ options: {} });
    const { container } = render(<Step step={{ active: true }} index={3} />);

    expect(container.querySelector(".step")).toHaveClass("step-active");
    expect(container.querySelector("h2.text-white")).toHaveTextContent("3");
  });

  it("renders default state with provided icon", () => {
    mockContext();
    const { container } = render(
      <Step
        step={{ icon: <span data-testid="default-icon">default</span> }}
        index={4}
      />
    );

    expect(container.querySelector(".step")).toHaveClass("step-default");
    expect(screen.getByTestId("default-icon")).toBeInTheDocument();
  });

  it("renders default state fallback index when no icon is provided", () => {
    mockContext();
    const { container } = render(<Step step={{}} index={5} />);

    expect(container.querySelector(".step")).toHaveClass("step-default");
    expect(container.querySelector("h2")).toHaveTextContent("5");
  });
});
