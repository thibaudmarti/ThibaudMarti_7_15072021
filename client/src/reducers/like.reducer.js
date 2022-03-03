import {
  GET_LIKES,
  LIKE_POST,
  COUNT_LIKES,
  POST_LIKED_BY_USER,
  GET_ONE_LIKE,
} from "../actions/like.actions";

const initialState = {};

export default function likeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIKES:
      return action.payload;
    case LIKE_POST:
      return state;
    case COUNT_LIKES:
      return state;
    case POST_LIKED_BY_USER:
      return state;
    case GET_ONE_LIKE:
      return state;
    default:
      return state;
  }
}
