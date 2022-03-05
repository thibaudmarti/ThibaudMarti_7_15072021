import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteComment } from "../../actions/comment.actions";

const CommentCard = ({ comment, post }) => {
  // const userData = useSelector((state) => state.userReducer);
  // const dispatch = useDispatch();

  return (
    <div>
      {comment.comment_content}, {comment.comment_author},{post.id_post},{" "}
      {post.post_author}
    </div>
  );
};

export default CommentCard;
