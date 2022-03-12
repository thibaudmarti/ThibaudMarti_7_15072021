import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  deleteComment,
  getComments,
} from "../../actions/comment.actions";
import CommentCard from "./CommentCard";

const CommentContainer = ({ post }) => {
  const comments = useSelector((state) => state.commentReducer);
  const userData = useSelector((state) => state.userReducer);
  const [text, setText] = useState("");
  const [comment, setComment] = useState(false);
  const dispatch = useDispatch();

  const deleteThisCom = async (id_comment) => {
    await dispatch(deleteComment(id_comment));
    dispatch(getComments(post.id_post));
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (text) {
      await dispatch(
        addComment(post.id_post, {
          comment_author: userData.id_user,
          comment_content: text,
        })
      );
      dispatch(getComments(post.id_post));
      setText("");
    }
  };

  useEffect(() => {
    if (comments[0]) {
      if (comments[0].comment_post === post.id_post) {
        setComment(true);
      } else {
        setComment(false);
      }
    }
  }, [comments, dispatch, post.id_post]);

  return (
    <div>
      {comment &&
        comments.map((comment) => {
          return (
            <div key={comment.id_comment} className="comment-container">
              <CommentCard comment={comment} post={post} />
              {userData.id_user === comment.comment_author && (
                <div className="btn-delete">
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Voulez-vous vraiment supprimer votre commentaire ?"
                        )
                      ) {
                        deleteThisCom(comment.id_comment);
                      }
                    }}
                  >
                    Supprimer le commentaire
                  </button>
                </div>
              )}
              {userData.user_admin === 1 && (
                <div>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Voulez-vous vraiment supprimer ce commentaire ?"
                        )
                      ) {
                        deleteThisCom(comment.id_comment);
                      }
                    }}
                  >
                    Supprimer ce commentaire
                  </button>
                </div>
              )}
            </div>
          );
        })}

      <form action="" onSubmit={handleComment} className="comment-form">
        <label htmlFor="comment">Écrivez votre commentaire ici</label>
        <input
          type="text"
          name="text"
          id="comment"
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Laisser un commentaire"
        />
        <br />
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
};

export default CommentContainer;
