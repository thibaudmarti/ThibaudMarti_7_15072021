import React from "react";
import PostContainer from "../components/PostContainer";
import Trending from "../components/Trending";

const Home = () => {
  return (
    <div className="home">
      Page Home
      <PostContainer />
      <Trending />
    </div>
  );
};

export default Home;
