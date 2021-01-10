import React, { Component } from "react";
import styles from "./sorting.module.css";
import * as utils from "./utils/sortingUtils";
import { connect } from "react-redux";
import { generateRandomArray } from "../../redux/action";
import * as arraySort from "./utils/sortingAnimations";

class ArrayOfBars extends Component {
  constructor(props) {
	super(props);

	this.state = {
	  array: [],
	  arrMax: 1,
	  arrSize: 1,
	};
  }

  // when the app loads for the first time
  componentDidMount() {
	this.resetArray();
  }

  // when the componenet is updated from a Redux action which ultimately changes the state of this component
  componentDidUpdate() {
	if (this.props.resetArr === true) {
	  this.resetArray();
	  this.props.generateRandomArray(); // toggle resetArr variable: stops any further resets and prevents an infinite loop
	}
  }

  // reset the array and all its elements
  resetArray() {
	console.log("resetting array");
	let { array, arrMax, arrSize } = this.state;
	array = [];
	// a max of 300 elements is suported for a screen width of 1200px
	const maxArrSize = 300; //15; //300;
	arrSize = utils.getRandomIntInclusive(10, maxArrSize);
	for (let i = 0; i < arrSize; i++) {
	  // start from 1 to avoid problems of division by zero
	  array[i] = utils.getRandomIntInclusive(1, 1000);
	}
	arrMax = Math.max(...array);
	this.setState({ array, arrMax, arrSize });
  }

  // display array bars inline, with height proportional to element value
  arrList = () => {
	// Don't update this component's state here. Do it in componentDidUpdate() instead
	const { array, arrMax, arrSize } = this.state;
	return array.map((val, index) => (
	  <div
		className={styles.singleBar}
		key={index}
		style={{
		  height: `${(val * 100) / arrMax}%`,
		  width: `${50 / arrSize}rem`,
		  margin: `0 ${10 / arrSize}rem`,
		}}
	  >
		{/* {val} */}
	  </div>
	));
  };

  render() {
	return (
	  <React.Fragment>
		<div>
		  <button onClick={() => arraySort.selectionSortAnimation(this.state)}>Sel Sort</button>
		</div>
		<div className={styles.arrayContainer}>{this.arrList()}</div>
	  </React.Fragment>
	);
  }
}

// to access the store
const mapStateToProps = (state) => {
  console.log(state.controls.resetArr);
  // const { resetArr } = state;
  if (state.controls.resetArr) {
	console.log("Action dispatched successfully");
  }

  // return state;
  return {
	resetArr: state.controls.resetArr,
  };
};


// higher level component
export default connect(mapStateToProps, { generateRandomArray })(ArrayOfBars);
