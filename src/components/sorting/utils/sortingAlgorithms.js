import * as utils from "./sortingUtils";

//================================================
// sort types
//================================================
/**
 * SELECTION SORT
 */
export const selectionSort = (state, allAnimations) => {
	// console.log(this);
	// formula for height
	// height: `${(val * 100) / arrMax}%`
	let { array, arrMax, arrSize } = state;
	// let size = this.arraySize;
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
		const right = new utils.ArrElement(minIndex, (array[minIndex] * 100) / arrMax);
	  	// const animation = new SwapAnimation(left, right);
	  	allAnimations.push(new utils.SwapAnimation(left, right));

	  temp = array[i];
	  array[i] = array[minIndex];
	  array[minIndex] = temp;

	}
  };

