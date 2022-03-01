import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import PostContainer from "../components/Post/PostContainer";
import Thread from "../components/Thread";
import Trending from "../components/Trending";

const Home = () => {
  const uid = useContext(UidContext);
  return (
    <div className="home">
      {uid ? (
        <>
          <PostContainer />
          <Trending />
          <Thread />
        </>
      ) : (
        <h1>Vous n'êtes pas connecté !</h1>
      )}
    </div>
  );
};

export default Home;
