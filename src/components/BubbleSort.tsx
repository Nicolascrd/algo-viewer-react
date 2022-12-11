import React, { ReactPropTypes, useEffect, useState } from "react";
import { IArrayElement } from "../tools/interfaces";
import { parseRawStringArray } from "../tools/parser";
import ArrayVisualizer from "./ArrayVisualizer";
import "./css/BubbleSort.css";

const testArray = "[9, 7, 3, 2, -2, -9]";
const parsedArray = JSON.parse(testArray) as Array<number>;

function BubbleSortHook() {
  const [indexInsertSort, setIndexInsertSort] = useState(0);
  const [bubbleNumber, setBubbleNumber] = useState(0);
  const [arrayRawInput, setArrayRawInput] = useState("");
  const [array, setArray] = useState(parsedArray as Array<number>);
  const [bubbleNeeded, setBubbleNeeded] = useState(parsedArray.length - 1);
  const [reachedEnd, setReachedEnd] = useState(false);

  useEffect(() => {
    if (reachedEnd != (bubbleNeeded == bubbleNumber)) {
      setReachedEnd(bubbleNeeded == bubbleNumber);
    }
  });

  function next() {
    // button trigger
    if (reachedEnd) {
      return;
    }
    let newArray = array.slice();
    if (array[indexInsertSort] > array[indexInsertSort + 1]) {
      newArray[indexInsertSort] = array[indexInsertSort + 1];
      newArray[indexInsertSort + 1] = array[indexInsertSort];
    }
    if (indexInsertSort + 1 >= array.length - 1 - bubbleNumber) {
      setIndexInsertSort(0);
      setBubbleNumber((bubbleNumber) => bubbleNumber + 1);
    } else {
      setIndexInsertSort((indexInsertSort) => indexInsertSort + 1);
    }
    setArray(newArray);
  }

  function end() {
    // button trigger
    if (reachedEnd) {
      return;
    }
    let newArray = array.slice();
    newArray.sort((a, b) => a - b);
    setArray(newArray);
    setIndexInsertSort(0);
    setBubbleNumber(bubbleNeeded);
  }

  function reset() {
    // button trigger
    setArray(parsedArray);
    setBubbleNeeded(parsedArray.length - 1);
    setBubbleNumber(0);
    setIndexInsertSort(0);
  }

  function submit() {
    // button trigger
    let arr = parseRawStringArray(arrayRawInput);
    setArray(arr);
    setBubbleNeeded(arr.length - 1);
    setIndexInsertSort(0);
    setBubbleNumber(0);
  }
  let comment = "Bubble Number: " + bubbleNumber + " / " + bubbleNeeded;

  // arrow position
  let arrowPosition = [] as Array<number>;
  if (array[indexInsertSort] > array[indexInsertSort + 1]) {
    arrowPosition = [indexInsertSort, indexInsertSort + 1];
  } else {
    arrowPosition = [];
  }

  // highlighted array (array with some more information)
  let hArray = [] as Array<IArrayElement>;
  for (let i = 0; i < array.length; i++) {
    hArray.push({
      value: array[i],
      highlighted:
        bubbleNumber < bubbleNeeded &&
        (i === indexInsertSort || i === indexInsertSort + 1),
    });
  }
  return (
    <React.Fragment>
      <div className="buttons">
        <button onClick={next} id="next" className="bottom-button">
          Next
        </button>
        <button onClick={end} id="end" className="bottom-button">
          End
        </button>
        <button onClick={reset} id="reset" className="bottom-button">
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
          onChange={(e) => {
            setArrayRawInput(e.currentTarget.value);
          }}
          value={arrayRawInput}
        />

        <button
          type="submit"
          className="submit-button"
          onClick={submit}
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
          highlightedSquares={[indexInsertSort, indexInsertSort + 1]}
          comments={[comment]}
        />
      </div>
    </React.Fragment>
  );
}

export default BubbleSortHook;
