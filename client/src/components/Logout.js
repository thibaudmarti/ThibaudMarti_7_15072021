import React from "react";
import axios from "axios";
import cookie from "js-cookie";

const Logout = () => {
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const logout = async () => {
    if (window.confirm("Souhaitez vous vous déconnecter ?")) {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/auth/logout`,
        withCredentials: true,
      })
        .then(() => removeCookie("jwt"))
        .catch((err) => console.log(err));

      window.location = "/connexion";
    }
  };

  return (
    <div onClick={logout} className="logout">
      <button>
        <p>Déconnexion</p>
        <img src="./img/icons/logout.svg" alt="logout" />
      </button>
    </div>
  );
};

export default Logout;
