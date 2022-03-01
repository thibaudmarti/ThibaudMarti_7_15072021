import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_NAME = "UPDATE_NAME";
export const UPDATE_JOB = "UPDATE_JOB";

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
      .then((res) => {
        // console.log(res);
        console.log(res.data);
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const uploadPicture = (data, id_user) => {
  return (dispatch) => {
    return axios
      .put(`${process.env.REACT_APP_API_URL}api/user/image/${id_user}`, data)
      .then((res) => {
        return axios
          .get(`${process.env.REACT_APP_API_URL}api/user/${id_user}`)
          .then((res) => {
            dispatch({ type: UPLOAD_PICTURE, payload: res.data.user_picture });
          });
      })
      .catch((err) => console.log(err));
  };
};

export const updateName = (id_user, user_name) => {
  return (dispatch) => {
    return axios
      .put(`${process.env.REACT_APP_API_URL}api/user/name/${id_user}`, {
        user_name,
      })
      .then((res) => {
        dispatch({ type: UPDATE_NAME, payload: user_name });
      })
      .catch((err) => console.log(err));
  };
};

export const updateJob = (id_user, user_job) => {
  return (dispatch) => {
    return axios
      .put(`${process.env.REACT_APP_API_URL}api/user/job/${id_user}`, {
        user_job,
      })
      .then((res) => {
        dispatch({ type: UPDATE_JOB, payload: user_job });
      })
      .catch((err) => console.log(err));
  };
};
