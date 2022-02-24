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
        <div className="logo">
          <NavLink to="/">
            <div className="logo">
              <img src="./img/icon.png" alt="logo icon" />
              <h3>Groupomania</h3>
            </div>
          </NavLink>
        </div>
        <div>
          <NavLink to="/profil">
            <h5>Profil</h5>
          </NavLink>
        </div>
        <div>
          <NavLink to="/forum">
            <h5>Forum</h5>
          </NavLink>
        </div>

        {uid ? (
          <ul>
            <li></li>
            <li className="welcome">
              <NavLink to="/profil">
                <h5>Bienvenue {userData.user_name}</h5>
              </NavLink>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
              <NavLink to="/connexion">
                <img src="./img/icons/login.svg" alt="logout" />
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
