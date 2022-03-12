import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";

const UploadImg = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const fileValidation = document.querySelector(".filevalidation.error");

  const handlePicture = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("id_user", userData.id_user);
    data.append("profil_image", file);

    if (file) {
      if (
        file.type !== "image/jpg" &&
        file.type !== "image/png" &&
        file.type !== "image/jpeg"
      ) {
        fileValidation.innerHTML =
          "Format Invalide, format compatible : .jpg, .jpeg, ou .png";
      } else if (file.size > 3000000) {
        fileValidation.innerHTML =
          "Ficher trop volumineux, veuillez choisir un fichier d'une taille inférieure a 3 Mo";
      } else {
        dispatch(uploadPicture(data, userData.id_user));
        fileValidation.innerHTML = "";
      }
    } else {
      fileValidation.innerHTML = "Pas de fichier sélectionné !";
    }
  };

  return (
    <form action="" onSubmit={handlePicture} className="upload-pic">
      <div className="div-input">
        <label htmlFor="file">
          Mettre a jour sa photo de profil :
          <img src="./img/icons/picture.svg" alt="img" />
        </label>
        <input
          type="file"
          id="file"
          name="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      {file && <p>{file.name}</p>}
      <br />
      <input type="submit" value="Envoyer" />
      <div className="filevalidation error"></div>
    </form>
  );
};

export default UploadImg;
