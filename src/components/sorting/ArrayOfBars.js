import React, { Component } from "react";
import styles from "../sorting/sorting.module.css";
import * as utils from "../sorting/sortingUtils";
import { connect } from "react-redux";
import { generateRandomArray } from "../../actions/arrAction";

class ArrayOfBars extends Component {
  constructor(props) {
	super(props);

	this.state = {
	  array: [],
	  arrMax: 1,
	  arrSize: 1,
	};
	// self =
	// this.selectionSort = selectionSort(this);
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
	  array[i] = utils.getRandomIntInclusive(1, 100);
	}
	arrMax = Math.max(...array);
	// arrMax = 0 ? 0.1 : arrMax;    // if the max cones out to be zero for whatever reason, set it to 0.1
	// arrSize = array.length;
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

/*   selectionSort = () => {
	// console.log(this);
	let { array, arrMax, arrSize } = this.state;
	// let size = this.arraySize;
	const arrayBars = document.getElementsByClassName(styles.singleBar);
	// console.log(arrayBars);
	// arrayBars[2].style.backgroundColor = 'red';
	let temp;
	for (let i = 0; i < arrSize - 1; i++) {
	  let min = array[i];
	  let minIndex = i;
	  // this.currIndex = i;
	  // this.color = 'red';
	  // setTimeout(() => {}, 2000)
	  // this.updatesss();
	  // this.setVerticalBarStyles(i, 'red');
	  // if (i === 3)
	  // this.sleep(50);

	  for (let j = i + 1; j < arrSize; j++) {


		// animation ===
		// setTimeout(() => {
		// 	console.log(`To red: i=${i}, j = ${j}`);
		// 	arrayBars[i].style.backgroundColor = 'red';
		// 	arrayBars[j].style.backgroundColor = 'red';
		// 	setTimeout(() => {
		// 		arrayBars[i].style.backgroundColor = 'blue';
		// 		arrayBars[j].style.backgroundColor = 'blue';
		// 	}, 1000)
		// }, 1000)
		// ====

		// find the min and its index
		if (array[j] < min) {
		  min = array[j];
		  minIndex = j;
		}


	  }
	  // if elt at current index is still min, then no need to swap
	  if (minIndex === i) continue;
	  // else swap min with elt at i
	  temp = array[i];
	  array[i] = array[minIndex];
	  array[minIndex] = temp;

	//   this.setState({ array, arrMax, arrSize });
	//   sleep(1000);
	//   return;
	  // this.changeSingleBarColor(i);
	}
	// modify the state
	this.setState({ array, arrMax, arrSize });
  };
 */
  render() {
	return (
	  <React.Fragment>
		<div>
		  <button onClick={() => sortArrayofBars(this.state)}>Sel Sort</button>
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

const sleep = (milliseconds) => {
	const date = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while (currentDate - date < milliseconds);
};


//================================================
// sort types
//================================================
/**
 * SELECTION SORT
 */
const selectionSort = (state, allAnimations) => {
	// console.log(this);
	// formula for height
	// height: `${(val * 100) / arrMax}%`
	let { array, arrMax, arrSize } = state;
	// let size = this.arraySize;
	let temp;
	for (let i = 0; i < arrSize - 1; i++) {
		// const animation = new SwapAnimation() 
		const left = new ArrElement(i, (array[i] * 100) / arrMax);
	  let min = array[i];
	  let minIndex = i;
	  for (let j = i + 1; j < arrSize; j++) {
		// keep track of what we selected and what we swapped

		// find the min and its index
		if (array[j] < min) {
		  min = array[j];
		  minIndex = j;
		}


	  }
	  // if elt at current index is still min, then no need to swap
	  if (minIndex === i) continue;
	  // else swap min with elt at i
	  // capture animations before swapping
		const right = new ArrElement(minIndex, (array[minIndex] * 100) / arrMax);
	  	// const animation = new SwapAnimation(left, right);
	  	allAnimations.push(new SwapAnimation(left, right));

	  temp = array[i];
	  array[i] = array[minIndex];
	  array[minIndex] = temp;

	}
	// modify the state - don't
	// this.setState({ array, arrMax, arrSize });
  };

class SwapAnimation {
	// constructor(left, right, isSwapped) {
	constructor(left, right) {
		this.left = left;
		this.right = right;
		// this.isSwapped = isSwapped;		
	}
}

class ArrElement {
	constructor(idx, height) {
		this.idx = idx;
		this.height = height; 
	}
} 

async function sortArrayofBars(state) {
	let allAnimations = [];
	selectionSort(state, allAnimations);
	const arrayBars = document.getElementsByClassName(styles.singleBar);
	// calculate delay in ms used in the for loop so the entire sorting animation takes takes about 10s for all array sizes 
	const size = state.arrSize;
	// for arrays of sizes < 50: delay = 30 ms
	// else for arrays of sizes < 1000: delay = 1000/size ms
	// else: delay = 3000/size
	// const delay = (size < 50) ? (30) : ( (size < 100) ? (3000/size) : (1000 / size)); 
	const delay = 3000 / size; 
	console.log(`size = ${size}, delay = ${delay}`);

	for (let i=0; i < allAnimations.length; i++) {
		// select two bars, delay then swap and delay
		// the idea for using async await came after reading: https://blog.praveen.science/right-way-of-delaying-execution-synchronously-in-javascript-without-using-loops-or-timeouts/
		const {left, right} = allAnimations[i]; 
		// console.log(`To red: left=${left.idx}, right = ${right.idx}`);
		console.log(`Setting to red`);
		// swap the height of left and right bars
		arrayBars[left.idx].style.backgroundColor = 'red';
		arrayBars[right.idx].style.backgroundColor = 'red';
		// sleep(100);
		await new Promise(done => setTimeout(() => done(), delay));  
		// console.log(`Setting height`);
		arrayBars[left.idx].style.height = `${right.height}%`;
		arrayBars[right.idx].style.height = `${left.height}%`;
		// sleep(100);
		await new Promise(done => setTimeout(() => done(), delay));  
		// console.log(`Setting to turquiose`);
		arrayBars[left.idx].style.backgroundColor = 'turquoise';
		arrayBars[right.idx].style.backgroundColor = 'turquoise';
		// sleep(100);
		await new Promise(done => setTimeout(() => done(), delay));  
	}

}

// higher level component
export default connect(mapStateToProps, { generateRandomArray })(ArrayOfBars);
