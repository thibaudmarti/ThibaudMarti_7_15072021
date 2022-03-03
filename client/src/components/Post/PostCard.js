import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllLikes,
  likePost,
  postLikedByUser,
} from "../../actions/like.actions";
import { deletePost, updatePost } from "../../actions/post.actions";
import { UidContext } from "../AppContext";
import LikeInput from "./LikeInput";

const PostCard = ({ post }) => {
  const likes = useSelector((state) => state.likeReducer);
  const userData = useSelector((state) => state.userReducer);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(textUpdate, post.id_post));
    }
    setIsUpdated(false);
  };
  // const handleLikePost = () => {
  //   dispatch(likePost(post.id_post, userData.id_user));
  // };

  // const handleCountLikes = () => {
  //   dispatch(countLikes(post.id_post));
  // };

  // const [loadLikes, setLoadLikes] = useState(true);
  // const dispatch = useDispatch();
  // const likeData = useSelector((state) => state.likeReducer);

  // useEffect(() => {
  //   if (loadLikes) {
  //     dispatch(getAllLikes());
  //     setLoadLikes(false);
  //   }
  // }, [loadLikes, dispatch]);
  // const likeOfThisPost = () => {};

  // const userLikeThisPost = () => {
  //   if (
  //     dispatch(postLikedByUser(post.id_post, userData.id_user)) ===
  //     { like_author: userData.id_user, like_post: post.id_post }
  //   ) {
  //     setLiked(true);
  //   } else {
  //     setLiked(false);
  //   }
  // };
  // useEffect(() => {
  //   postIsLikedByUser();
  // }, []);

  const deleteThisPost = () => {
    dispatch(deletePost(post.id_post));
  };

  const likeThisPost = () => {
    dispatch(likePost(post.id_post, userData.id_user));
    setLiked(!liked);
  };

  const postIsLikedByUser = () => {
    dispatch(postLikedByUser(post.id_post, userData.id_user));
  };

  // const filterLike = likes.filter((like) => like.like_author === uid);

  // useEffect(() => {
  //   if (filterLike[0].like_author === uid) {
  //     console.log(true);
  //   }
  //   // console.log(filterLike[0].like_author);
  // }, []);

  return (
    <div className="post-card" key={post.id_post}>
      <div className="top-part">
        <div className="user-part">
          <div className="user-pic">
            <img src={post.user_picture} alt="user-pic" />
          </div>
          <h3>{post.user_name}</h3>
        </div>
        <div className="like-part">
          {/* {!isEmpty(likes[0]) &&
            likes.filter((like) => {
              return <LikeInput like={like} key={like.id_like} />;
            })} */}
          <LikeInput post={post} />
          {/* {liked && (
            <div>
              <button onClick={likeThisPost}>liked</button>
            </div>
          )}
          {liked === false && (
            <div>
              <button onClick={likeThisPost}>not liked</button>
            </div>
          )} */}
          {/* <div className="numberLike">0</div>
          <div className="anim_heart">
            <input type="checkbox" onChange={handleLikePost} />
            <i className="far fa-heart"></i>
            <i className="fas fa-heart"></i>
          </div> */}
        </div>
      </div>
      <div className="content-part">
        {isUpdated === false && (
          <>
            <p>{post.post_content}</p>
            {userData.id_user === post.id_user && (
              <div>
                <button onClick={() => setIsUpdated(!isUpdated)}>
                  Modifer le texte
                </button>
                <button
                  onClick={() => {
                    if (
                      window.confirm("Voulez-vous vraiment supprimer ce post ?")
                    ) {
                      deleteThisPost();
                    }
                  }}
                >
                  Supprimer le post
                </button>
              </div>
            )}
          </>
          // <>
          //   <p onClick={() => setUpdateFormName(!updateFormName)}>
          //     {userData.user_name}
          //   </p>
          //   <button onClick={() => setUpdateFormName(!updateFormName)}>
          //     Modifier le nom
          //   </button>
          // </>
        )}
        {isUpdated && (
          <>
            <textarea
              defaultValue={post.post_content}
              onChange={(e) => setTextUpdate(e.target.value)}
            />
            <button onClick={updateItem}>Valider modification</button>
            {userData.id_user === post.id_user && (
              <button onClick={() => setIsUpdated(!isUpdated)}>Annuler</button>
            )}
          </>
        )}
        {post.post_image && <img src={post.post_image} alt="post-pic" />}
      </div>
    </div>
  );
};

export default PostCard;
