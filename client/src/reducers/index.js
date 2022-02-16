import { combineReducers } from "redux";
import forumReducer from "./forum.reducer";
import userReducer from "./user.reducer";

export default combineReducers({ forumReducer, userReducer });
