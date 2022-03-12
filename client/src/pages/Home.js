import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import PostContainer from "../components/Post/PostContainer";
import Thread from "../components/Thread";

const Home = () => {
  const uid = useContext(UidContext);
  return (
    <div className="home">
      <div className="home__color">
        {uid ? (
          <>
            <PostContainer />
            <Thread />
          </>
        ) : (
          <h2>Vous n'êtes pas connecté !</h2>
        )}
      </div>
    </div>
  );
};

export default Home;
