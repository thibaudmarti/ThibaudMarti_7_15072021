import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import postReducer from "./post.reducer";
import likeReducer from "./like.reducer";

export default combineReducers({ userReducer, postReducer, likeReducer });
