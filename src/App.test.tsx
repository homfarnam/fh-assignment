import React from "react"
import { render } from "@testing-library/react"
import App from "./App"

describe("App is not empty", () => {
  const { container } = render(<App />)

  it("renders without crashing", () => {
    expect(container).toBeTruthy()
  })
})
