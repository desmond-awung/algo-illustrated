import React, { Component } from "react";
import styles from "./sorting.module.css";
import * as utils from "./utils/sortingUtils";
import { connect } from "react-redux";
import { generateRandomArray, sortArray } from "../../redux/action";
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

		const DEFAULT_SORT_TYPE = 0;
		if (this.props.sortType != DEFAULT_SORT_TYPE) {
			console.log(`SortType: ${this.props.sortType}`);
			console.log(this);
			// sort the array then reset the sortType payload
			arraySort
				.selectionSortAnimation(this.state)
				.then(() => this.props.sortArray(DEFAULT_SORT_TYPE))
				.catch(() => console.log("error occured during Sorting"));
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
					width: `${70 / arrSize}vw`,
					margin: `0 ${10 / arrSize}vw`,
				}}
			>
				{/* {val} */}
			</div>
		));
	};

	render() {
		return (
			<React.Fragment>
				{/* <div>
		  <button onClick={() => this.sortArrayOfBars(1)}>Sel Sort</button>
		</div> */}
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
		console.log("resetArr Action dispatched successfully: set to True");
	}

	if (state.controls.sortType > 0) {
		console.log("sortType action dispatched successfully");
	}

	// return state;
	return {
		// only set resetArr to its state property if sortType is 0
		resetArr:
			state.controls.sortType === 0 ? state.controls.resetArr : false,
		sortType: state.controls.sortType,
	};
};

// higher level component
export default connect(mapStateToProps, { generateRandomArray, sortArray })(
	ArrayOfBars
);
