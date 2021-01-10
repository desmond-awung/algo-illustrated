import { GEN_RANDOM_ARRAY, SORT_ARRAY } from "./actionTypes";

export const generateRandomArray = () => ({
	type: GEN_RANDOM_ARRAY,
});

export const sortArray = (sortType) => ({
	type: SORT_ARRAY,
	payload: sortType,
});
