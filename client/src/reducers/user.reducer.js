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
// FOLLOW_USER,
// UNFOLLOW_USER,
// UPDATE_BIO,

// case UPLOAD_PICTURE:
//   return {
//     ...state,
//     picture: action.payload,
//   };
// case UPDATE_BIO:
//   return {
//     ...state,
//     bio: action.payload,
//   };
// case FOLLOW_USER:
//   return {
//     ...state,
//     following: [action.payload.idToFollow, ...state.following],
//   };
// case UNFOLLOW_USER:
//   return {
//     ...state,
//     following: state.following.filter(
//       (id) => id !== action.payload.idToUnfollow
//     ),
//   };
