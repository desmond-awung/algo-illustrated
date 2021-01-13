import * as utils from "./sortingUtils";
import styles from "../sorting.module.css";

//================================================
// sort types
//================================================
/**
 * SELECTION SORT
 */
export const selectionSort = (state, allAnimations) => {
	// formula for height of a bar
	// height: `((val * 100) / arrMax)%`
	let { array, arrMax, arrSize } = state;
	let temp;
	for (let i = 0; i < arrSize - 1; i++) {
		// const animation = new SwapAnimation()
		const left = new utils.ArrElement(i, (array[i] * 100) / arrMax);
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
		const right = new utils.ArrElement(
			minIndex,
			(array[minIndex] * 100) / arrMax
		);
		allAnimations.push(new utils.SwapAnimation(left, right));

		temp = array[i];
		array[i] = array[minIndex];
		array[minIndex] = temp;
	}
};

/**
 * Merge Sort
 **/
export const mergeSort = (state) => {
	let { array, arrMax, arrSize } = state;
	//array of single element is already sorted
	// if (arrSize <= 1) return array;
	const mergeSortProcess = new MergeSortClass(array);
	array = mergeSortProcess.mergeSortHelper(0, arrSize - 1, array);
	mergeSortProcess.animations();
	// update the state
	// state = { array, arrMax, arrSize };
	return state;
};

class MergeSortClass {
	// constructor()

	constructor(array) {
		this.array = array;
		this.arrMax = Math.max(...array);
		this.selectedPortions = [];
		this.mergeLeft = [];
		this.mergeRight = [];
		this.mergedElements = [];
		this.mergeBlocks = [];
	}

	mergeSortHelper = (start, end, array) => {
		// base case
		if (start == end) {
			this.selectedPortions.push(new Selected(start, end)); // will turn blue
			return [array[start]];
		}
		const mid = Math.floor((start + end) / 2);
		this.selectedPortions.push(new Selected(start, end)); // will turn blue
		const leftSorted = this.mergeSortHelper(start, mid, array); // includes the mid element
		// hl left portion
		this.mergeLeft.push(new Selected(start, mid));
		const rightSorted = this.mergeSortHelper(mid + 1, end, array); // excludes mid
		this.mergeRight.push(new Selected(mid + 1, end));
		return this.merge(leftSorted, rightSorted, start, mid + 1);
	};

	merge = (left, right, leftStartIdx, rightStartIdx) => {
		let result = [];
		let i = 0,
			j = 0,
			k = 0;
		let barHeight = 0;
		let mergedElements = [];
		while (i < left.length && j < right.length) {
			if (left[i] < right[j]) {
				result.push(left[i]);
				barHeight = (this.array[leftStartIdx + i] * 100) / this.arrMax;
				mergedElements.push(new utils.ArrElement(i, barHeight));
				i++;
			} else {
				result.push(right[j]);
				barHeight = (this.array[rightStartIdx + j] * 100) / this.arrMax;
				mergedElements.push(new utils.ArrElement(j, barHeight));
				j++;
			}
			k++;
		}

		while (i < left.length) {
			result.push(left[i]);
			barHeight = (this.array[leftStartIdx + i] * 100) / this.arrMax;
			mergedElements.push(new utils.ArrElement(i, barHeight));
			i++;
			k++;
		}

		while (j < right.length) {
			result.push(right[j]);
			barHeight = (this.array[rightStartIdx + j] * 100) / this.arrMax;
			mergedElements.push(new utils.ArrElement(j, barHeight));
			j++;
			k++;
		}
		this.mergeBlocks.push(mergedElements);

		return result;
	};

	animations = async () => {
		const arrayBars = document.getElementsByClassName(styles.singleBar);
		let mLeftIdx = 0, mRightIdx = 0;

		// for (let i=0; i < this.mergeLeft.length; i++ ) {
		// 	console.log("Left: ");
		// 	console.log(this.mergeLeft[i]);
		// }

		// for (let i=0; i < this.mergeRight.length; i++) {
		// 	console.log("Right");
		// 	console.log(this.mergeRight[i]);
		// }

		// highlight and de-highlight based on selectedPortions
		for (let i = 0; i < this.selectedPortions.length; i++) {
			const {start, end} = this.selectedPortions[i];
			console.log(`Setting color for: portion # ${i} `);
			console.log(`Start: ${start} end: ${end}`);
			// console.log(this.selectedPortions);
			// console.log(`start: ${this.selectedPortions[0].start}`);
			// console.log(`end: ${this.selectedPortions[0].end}`);
			// console.log(`start: ${start}`);
			for (let j=start; j <= end; j++ ) {
				// console.log(`Setting color for: j `);
				arrayBars[j].style.backgroundColor = "blue";
			}
			const delay = 1000;
			await new Promise((done) => setTimeout(() => done(), delay));
			for (let j=start; j <= end; j++ ) {
				arrayBars[j].style.backgroundColor = "rgba(0, 0, 255, 0.356)";
			}
			await new Promise((done) => setTimeout(() => done(), delay));

			// do merging if start == end, and stop when 

			// if (end + 1 === this.mergeLeft[mLeftIdx].start && end === this.mergeRight[mRightIdx].end) {
			// 	console.log("Yayyyy. Ready to merge======");
			// 	mLeftIdx++; 
			// 	mRightIdx++;
			// }
			


		}

	};
}

async function setBarColor(color, arrayBar) {
	await new Promise(() => {
		arrayBar.style.backgroundColor = color;
	})
} 

class Selected {
	constructor(start, end) {
		this.start = start;
		this.end = end;
	}
}
