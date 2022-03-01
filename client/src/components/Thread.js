import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.actions";
import PostCard from "./Post/PostCard";
import { isEmpty } from "./Utils";

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);

  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts());
      setLoadPost(false);
    }
  }, [loadPost, dispatch]);

  return (
    <div className="post-container">
      <ul>
        {!isEmpty(posts[0]) &&
          posts.map((post) => {
            return <PostCard post={post} key={post.id_post} />;
          })}
      </ul>
    </div>
  );
};

export default Thread;
