import React, { useContext } from "react";
import Log from "../components/Connection/Log";
import { UidContext } from "../components/AppContext";

const Connection = () => {
  const uid = useContext(UidContext);

  return (
    <div className="connection-page">
      {uid ? (
        <div>
          <h1>Vous êtes connecté !</h1>
          <div>Souhaitez vous être deconnecté ?</div>
        </div>
      ) : (
        <div className="log-container">
          <Log />
          <div className="img-container">
            <img src="./img/log.png" alt="img-log" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Connection;
