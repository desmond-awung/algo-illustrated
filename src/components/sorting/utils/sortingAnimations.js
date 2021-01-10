import * as algo from "./sortingAlgorithms";
import styles from "../sorting.module.css";

// =================================
// for Selection Sort
// =================================

export async function selectionSortAnimation(state) {
	let allAnimations = [];
	algo.selectionSort(state, allAnimations);
	const arrayBars = document.getElementsByClassName(styles.singleBar);
	// calculate delay in ms used in the for loop so the entire sorting animation takes takes about 10s for all array sizes
	const size = state.arrSize;
	const delay = 3000 / size;
	console.log(`size = ${size}, delay = ${delay}`);

	for (let i = 0; i < allAnimations.length; i++) {
		// select two bars, delay then swap and delay
		// the idea for using async await came after reading: https://blog.praveen.science/right-way-of-delaying-execution-synchronously-in-javascript-without-using-loops-or-timeouts/
		const { left, right } = allAnimations[i];
		// console.log(`To red: left=${left.idx}, right = ${right.idx}`);
		console.log(`Setting to red`);
		// swap the height of left and right bars
		arrayBars[left.idx].style.backgroundColor = "red";
		arrayBars[right.idx].style.backgroundColor = "red";
		// sleep(100);
		// console.log(`Setting height`);
		await new Promise((done) => setTimeout(() => done(), delay));
		arrayBars[left.idx].style.height = `${right.height}%`;
		arrayBars[right.idx].style.height = `${left.height}%`;
		// sleep(100);
		await new Promise((done) => setTimeout(() => done(), delay));
		// console.log(`Setting to turquiose`);
		arrayBars[left.idx].style.backgroundColor = "turquoise";
		arrayBars[right.idx].style.backgroundColor = "turquoise";
		// sleep(100);
		await new Promise((done) => setTimeout(() => done(), delay));
	}
}

async function wait(millisecs) {
	await new Promise((done) => setTimeout(() => done(), millisecs));
}
