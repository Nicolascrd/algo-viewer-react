import React from "react";
import { IArrow } from "../tools/interfaces";

import "./css/ArrowsArray.css";

interface IArrowsArrayProps {
  arrows: Array<IArrow>;
}

function ArrowsArray(props: IArrowsArrayProps) {
  function points(arr: IArrow) {
    let x1 = arr.start;
    let x2 = arr.end + 5;
    let y1 = 5;
    let y2 = 5 + arr.height;

    return `${x1},${y1} ${x1},${y2} ${x2},${y2} ${x2},${y1 + 2}`; // + 2 is space for the arrow
  }
  let svgHeight = 15 + Math.max(...props.arrows.map((value) => value.height));
  if (props.arrows.length == 0) {
    svgHeight = 15;
  }

  let arrowsJSX = props.arrows.map((arrow) => (
    <g key={arrow.height}>
      <g
        strokeWidth="3"
        stroke="hsl(230, 55%, 40%)"
        fill="none"
        strokeLinecap="square"
      >
        <polyline
          points={points(arrow)}
          markerEnd="url(#SvgjsMarker1158)"
        ></polyline>
      </g>
      <defs>
        <marker
          markerWidth="4"
          markerHeight="4"
          refX="2"
          refY="2"
          viewBox="0 0 4 4"
          orient="auto"
          id="SvgjsMarker1158"
        >
          <polygon
            points="0,4 1.3333333333333333,2 0,0 4,2"
            fill="hsl(230, 55%, 40%)"
          ></polygon>
        </marker>
      </defs>
    </g>
  ));
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox={"0 0 600 " + svgHeight}
    >
      {arrowsJSX}
    </svg>
  );
}

export default ArrowsArray;
