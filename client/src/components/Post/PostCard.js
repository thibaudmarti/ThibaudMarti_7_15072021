import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, updatePost } from "../../actions/post.actions";
import { getComments } from "../../actions/comment.actions";
import CommentContainer from "./CommentContainer";
import LikeInput from "./LikeInput";

const PostCard = ({ post }) => {
  const userData = useSelector((state) => state.userReducer);

  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [openComment, setOpenComment] = useState(false);

  const dispatch = useDispatch();

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(textUpdate, post.id_post));
    }
    setIsUpdated(false);
  };

  const getcom = async () => {
    await dispatch(getComments(post.id_post));
  };

  const deleteThisPost = () => {
    dispatch(deletePost(post.id_post));
  };

  return (
    <div className="post-card" key={post.id_post}>
      <div className="top-part">
        <div className="user-part">
          <div className="user-pic">
            {post.user_picture ? (
              <img src={post.user_picture} alt="profil-pic" />
            ) : (
              <img src="./img/default.png" alt="profil-pic" />
            )}
          </div>
          <h3>{post.user_name}</h3>
        </div>
        <div className="like-part">
          <LikeInput post={post} key={post.id_post} />
        </div>
      </div>
      <div className="content-part">
        {isUpdated === false && (
          <>
            <div className="content-text">
              {post.post_content && <p>{post.post_content}</p>}
              {post.post_content && userData.id_user === post.id_user && (
                <button onClick={() => setIsUpdated(!isUpdated)}>
                  Modifer le texte
                </button>
              )}
            </div>
            {post.post_image && (
              <div className="post-pic">
                <img src={post.post_image} alt="post-pic" />
              </div>
            )}
            {post.post_video && (
              <div className="post-video">
                <iframe
                  src={post.post_video}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={post.id_post}
                ></iframe>
              </div>
            )}
            {userData.id_user === post.id_user && (
              <div className="delete-btn">
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
            {userData.user_admin === 1 && (
              <div>
                <button
                  onClick={() => {
                    if (
                      window.confirm("Voulez-vous vraiment supprimer ce post ?")
                    ) {
                      deleteThisPost();
                    }
                  }}
                >
                  Supprimer ce post
                </button>
              </div>
            )}
          </>
        )}
        {isUpdated && (
          <>
            <div className="textarea-container-update">
              <textarea
                defaultValue={post.post_content}
                onChange={(e) => setTextUpdate(e.target.value)}
              />
            </div>
            <button onClick={updateItem}>Valider modification</button>
            {userData.id_user === post.id_user && (
              <button onClick={() => setIsUpdated(!isUpdated)}>Annuler</button>
            )}
            {post.post_image && (
              <div className="post-pic">
                <img src={post.post_image} alt="post-pic" />
              </div>
            )}
            {post.post_video && (
              <div className="post-video">
                <iframe
                  src={post.post_video}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={post.id_post}
                ></iframe>
              </div>
            )}
          </>
        )}
      </div>
      <div className="comment-part">
        <button
          onClick={() => {
            setOpenComment(!openComment);
            getcom();
          }}
        >
          Voir les commentaires
        </button>

        {openComment && <CommentContainer post={post} />}
      </div>
    </div>
  );
};

export default PostCard;
