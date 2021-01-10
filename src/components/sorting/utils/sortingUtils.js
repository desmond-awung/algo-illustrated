// from MDN reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values_inclusive
export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}


export class SwapAnimation {
	// constructor(left, right, isSwapped) {
	constructor(left, right) {
		this.left = left;
		this.right = right;
		// this.isSwapped = isSwapped;		
	}
}

export class ArrElement {
	constructor(idx, height) {
		this.idx = idx;
		this.height = height; 
	}
} 

