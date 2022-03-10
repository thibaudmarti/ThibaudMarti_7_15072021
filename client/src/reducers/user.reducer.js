import {
  GET_USER,
  UPLOAD_PICTURE,
  UPDATE_NAME,
  UPDATE_JOB,
  DELETE_USER,
} from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case UPLOAD_PICTURE:
      return {
        ...state,
        user_picture: action.payload,
      };
    case UPDATE_NAME:
      return {
        ...state,
        user_name: action.payload,
      };
    case UPDATE_JOB:
      return {
        ...state,
        user_job: action.payload,
      };
    case DELETE_USER:
      return { ...state };
    default:
      return state;
  }
}
