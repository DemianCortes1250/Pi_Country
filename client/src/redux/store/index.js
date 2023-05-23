import {createStore, applyMiddleware, compose} from "redux";
import thunkMiddleware from "redux-thunk"
import rootReducer from "../reducer";

const composeEnhancer = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

export const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunkMiddleware)))