import { describe, it, expect } from "vitest"
import * as PackageExports from "../index"
import { render } from "@testing-library/react"

// Just a smoke test component render
describe("package entry point", () => {
  it("exports MultiStepper component", () => {
    expect(PackageExports.MultiStepper).toBeDefined()
  })

  it("allows rendering MultiStepper without crashing", () => {
    const { container } = render(<PackageExports.MultiStepper steps={[]} onClickNext={() => { }} />)
    expect(container).toBeTruthy()
  })

  it("does not throw when importing package", () => {
    expect(() => import("../index")).not.toThrow()
  })
})
