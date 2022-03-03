import axios from "axios";

export const GET_LIKES = "GET_LIKES";
export const GET_ONE_LIKE = "GET_ONE_LIKE";

export const LIKE_POST = "LIKE_POST";
export const COUNT_LIKES = "COUNT_LIKES";
export const POST_LIKED_BY_USER = "POST_LIKED_BY_USER";

export const getAllLikes = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/likes`)
      .then((res) => {
        dispatch({ type: GET_LIKES, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
export const getOneLike = (id_post, id_user) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/like/${id_post}`, {
        id_user,
      })
      .then((res) => {
        dispatch({ type: GET_ONE_LIKE, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const likePost = (id_post, like_author) => {
  return (dispatch) => {
    return axios
      .patch(`${process.env.REACT_APP_API_URL}api/post/${id_post}/like`, {
        like_author,
      })
      .then((res) => {
        dispatch({ type: LIKE_POST, payload: { like_author } });
      })
      .catch((err) => console.log(err));
  };
};

export const countLikes = (id_post) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/${id_post}/countLikes`)
      .then((res) => {
        dispatch({ type: COUNT_LIKES, payload: res.data[0].total });
      })
      .catch((err) => console.log(err));
  };
};

export const postLikedByUser = (like_post, like_author) => {
  return (dispatch) => {
    return axios
      .post(
        `${process.env.REACT_APP_API_URL}api/post/${like_post}/postLikedByUser`,
        { like_author }
      )
      .then((res) => {
        dispatch({
          type: POST_LIKED_BY_USER,
          payload: { like_author, like_post },
        });
      })
      .catch((err) => console.log(err));
  };
};
