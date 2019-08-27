import {combineEpics} from "redux-observable";
import {combineReducers} from "redux";

import {

} from "../containers/SplashScreen/epic";

import splashReducer from "../containers/SplashScreen/reducer";
import homeReducer from "../containers/HomeScreen/reducer";

/**
 * Combine all the epics into root
 */
export const rootEpic = combineEpics(

);

/**
 * Combine all the reducers into root
 */
export const rootReducer = combineReducers({
	splashReducer,
	homeReducer,
});
