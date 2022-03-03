import axios from "axios";

// posts
export const GET_POSTS = "GET_POSTS";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

// export const LIKE_POST = "LIKE_POST";
// export const COUNT_LIKES = "COUNT_LIKES";

export const getPosts = (num) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/`)
      .then((res) => {
        const array = res.data.slice(0, num);
        dispatch({ type: GET_POSTS, payload: array });
        // dispatch({ type: GET_ALL_POSTS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const updatePost = (post_content, id_post) => {
  return (dispatch) => {
    return axios
      .put(`${process.env.REACT_APP_API_URL}api/post/${id_post}`, {
        post_content,
      })
      .then((res) => {
        console.log(res.data);
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
        console.log(res.data);
        dispatch({
          type: DELETE_POST,
          payload: { id_post },
        });
      })
      .catch((err) => console.log(err));
  };
};

// export const likePost = (id_post, like_author) => {
//   return (dispatch) => {
//     return axios
//       .patch(`${process.env.REACT_APP_API_URL}api/post/${id_post}/like`, {
//         like_author,
//       })
//       .then((res) => {
//         dispatch({ type: LIKE_POST, payload: { like_author } });
//       })
//       .catch((err) => console.log(err));
//   };
// };

// export const countLikes = (id_post) => {
//   return (dispatch) => {
//     return axios
//       .get(`${process.env.REACT_APP_API_URL}api/post/${id_post}/countLikes`)
//       .then((res) => {
//         dispatch({ type: COUNT_LIKES, payload: res.data });
//       })
//       .catch((err) => console.log(err));
//   };
// };
