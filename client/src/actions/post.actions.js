import axios from "axios";

// posts
export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

export const getPosts = (num) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/`)
      .then((res) => {
        const array = res.data.slice(0, num);
        dispatch({ type: GET_POSTS, payload: array });
      })
      .catch((err) => console.log(err));
  };
};

export const addPost = (data) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/post/`, data)
      .then((res) => {
        return res.data;
      });
  };
};

export const updatePost = (post_content, id_post) => {
  return (dispatch) => {
    return axios
      .put(`${process.env.REACT_APP_API_URL}api/post/${id_post}`, {
        post_content,
      })
      .then((res) => {
        dispatch({
          type: UPDATE_POST,
          payload: { id_post, post_content },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const deletePost = (id_post) => {
  return (dispatch) => {
    return axios
      .delete(`${process.env.REACT_APP_API_URL}api/post/${id_post}`)
      .then((res) => {
        dispatch({
          type: DELETE_POST,
          payload: { id_post },
        });
      })
      .catch((err) => console.log(err));
  };
};
