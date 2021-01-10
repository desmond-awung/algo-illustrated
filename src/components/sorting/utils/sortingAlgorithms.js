import * as utils from "./sortingUtils";

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
	array = mergeSortHelper(0, arrSize - 1, array);
	// update the state
	state = {array, arrMax, arrSize};
	return state; 
};

const mergeSortHelper = (start, end, array) => {
	// base case
	if (start == end) return [array[start]];

	const mid = Math.floor((start + end) / 2);
	const leftSorted = mergeSortHelper(start, mid, array); // includes the mid element
	const rightSorted = mergeSortHelper(mid + 1, end, array); // excludes mid

	return merge(leftSorted, rightSorted);
};

const merge = (left, right) => {
	let result = [];
	let i = 0,
		j = 0,
		k = 0;

	while (i < left.length && j < right.length) {
		if (left[i] < right[j]) {
			result.push(left[i]);
			i++;
		} else {
			result.push(right[j]);
			j++;
		}
		k++;
	}

	while (i < left.length) {
		result.push(left[i]);
		i++;
		k++;
	}

	while (j < right.length) {
		result.push(right[j]);
		j++;
		k++;
	}

	return result;
};
