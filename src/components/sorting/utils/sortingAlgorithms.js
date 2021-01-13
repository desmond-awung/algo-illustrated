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
	console.log(`Selected portions: ${mergeSortProcess.selectedPortions.length}`)
	console.log(`MergeLeft portions: ${mergeSortProcess.mergeLeft.length}`)
	console.log(`MergeRight portions: ${mergeSortProcess.mergeRight.length}`)
	console.log(`Merge Blocks len ${mergeSortProcess.mergeBlocks.length}`)
	console.log(`Merge Blocks:`)
	console.log(mergeSortProcess.mergeBlocks);
	mergeSortProcess.animations();
	// update the state
	// state = { array, arrMax, arrSize };
	return state;
};

class MergeSortClass {
	// constructor()
	arrayBars = document.getElementsByClassName(styles.singleBar);


	constructor(array) {
		this.array = array;
		this.arrMax = Math.max(...array);
		this.selectedPortions = [];
		this.mergeLeft = [];
		this.mergeRight = [];
		this.mergedElements = [];
		this.mergeBlocks = [];
		this.mergeIdx = 0;
	}

	mergeSortHelper = (start, end, array) => {
		// base case
		if (start == end) {
			this.selectedPortions.push(new Selected(start, end)); // will turn blue
			return [array[start]];
		}
		const mid = Math.floor((start + end) / 2);
		this.selectedPortions.push(new Selected(start, end)); // will turn blue
		this.mergeLeft.push(new Selected(start, mid));
		const leftSorted = this.mergeSortHelper(start, mid, array); // includes the mid element
		// hl left portion
		this.mergeRight.push(new Selected(mid + 1, end));
		const rightSorted = this.mergeSortHelper(mid + 1, end, array); // excludes mid
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
				barHeight = (left[i] * 100) / this.arrMax;
				mergedElements.push(new utils.ArrElement(leftStartIdx + i, barHeight));
				i++;
			} else {
				result.push(right[j]);
				barHeight = (right[j] * 100) / this.arrMax;
				mergedElements.push(new utils.ArrElement(rightStartIdx + j, barHeight));
				j++;
			}
			k++;
		}

		while (i < left.length) {
			result.push(left[i]);
			barHeight = (left[i] * 100) / this.arrMax;
			mergedElements.push(new utils.ArrElement(leftStartIdx + i, barHeight));
			i++;
			k++;
		}

		while (j < right.length) {
			result.push(right[j]);
			barHeight = (right[j] * 100) / this.arrMax;
			mergedElements.push(new utils.ArrElement(rightStartIdx + j, barHeight));
			j++;
			k++;
		}
		this.mergeBlocks.push(mergedElements);

		return result;
	};

	animations = async () => {
		let mLeftIdx = 0, mRightIdx = 0;
		let leftStack = [];
		let rightStack = [];

		// highlight and de-highlight based on selectedPortions
		let isMergeStarted = false;
		let isMergePhase = false;
		let rightStackSize;
		let leftRange = new Selected(0, 0);
		for (let i = 0; i < this.selectedPortions.length; i++) {
			const {start, end} = this.selectedPortions[i];
			// console.log(`Setting color for: portion # ${i} `);
			console.log(`Start: ${start} end: ${end}`);
			// console.log(this.selectedPortions);
			// console.log(`start: ${this.selectedPortions[0].start}`);
			// console.log(`end: ${this.selectedPortions[0].end}`);
			// console.log(`start: ${start}`);
			for (let j=start; j <= end; j++ ) {
				// console.log(`Setting color for: j `);
				this.arrayBars[j].style.backgroundColor = "blue";
			}
			const delay = 500;// 30000/this.array.length;
			await new Promise((done) => setTimeout(() => done(), delay));
			for (let j=start; j <= end; j++ ) {
				this.arrayBars[j].style.backgroundColor = "rgba(0, 0, 255, 0.356)";
			}
			await new Promise((done) => setTimeout(() => done(), delay));

			// do merging if start == end, and stop when right generated is not in range

			// start populating to the left and right stacks when we get our first start == end
			// if (!isMergeStarted && start == end) {
			// 	isMergeStarted = true;
			// }

			// populate the left or right stack depending on 
			if (mLeftIdx < this.mergeLeft.length) {
				// push to left stack
				const {start: lStart, end: lEnd} = this.mergeLeft[mLeftIdx];
				if (start === lStart && end == lEnd) {
					leftStack.push(this.mergeLeft[mLeftIdx]);
					mLeftIdx++;

					if (start === end) {
						// merging always begins on left arm of tree
						isMergePhase = true;	// waits for the next to be added onto the right stack
					}
					continue;
				}
			}

			// if (mRightIdx < this.mergeRight.length)	// not really needed, since the rightIdx will always diminish before the selectedPortions array gets empty
			const {start: rStart, end: rEnd} = this.mergeRight[mRightIdx];
			
			if (start === rStart && end === rEnd) {

				// push to right stack
				rightStack.push(this.mergeRight[mRightIdx]);
				mRightIdx++;


				if (isMergePhase) {
					await this.mergeAnimation(leftStack.pop(), rightStack.pop())
					// .then(() => {
					// 	isMergePhase = false;
					// 	continue;
					// })
					// .catch("Error occured during merge animation");
					isMergePhase = false;
				}

				// peek the last but 1 elt in the left stack
				rightStackSize = rightStack.length;
				// if selectedPortions.next.start > rightStack.peek()
				// if (rightStackSize > 0 && start > rightStack[rightStackSize-1].end) {
				// if we are at the end of the tree of at the enfd of the left branch
				if ((i === this.selectedPortions.length - 1) ||
					(rightStackSize > 0 &&  this.selectedPortions[i+1].start > rightStack[rightStackSize-1].end)) {
				while (rightStackSize > 0) {
						// we are done with the left branch, do one last merge before proceeding to right branch
						await this.mergeAnimation(leftStack.pop(), rightStack.pop())
						// update the stack size
						// .then(rightStackSize = rightStack.length)
						// .catch("Error occured during merge animation");
						rightStackSize = rightStack.length;
					}
					// isMergePhase = false;
				}
			}

		}

		// console.log("************ MergeLeft ***************");
		// for (let i=0; i < this.mergeLeft.length; i++) {
		// 	const {start, end} = this.mergeLeft[i];
		// 	console.log(`Start: ${start} end: ${end}`);
		// }
		
		// console.log("************ MergeRight ***************");
		// for (let i=0; i < this.mergeRight.length; i++) {
		// 	const {start: rstart, end: rEnd} = this.mergeRight[i];
		// 	console.log(`Start: ${rstart} end: ${rEnd}`);
		// }

	};

	// left and right borders, inclusive
	mergeAnimation = async(left, right) => {
		console.log(`Left: ${left.start}; Right: ${right.end}`);
		const numBars = right.end - left.start + 1;
		// const delay = 3000/numBars; 
		const delay = 500; 


		for (let i=left.start; i <= right.end; i++ ) {
			this.arrayBars[i].style.backgroundColor = "red";
		}
		await new Promise((done) => setTimeout(() => done(), delay/10));

		// sort bars by height
		for (let i=0; i < numBars; i++) {
			const barHeight = this.mergeBlocks[this.mergeIdx][i].height; 
			this.arrayBars[left.start + i].style.height = "0%";
			await new Promise((done) => setTimeout(() => done(), delay/10));
			this.arrayBars[left.start + i].style.height = `${barHeight}%`;
			await new Promise((done) => setTimeout(() => done(), delay/10));
			// console.log(`For ${i}: ${this.mergeBlocks[this.mergeIdx][i].height}`);
			// console.log("*****");
		}
		// for (let i=this.mergeBlocks[mergeIdx][0].idx; i < this.mergeBlocks[mergeIdx][])

		for (let i=left.start; i <= right.end; i++ ) {
			this.arrayBars[i].style.backgroundColor = "black";
		}
		await new Promise((done) => setTimeout(() => done(), delay/10));
		this.mergeIdx++;

			// });
		// })
		// return sleep(delay)
		// .then(() => {

		// 	for (let i=left.start; i <= right.end; i++ ) {
		// 		this.arrayBars[i].style.backgroundColor = "yellow";
		// 	}
		// 	sleep(delay)
		// 	.then(() => {
		// 		for (let i=left.start; i <= right.end; i++ ) {
		// 			this.arrayBars[i].style.backgroundColor = "black";
		// 		}
		// 		// sleep(delay)
		// 	});
		// })
		
		// for (let i=left.start; i <= right.end; i++ ) {
		// 	this.arrayBars[i].style.backgroundColor = "yellow";
		// }
		// sleep(delay)
		// .then(() => {
		// 	for (let i=left.start; i <= right.end; i++ ) {
		// 		this.arrayBars[i].style.backgroundColor = "black";
		// 	}
		// 	sleep(delay)
		// });
		

	}
}

// async function setBarColor(color, arrayBar) {
// 	await new Promise(() => {
// 		arrayBar.style.backgroundColor = color;
// 	})
// } 

const sleep = ms => {
	return new Promise(resolve => setTimeout(resolve, ms))
}

class Selected {
	constructor(start, end) {
		this.start = start;
		this.end = end;
	}
}
