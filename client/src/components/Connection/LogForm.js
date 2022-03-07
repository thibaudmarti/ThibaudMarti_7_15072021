import React, { useState } from "react";
import axios from "axios";

const LogForm = () => {
  const [user_email, setEmail] = useState("");
  const [user_password, setPassword] = useState("");
  const validationError = document.querySelector(".validation.error");

  const handleLogin = (e) => {
    e.preventDefault();

    if (user_email && user_password) {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/auth/login`,
        data: {
          user_email,
          user_password,
        },
        withCredentials: true,
      })
        .then((res) => {
          if (res.data.message) {
            if (res.data.message.includes("email")) {
              validationError.innerHTML = res.data.message;
            }
          } else {
            validationError.innerHTML = "";
            window.location = "/";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      validationError.innerHTML =
        "Merci d'entrer votre email et votre mot de passe !";
    }
  };
  return (
    <form action="" onSubmit={handleLogin} id="login-form">
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={user_email}
      />
      <div className="email error"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={user_password}
      />
      <div className="password error"></div>
      <br />
      <input type="submit" value="Se connecter" />
      <div className="validation error"></div>
    </form>
  );
};

export default LogForm;
