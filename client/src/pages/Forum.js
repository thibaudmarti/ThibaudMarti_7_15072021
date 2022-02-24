import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getForums } from "../actions/forum.action";
import { isEmpty } from "../components/Utils";

const Forum = () => {
  const [loadingForum, setLoadingForum] = useState(true);
  const dispatch = useDispatch();
  const forums = useSelector((state) => state.forumReducer);
  // console.log(forums);

  useEffect(() => {
    if (loadingForum) {
      dispatch(getForums());
      setLoadingForum(false);
    }
  }, [loadingForum, dispatch]);

  return (
    <div className="forum">
      {!isEmpty(forums) &&
        forums.map((forum, index) => {
          return (
            <div key={forum.id}>
              {forum.name}, {forum.job}, {forum.email}
            </div>
          );
        })}
    </div>
  );
};

export default Forum;
