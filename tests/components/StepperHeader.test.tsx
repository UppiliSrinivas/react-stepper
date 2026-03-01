import { fireEvent, render, screen } from "@testing-library/react";
import { StepperHeader } from "../../src/components/StepperHeader";
import { useMultiStepper } from "../../src/hooks";
import type { StepType } from "../../src/types";

vi.mock("../../src/hooks", () => ({
  useMultiStepper: vi.fn(),
}));

const mockedUseMultiStepper = vi.mocked(useMultiStepper);

function mockContext(steps: StepType[], updateSteps = vi.fn()) {
  mockedUseMultiStepper.mockReturnValue({
    currentStep: 0,
    steps,
    handleNextStep: vi.fn(),
    handlePrevStep: vi.fn(),
    updateSteps,
    setStepStatus: vi.fn(),
    options: {
      activeIcon: <span data-testid="active-icon">A</span>,
      completedIcon: <span data-testid="completed-icon">C</span>,
    },
  });

  return updateSteps;
}

describe("StepperHeader", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders nothing when steps are empty", () => {
    mockContext([]);
    const { container } = render(<StepperHeader />);

    expect(container).toBeEmptyDOMElement();
  });

  it("renders all steps with title and optional description", () => {
    mockContext([
      { id: 1, title: "Account", description: "Create account", active: true },
      { id: 2, title: "Profile", completed: true },
      { id: 3, title: "Review" },
    ]);

    render(<StepperHeader />);

    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByText("Create account")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Review")).toBeInTheDocument();
  });

  it("applies active and complete classes from step state", () => {
    mockContext([
      { id: 1, title: "Account", active: true },
      { id: 2, title: "Profile", completed: true },
      { id: 3, title: "Review" },
    ]);

    const { container } = render(<StepperHeader />);
    const items = Array.from(container.querySelectorAll(".step-item"));

    expect(items).toHaveLength(3);
    expect(items[0]).toHaveClass("active");
    expect(items[0]).not.toHaveClass("complete");

    expect(items[1]).toHaveClass("complete");
    expect(items[1]).not.toHaveClass("active");

    expect(items[2]).not.toHaveClass("active");
    expect(items[2]).not.toHaveClass("complete");
  });

  it("calls updateSteps with clicked step index", () => {
    const updateSteps = mockContext([
      { id: 1, title: "Account", active: true },
      { id: 2, title: "Profile" },
      { id: 3, title: "Review" },
    ]);

    const { container } = render(<StepperHeader />);
    const items = Array.from(container.querySelectorAll(".step-item"));

    fireEvent.click(items[0]);
    fireEvent.click(items[1]);
    fireEvent.click(items[2]);

    expect(updateSteps).toHaveBeenCalledTimes(3);
    expect(updateSteps).toHaveBeenNthCalledWith(1, 0);
    expect(updateSteps).toHaveBeenNthCalledWith(2, 1);
    expect(updateSteps).toHaveBeenNthCalledWith(3, 2);
  });
});
