// evaluate actions
import {
	GEN_RANDOM_ARRAY,
	SORT_ARRAY,
} from "../actionTypes";

const initialState = {
	resetArr: false,
	sortType: 0,
};

export default function (state = initialState, action) {
	// const newState = {...state};
	console.log("Action occured");

	switch (action.type) {
		case GEN_RANDOM_ARRAY: {
			return {
				...state,
				resetArr: !state.resetArr,
			};
		}

		case SORT_ARRAY: {
			const sortType = action.payload;
			// console.log(action);
			return {
				...state,
				sortType: sortType,
			};
		}

		default:
			// return prior state;
			return state;
	}

	// return newState;
}
