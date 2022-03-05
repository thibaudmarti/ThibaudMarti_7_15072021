import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  countLikes,
  getAllLikes,
  likePost,
  postLikedByUser,
} from "../../actions/like.actions";
import { UidContext } from "../AppContext";

const LikeInput = ({ post }) => {
  const likeData = useSelector((state) => state.likeReducer);
  // const [loadLike, setLoadLike] = useState(true);
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
    // console.log(response);
    setCountLike(response[0].total);
  };

  useEffect(() => {
    checkLikes();
    getLikesNb();
  }, [countLike, liked]);

  return (
    <div>
      {liked && (
        <div>
          <button onClick={likeThisPost}>liked</button>
          <div>{countLike}</div>
        </div>
      )}
      {liked === false && (
        <div>
          <button onClick={likeThisPost}>not liked</button>
          <div>{countLike}</div>
        </div>
      )}
    </div>
  );
};

export default LikeInput;
