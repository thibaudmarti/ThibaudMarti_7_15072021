import React from "react";

const PostCard = ({ post }) => {
  // useEffect(() => {
  //   console.log(post);
  // }, []);

  return (
    <div className="post-card" key={post.id_post}>
      <div className="top-part">
        <div className="user-part">
          <div className="user-pic">
            <img src={post.user_picture} alt="user-pic" />
          </div>
          <h2>{post.user_name}</h2>
        </div>
        <div className="anim_heart">
          <input type="checkbox" />
          <i className="far fa-heart"></i>
          <i className="fas fa-heart"></i>
        </div>
      </div>
      <div className="content-part">
        <p>{post.post_content}</p>
      </div>
    </div>
  );
};

export default PostCard;
