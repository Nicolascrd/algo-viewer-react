import { render, screen, userEvent, waitFor } from "./test-utils";
import React from "react";
import BubbleSort from "../src/components/BubbleSort";
import { fireEvent } from "@testing-library/react";

describe("Testing bubble sort component", () => {
  it("end button sorts the array", async () => {
    const { container } = render(<BubbleSort />);
    const buttons = screen.getAllByRole("button");
    const squares = container.getElementsByClassName("array-el");
    for (let b of buttons) {
      if (b.innerHTML == "End") {
        userEvent.click(b);
      }
    }
    await waitFor(() => {
      expect(squares[0].childNodes[1].textContent).toBe("-9");
    });
    let prev = -99999;
    for (let i = 1; i < squares.length; i++) {
      let curr = squares[i].childNodes[1].textContent;
      expect(curr).not.toBeNull();
      if (curr == null) {
        return;
      }
      expect(parseInt(curr) >= prev).toBeTruthy();
      prev = parseInt(curr);
    }
  });
});

describe("Input new array works", () => {
  it("type new array and submit", async () => {
    const { container } = render(<BubbleSort />);
    const buttons = screen.getAllByRole("button");
    const squares = container.getElementsByClassName("array-el");
    const input = container.getElementsByClassName("input-array")[0]
    fireEvent.change(input, { target: { value: "1, 2, 3" } });
    for (let b of buttons) {
      if (b.innerHTML == "Submit") {
        console.log("click");
        userEvent.click(b);
      }
    }
    await waitFor(() => {
      expect(squares[0].childNodes[1].textContent).toBe("1");
      expect(squares[1].childNodes[1].textContent).toBe("2");
      expect(squares[2].childNodes[1].textContent).toBe("3");
    });
  });
});
