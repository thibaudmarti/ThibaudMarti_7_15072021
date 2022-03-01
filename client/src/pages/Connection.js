import React, { useContext } from "react";
import Log from "../components/Connection/Log";
import Logout from "../components/Logout";
import { UidContext } from "../components/AppContext";

const Connection = () => {
  const uid = useContext(UidContext);

  return (
    <div className="connection-page">
      {uid ? (
        <div className="connected">
          <h1>Vous êtes connecté !</h1>
          <div className="deconnect">Souhaitez vous être deconnecté ?</div>
          <Logout />
        </div>
      ) : (
        <div className="log-container">
          <Log />
        </div>
      )}
    </div>
  );
};

export default Connection;
