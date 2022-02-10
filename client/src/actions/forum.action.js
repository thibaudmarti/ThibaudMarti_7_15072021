import axios from "axios";

export const getForums = () => {
  return (dispatch) => {
    axios
      .get("bduser.json")
      .then((res) => {
        dispatch({ type: "GET_FORUM", payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
