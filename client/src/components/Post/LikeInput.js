import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  countLikes,
  getAllLikes,
  likePost,
  postLikedByUser,
} from "../../actions/like.actions";
import { UidContext } from "../AppContext";

const LikeInput = ({ post }) => {
  const [countLike, setCountLike] = useState(null);
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const likeThisPost = () => {
    dispatch(likePost(post.id_post, uid))
      .then(() => dispatch(getAllLikes()))
      .then(() => getLikesNb())
      .then(() => checkLikes());
  };
  const checkLikes = async () => {
    const response = await dispatch(postLikedByUser(post.id_post, uid));
    // console.log(response.data[0]);
    if (response.data[0]) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  };

  const getLikesNb = async () => {
    const response = await dispatch(countLikes(post.id_post));
    setCountLike(response[0].total);
  };

  useEffect(() => {
    const checkLikes = async () => {
      const response = await dispatch(postLikedByUser(post.id_post, uid));
      // console.log(response.data[0]);
      if (response.data[0]) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    };

    const getLikesNb = async () => {
      const response = await dispatch(countLikes(post.id_post));
      setCountLike(response[0].total);
    };
    checkLikes();
    getLikesNb();
  }, [countLike, liked, dispatch, post.id_post, uid]);

  return (
    <>
      {liked && (
        <div className="liked">
          <i className="fas fa-heart" onClick={likeThisPost}></i>
          <div className="numberLike">{countLike}</div>
        </div>
      )}
      {liked === false && (
        <div className="liked">
          <i className="far fa-heart" onClick={likeThisPost}></i>
          <div className="numberLike">{countLike}</div>
        </div>
      )}
    </>
  );
};

export default LikeInput;
