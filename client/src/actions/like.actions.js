import axios from "axios";

export const GET_LIKES = "GET_LIKES";
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

export const likePost = (like_post, like_author) => {
  return (dispatch) => {
    return axios.patch(
      `${process.env.REACT_APP_API_URL}api/post/${like_post}/like`,
      {
        like_author,
      }
    );
  };
};

export const countLikes = (id_post) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/${id_post}/countLikes`)
      .then((res) => {
        // console.log(res.data);
        return res.data;
      });
  };
};

export const postLikedByUser = (like_post, like_author) => {
  return (dispatch) => {
    return axios.post(
      `${process.env.REACT_APP_API_URL}api/post/${like_post}/postLikedByUser`,
      { like_author }
    );
  };
};
