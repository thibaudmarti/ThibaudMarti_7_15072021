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

  // const [noComment, setNoComment] = useState(false);
  // const [formComment, setFormComment] = useState(false);
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
    // dispatch(getComments(post.id_post));
    if (comments[0]) {
      if (comments[0].comment_post === post.id_post) {
        // console.log(comments[0].comment_post);
        setComment(true);
        // setFormComment(true);
        // setNoComment(false);
      } else {
        setComment(false);
        // setFormComment(false);
        // setNoComment(false);
      }
    } else {
      // setNoComment(true);
      // setFormComment(true);
    }
  }, [comments, dispatch, post.id_post]);

  return (
    <div>
      {comment &&
        comments.map((comment) => {
          return (
            <div key={comment.id_comment}>
              <div>{comment.id_comment}</div>
              <CommentCard comment={comment} post={post} />
              {userData.id_user === comment.comment_author && (
                <div>
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
                    Supprimer ce com
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
                    Supprimer ce com
                  </button>
                </div>
              )}
            </div>
          );
        })}
      {/* {noComment && <div>Pas de commentaire pour le moment !</div>} */}

      <form action="" onSubmit={handleComment} className="comment-form">
        <input
          type="text"
          name="text"
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
