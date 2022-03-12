import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import ProfilComponent from "../components/Profil/ProfilComponent";

const Profil = () => {
  const uid = useContext(UidContext);

  return (
    <div className="profil-page">
      {uid ? (
        <>
          <ProfilComponent />
        </>
      ) : (
        <h2>Vous n'êtes pas connecté !</h2>
      )}
    </div>
  );
};

export default Profil;
