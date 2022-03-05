import axios from "axios";

export const GET_COMMENTS = "GET_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const getComments = (id_post) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/comment/${id_post}/allComments`)
      .then((res) => dispatch({ type: GET_COMMENTS, payload: res.data }))
      .catch((err) => console.log(err));
  };
};

export const addComment = (id_post, comment_author, comment_content) => {
  return (dispatch) => {
    return axios.post(
      `${process.env.REACT_APP_API_URL}api/comment/${id_post}`,
      comment_author,
      comment_content
    );
  };
};

export const deleteComment = (id_comment) => {
  return (dispatch) => {
    return axios.delete(
      `${process.env.REACT_APP_API_URL}api/comment/${id_comment}`
    );
  };
};
