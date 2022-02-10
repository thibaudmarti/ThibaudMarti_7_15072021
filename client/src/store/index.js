import combineReducers from "../reducers";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { actions } from "../actions";
import { getForums } from "../actions/forum.action";

const store = createStore(
  combineReducers,
  composeWithDevTools(applyMiddleware(thunk))
);
store.dispatch(getForums);

export default store;
