import React from "react";
import Log from "../components/Log";

const Connection = () => {
  return (
    <div className="connection-page">
      <div className="log-container">
        <Log />
        <div className="img-container">
          <img src="./img/log.png" alt="img-log" />
        </div>
      </div>
    </div>
  );
};

export default Connection;
