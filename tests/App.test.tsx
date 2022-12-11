import App from "../src/App";
import React from "react";
import { render } from "./test-utils";

describe("Simple working test", () => {
  it("The App renders", () => {
    render(<App />);
  });
});
