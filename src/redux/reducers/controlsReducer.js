// evaluate actions
import { GEN_RANDOM_ARRAY, SORT_ARRAY, RANDOM_ARRAY_DONE } from "../actionTypes";

const initialState = {
    resetArr: false,
    // item: {}
}

export default function(state = initialState, action) {
    const newState = {...state};

    switch(action.type) {
        case GEN_RANDOM_ARRAY: {
            // const {}
            console.log("Action occured");
            return {
                ...state,
                resetArr: !state.resetArr
            }
            // newState.resetArr = true;
            // break;
        }

        case RANDOM_ARRAY_DONE: {
            newState.resetArr = false;
            break;
        }

        default:
            // return state;
            // no change
            break;

    }

    return newState;
}

// export default function(state = initialState, action) {
//     const newState = {...state};
//     switch(action.type) {
//         case GEN_RANDOM_ARRAY:
//             newState.resetArr = true;
//             console.log("Action occured");
//             break;

//         case RANDOM_ARRAY_DONE:
//             newState.resetArr = false;
//             break;

//         default:
//             // return state;
//             // no change
//             break;

//     }

//     return newState;
// }
