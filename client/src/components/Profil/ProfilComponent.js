import React from "react";
import { useSelector } from "react-redux";
import UploadImg from "./UploadImg";

const ProfilComponent = () => {
  const userData = useSelector((state) => state.userReducer);
  return (
    <div className="profil-container">
      <h1>Page de profil de {userData.user_name}</h1>
      <div className="content-container">
        <div className="image-container">
          <h3>Photo de profil</h3>
          <img src={userData.user_picture} alt="user-pic" />
          <UploadImg />
        </div>
      </div>
    </div>
  );
};

export default ProfilComponent;
