import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getForums } from "../actions/forum.action";
import { isEmpty } from "./Utils";

const PostCard = () => {
  const [loadingForum, setLoadingForum] = useState(true);
  const dispatch = useDispatch();
  const forums = useSelector((state) => state.forumReducer);
  // console.log(forums);

  useEffect(() => {
    if (loadingForum) {
      // dispatch(getForums());
      setLoadingForum(false);
    }
  }, [loadingForum, dispatch]);

  return (
    <div className="post-card">
      {!isEmpty(forums) &&
        forums.map((forum, index) => {
          return (
            <div key={forum.id} className="name">
              {forum.name}
              <div className="text">{forum.text}</div>
            </div>
          );
        })}
    </div>
  );
};

export default PostCard;
