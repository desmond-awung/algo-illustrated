import { combineReducers } from "redux";
import controlsReducer from './controlsReducer'

// combine all reducers

export default combineReducers({
    controls: controlsReducer
});