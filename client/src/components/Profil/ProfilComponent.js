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
  const nameValidation = document.querySelector(".namevalidation.error");
  const jobValidation = document.querySelector(".jobvalidation.error");
  let alphaRegex = /^[\sa-z/-]{1,}$/i;

  const dispatch = useDispatch();

  const handleUpdateName = () => {
    if (name) {
      if (alphaRegex.test(name) === true) {
        dispatch(updateName(userData.id_user, name));
        nameValidation.innerHTML = "";
        setUpdateFormName(false);
      } else {
        nameValidation.innerHTML =
          "Merci d'entrer un prénom valide (lettres et - uniquement).";
      }
    } else {
      if (nameValidation) nameValidation.innerHTML = "Champ vide";
    }
  };

  const handleUpdateJob = () => {
    if (job) {
      if (alphaRegex.test(job) === true) {
        dispatch(updateJob(userData.id_user, job));
        jobValidation.innerHTML = "";
        setUpdateFormJob(false);
      } else {
        jobValidation.innerHTML =
          "Merci d'entrer un poste valide (lettres et - uniquement).";
      }
    } else {
      if (jobValidation) jobValidation.innerHTML = "Champ vide";
    }
  };

  const handleDeleteUser = () => {
    if (window.confirm("Souhaitez vous supprimer votre compte ?")) {
      dispatch(deleteUser(userData.id_user));
      window.location.reload();
    }
  };

  return (
    <div className="profil-container">
      <h1>{userData.user_name}</h1>
      <div className="content-container">
        <div className="image-container">
          <h3>Photo de profil :</h3>
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
                <div className="namevalidation error"></div>
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
                <div className="jobvalidation error"></div>
              </>
            )}
          </div>
        </div>
        {userData.user_admin === 0 && (
          <div className="delete-container">
            <h3>Supprimer le compte ?</h3>
            <button onClick={handleDeleteUser}>Supprimer</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilComponent;
