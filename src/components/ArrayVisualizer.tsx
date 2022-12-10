import React, { RefAttributes, useRef } from "react";
import ArrowsArray from "./ArrowsArray";
import { IArrayElement, IArrow } from "../tools/interfaces";
import "./css/ArrayVisualizer.css";
interface IArrayVisualizerProps {
  arr: Array<IArrayElement>;
  name: string;
  arrowPositions: Array<Array<number>>;
  highlightedSquares: Array<number>;
  comments: Array<string>;
}

interface IPosition {
  left: number;
  right: number;
  bottom: number;
}
interface IArrayVisualizerState {
  arrows: Array<IArrow>;
}
interface IArrayVisualizerRefs {}

const arrayElID = "array-el-";
const standardHeight = 15;

class ArrayVisualizer extends React.Component<
  IArrayVisualizerProps,
  IArrayVisualizerState
> {
  private refArrayCont: React.RefObject<HTMLInputElement>;

  constructor(props: IArrayVisualizerProps) {
    super(props);
    this.state = {
      arrows: [],
    };
    this.refArrayCont = React.createRef();
    this.updateArrowsPosition = this.updateArrowsPosition.bind(this);
    this.generateArrowPosition = this.generateArrowPosition.bind(this);
  }

  componentDidMount(): void {
    this.updateArrowsPosition();
  }
  componentDidUpdate(prevProps: IArrayVisualizerProps): void {
    const p = this.props;
    if (this.props != prevProps) {
      this.updateArrowsPosition();
    }
  }

  updateArrowsPosition() {
    if (!this.props.arrowPositions) {
      return;
    }
    if (this.refArrayCont.current == undefined) {
      return;
    }
    let leftShift = this.refArrayCont.current.getBoundingClientRect().left;
    if (leftShift == undefined) {
      return;
    }
    let bp = [] as Array<IPosition>;
    for (let i = 0; i < this.refArrayCont.current.children.length; i++) {
      let rect = this.refArrayCont.current.children[i].getBoundingClientRect();
      if (!rect) {
        return;
      }
      bp.push({
        left: rect.left - leftShift,
        right: rect.right - leftShift,
        bottom: rect.bottom,
      });
    }
    const res: Array<IArrow> = [];
    if (this.props.arrowPositions == undefined) {
      return;
    }
    this.props.arrowPositions.forEach((element, index) => {
      if (element.length != 2) {
        console.error(
          `Arrow position array should be of length 2 but has length ${element.length} at position ${index}`
        );
        return;
      }
      let arrPos = this.generateArrowPosition(
        standardHeight * (index + 1),
        element,
        bp
      ); // index + 1 because we want height > 0 for all arrows
      if (arrPos.height) {
        res.push(arrPos);
      }
    });
    this.setState({
      arrows: res,
    });
  }

  generateArrowPosition(
    height: number,
    arr: Array<number>,
    bp: Array<IPosition>
  ) {
    if (arr.length != 2) {
      console.error(
        "Array to generate arrow position should be of length 2 but has length " +
          arr.length
      );
    }
    let startRec = bp[arr[0]];
    if (!startRec) {
      console.log(
        "Cannot get position of square with id: " + arrayElID + String(arr[0]) // can happen as we need one mount to know position of the boxes and draw arrows
      );
      return {} as IArrow;
    }
    let start = (startRec.left + startRec.right) / 2;
    let endRec = bp[arr[1]];
    if (!endRec) {
      console.log(
        "Cannot get position of square with id: " + arrayElID + String(arr[1]) // can happen as we need one mount to know position of the boxes and draw arrows
      );
      return {} as IArrow;
    }

    let end = 0;
    if (arr[1] > arr[0]) {
      // from left to right
      end = endRec.right;
    } else {
      end = endRec.left;
    }
    return {
      start: start,
      end: end,
      height: height,
    } as IArrow;
  }

  render() {
    let arrayJSX = this.props.arr.map((el, ind) => {
      return (
        <div
          key={ind}
          id={arrayElID + String(ind)}
          className={
            "array-el " + (el.highlighted ? "highlighted-array-el" : "")
          }
        >
          <div className="indice">{ind}</div>
          <div className="internal-data">{el.value}</div>
        </div>
      );
    });
    let commentsJSX = this.props.comments.map((com) => (
      <div key={com}>{com}</div>
    ));

    return (
      <React.Fragment>
        <h2>{this.props.name ? this.props.name : "Array Visualizer"}</h2>
        <div>
          <div
            className="array-container"
            id="array-cont"
            ref={this.refArrayCont}
          >
            {arrayJSX}
          </div>
          <div className="svg-container" v-if="arrows.length">
            <ArrowsArray arrows={this.state.arrows} />
          </div>
          {this.props.comments && (
            <div className="comments-container">{commentsJSX}</div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default ArrayVisualizer;
