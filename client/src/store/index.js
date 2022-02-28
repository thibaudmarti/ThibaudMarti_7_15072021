import combineReducers from "../reducers";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";

const store = createStore(
  combineReducers,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

export default store;
