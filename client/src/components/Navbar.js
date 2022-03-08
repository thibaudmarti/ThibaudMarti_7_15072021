import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Logout";

const Navbar = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  return (
    <nav>
      <div className="nav-container">
        <div className="logo-container">
          <NavLink to="/">
            <div className="logo">
              <img src="./img/icon.png" alt="logo icon" />
              <h3>Groupomania</h3>
            </div>
          </NavLink>
        </div>

        {uid ? (
          <div className="profil-detail">
            <NavLink to="/profil">
              <div className="welcome">
                {userData.user_picture ? (
                  <img src={userData.user_picture} alt="profil-pic" />
                ) : (
                  <img src="./img/default.png" alt="profil-pic" />
                )}

                <h5>{userData.user_name}</h5>
              </div>
            </NavLink>
            <Logout />
          </div>
        ) : (
          <NavLink to="/connexion">
            <div className="connection-require">
              Veuillez vous connecter :
              <img src="./img/icons/login.svg" alt="login" />
            </div>
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
