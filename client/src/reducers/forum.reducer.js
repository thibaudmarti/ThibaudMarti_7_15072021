const initialState = {};

const forumReducer = (state = initialState, action) => {
  if (action.type === "GET_FORUM") {
    return action.payload;
  }
  return state;
};

export default forumReducer;
