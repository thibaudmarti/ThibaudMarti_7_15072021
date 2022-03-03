import combineReducers from "../reducers";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { getAllLikes } from "../actions/like.actions";
import { getPosts } from "../actions/post.actions";

const store = createStore(
  combineReducers,
  composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(getAllLikes());
store.dispatch(getPosts());

export default store;
