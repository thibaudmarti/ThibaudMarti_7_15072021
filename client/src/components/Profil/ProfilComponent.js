import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, updateJob, updateName } from "../../actions/user.actions";
import UploadImg from "./UploadImg";

const ProfilComponent = () => {
  const userData = useSelector((state) => state.userReducer);
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [updateFormName, setUpdateFormName] = useState(false);
  const [updateFormJob, setUpdateFormJob] = useState(false);

  const dispatch = useDispatch();

  const handleUpdateName = () => {
    dispatch(updateName(userData.id_user, name));
    setUpdateFormName(false);
  };

  const handleUpdateJob = () => {
    dispatch(updateJob(userData.id_user, job));
    setUpdateFormJob(false);
  };

  const handleDeleteUser = () => {
    if (window.confirm("Souhaitez vous supprimer votre compte ?")) {
      dispatch(deleteUser(userData.id_user));
      window.location.reload();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="profil-container">
      <h1>Profil de {userData.user_name}</h1>
      <div className="content-container">
        <div className="image-container">
          <h3>Photo de profil</h3>
          {userData.user_picture ? (
            <img src={userData.user_picture} alt="profil-pic" />
          ) : (
            <img src="./img/default.png" alt="default-profil-pic" />
          )}

          <UploadImg />
        </div>
        <div className="modify-container">
          <div className="modify-name">
            <h3>Nom :</h3>
            {updateFormName === false && (
              <>
                <p onClick={() => setUpdateFormName(!updateFormName)}>
                  {userData.user_name}
                </p>
                <button onClick={() => setUpdateFormName(!updateFormName)}>
                  Modifier le nom
                </button>
              </>
            )}
            {updateFormName && (
              <>
                <input
                  type="text"
                  defaultValue={userData.user_name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
                <button onClick={handleUpdateName}>
                  Valider modifications
                </button>
              </>
            )}
          </div>
          <div className="modify-job">
            <h3>Poste :</h3>
            {updateFormJob === false && (
              <>
                <p onClick={() => setUpdateFormJob(!updateFormJob)}>
                  {userData.user_job}
                </p>
                <button onClick={() => setUpdateFormJob(!updateFormJob)}>
                  Modifier le poste
                </button>
              </>
            )}
            {updateFormJob && (
              <>
                <input
                  type="text"
                  defaultValue={userData.user_job}
                  onChange={(e) => setJob(e.target.value)}
                ></input>
                <button onClick={handleUpdateJob}>Valider modifications</button>
              </>
            )}
          </div>
        </div>
        <div className="delete-container">
          <h3>Supprimer le compte ?</h3>
          <button onClick={handleDeleteUser}>Supprimer</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilComponent;
