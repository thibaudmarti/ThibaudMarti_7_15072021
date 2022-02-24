import combineReducers from "../reducers";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";

// import { actions } from "../actions";
// import { getForums } from "../actions/forum.action";
// import { getUser } from "../actions/user.actions";

const store = createStore(
  combineReducers,
  composeWithDevTools(applyMiddleware(thunk, logger))
);
// store.dispatch(getUser(uid));

export default store;
