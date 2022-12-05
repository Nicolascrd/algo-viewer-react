import React, { ReactPropTypes } from "react";
import { IArrayElement } from "../tools/interfaces";
import { parseRawStringArray } from "../tools/parser";
import ArrayVisualizer from "./ArrayVisualizer";
import "./css/BubbleSort.css";

const testArray = "[9, 7, 3, 2, -2, -9]";

interface IBubbleSortProps {}
interface IBubbleSortState {
  indexInsertSort: number;
  bubbleNumber: number;
  bubbleNeeded: number;
  arrayRawInput: string;
  array: Array<number>;
  reachedEnd: Boolean;
  arrowPosition: Array<number>;
  highlightedArray: Array<IArrayElement>;
}

class BubbleSort extends React.Component<IBubbleSortProps, IBubbleSortState> {
  constructor(props: ReactPropTypes) {
    super(props);
    this.state = {
      indexInsertSort: 0,
      bubbleNumber: 0,
      bubbleNeeded: 0,
      arrayRawInput: "",
      array: [],
      reachedEnd: false,
      arrowPosition: [],
      highlightedArray: [],
    };
    this.end = this.end.bind(this);
    this.next = this.next.bind(this);
    this.submit = this.submit.bind(this);
    this.reset = this.reset.bind(this);
    this.changeArrayInput = this.changeArrayInput.bind(this);
  }
  componentDidMount(): void {
    let arr = JSON.parse(testArray);
    this.setState({
      array: arr,
      bubbleNeeded: arr.length - 1,
    });
  }
  componentDidUpdate(
    prevProps: Readonly<IBubbleSortProps>,
    prevState: Readonly<IBubbleSortState>,
    snapshot?: any
  ): void {
    if (
      prevState.reachedEnd !=
      (this.state.bubbleNeeded === this.state.bubbleNumber)
    ) {
      this.setState({
        reachedEnd: this.state.bubbleNeeded === this.state.bubbleNumber,
      });
    }
  }
  next() {
    if (this.state.bubbleNeeded === this.state.bubbleNumber) {
      return;
    }
    let newArray = this.state.array.slice();
    if (
      this.state.array[this.state.indexInsertSort] >
      this.state.array[this.state.indexInsertSort + 1]
    ) {
      newArray[this.state.indexInsertSort] =
        this.state.array[this.state.indexInsertSort + 1];
      newArray[this.state.indexInsertSort + 1] =
        this.state.array[this.state.indexInsertSort];
    }
    this.setState(function (state) {
      if (
        state.indexInsertSort + 1 >=
        state.array.length - 1 - state.bubbleNumber
      ) {
        return {
          indexInsertSort: 0,
          bubbleNumber: state.bubbleNumber + 1,
          array: newArray,
        };
      }
      return {
        indexInsertSort: state.indexInsertSort + 1,
        bubbleNumber: state.bubbleNumber,
        array: newArray,
      };
    });
  }
  end() {
    while (this.state.bubbleNumber < this.state.bubbleNeeded) {
      this.next();
    }
  }
  reset() {
    let arr = JSON.parse(testArray);
    this.setState({
      array: JSON.parse(testArray),
      bubbleNeeded: arr.length - 1,
      bubbleNumber: 0,
      indexInsertSort: 0,
    });
  }
  submit() {
    let arr = parseRawStringArray(this.state.arrayRawInput);
    this.setState({
      bubbleNeeded: arr.length - 1,
      indexInsertSort: 0,
      bubbleNumber: 0,
    });
  }
  changeArrayInput(e: React.FormEvent<HTMLInputElement>) {
    this.setState({
      arrayRawInput: e.currentTarget.value,
    });
  }
  render(): React.ReactNode {
    let comment =
      "Bubble Number: " +
      this.state.bubbleNumber +
      " / " +
      this.state.bubbleNeeded;

    // arrow position
    let arrowPosition = [] as Array<number>;
    if (
      this.state.array[this.state.indexInsertSort] >
      this.state.array[this.state.indexInsertSort + 1]
    ) {
      arrowPosition = [
        this.state.indexInsertSort,
        this.state.indexInsertSort + 1,
      ];
    } else {
      arrowPosition = [];
    }

    // highlighted array (array with some more information)
    let hArray = [] as Array<IArrayElement>;
    for (let i = 0; i < this.state.array.length; i++) {
      hArray.push({
        value: this.state.array[i],
        highlighted:
          this.state.bubbleNumber < this.state.bubbleNeeded &&
          (i === this.state.indexInsertSort ||
            i === this.state.indexInsertSort + 1),
      });
    }

    return (
      <div>
        <div className="buttons">
          <button onClick={this.next} id="next" className="bottom-button">
            Next
          </button>
          <button onClick={this.end} id="end" className="bottom-button">
            End
          </button>
          <button onClick={this.reset} id="reset" className="bottom-button">
            Reset
          </button>
        </div>
        <div className="input-arr">
          <span className="input-title">Input Array :</span>

          <input
            type="text"
            className="input-array"
            placeholder="9, 7, 3, 2, -2, -9"
            required
            onChange={this.changeArrayInput}
            value={this.state.arrayRawInput}
          />

          <button
            type="submit"
            className="submit-button"
            onClick={this.submit}
            id="submit-button"
          >
            Submit
          </button>
        </div>
        <div className="array-vi">
          <ArrayVisualizer
            name="Bubble Sort"
            arr={hArray}
            arrowPositions={arrowPosition.length == 0 ? [] : [arrowPosition]}
            highlightedSquares={[
              this.state.indexInsertSort,
              this.state.indexInsertSort + 1,
            ]}
            comments={[comment]}
          />
        </div>
      </div>
    );
  }
}

export default BubbleSort;
