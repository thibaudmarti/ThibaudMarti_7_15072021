import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllLikes,
  getOneLike,
  likePost,
  postLikedByUser,
} from "../../actions/like.actions";
import { UidContext } from "../AppContext";

const LikeInput = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  // const likeData = useSelector((state) => state.likeReducer);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  // const [isLiked, setIsLiked] = useState(false);

  //   const like = () => {
  //     dispatch(likePost(post.id_post, uid));
  //     setLiked(true);
  //   };

  // const postLiked = () => {
  //   postLikedByUser(post.id_post, uid);
  //   // setLiked(true);
  // };

  // const isAlreadyLiked = () => {
  //   // console.log(post);
  //   dispatch(getOneLike(post.id_post, userData.id_user));
  // };

  const likeThisPost = () => {
    dispatch(likePost(post.id_post, userData.id_user));
    setLiked(!liked);
  };

  const postLikedByUser = () => {
    return axios
      .post(
        `${process.env.REACT_APP_API_URL}api/post/${post.id_post}/postLikedByUser`,
        { like_author: uid }
      )
      .then((res) => {
        // console.log(res.data[0]);
        if (res.data[0] === undefined) {
          return setLiked(false);
        } else {
          return setLiked(true);
        }
        // console.log(userData.id_user);
        // console.log(uid);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    postLikedByUser();
  }, []);

  return (
    <div>
      {liked && (
        <div>
          <button onClick={likeThisPost}>liked</button>
        </div>
      )}
      {liked === false && (
        <div>
          <button onClick={likeThisPost}>not liked</button>
        </div>
      )}
    </div>
  );
};

export default LikeInput;
