import React from "react";

const CommentCard = ({ comment, post }) => {
  const altComProfilPic = comment.user_name + " profil-pic";
  return (
    <div className="comment-card">
      <div className="user-container">
        <div className="user-com">
          <div className="user-pic">
            {comment.user_picture ? (
              <img src={comment.user_picture} alt={altComProfilPic} />
            ) : (
              <img src="./img/default.png" alt="profil-pic" />
            )}
          </div>
          <h4>{comment.user_name}</h4>
        </div>
      </div>
      <div className="content-com">{comment.comment_content}</div>
    </div>
  );
};

export default CommentCard;
