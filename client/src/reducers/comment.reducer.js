import { GET_COMMENTS } from "../actions/comment.actions";

const initialState = {};

export default function likeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return action.payload;

    default:
      return state;
  }
}
