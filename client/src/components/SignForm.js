import React, { useState } from "react";
// import axios from "axios";

const SignForm = () => {
  const [pseudo, setPseudo] = useState("");
  const [job, setJob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // const pseudoError = document.querySelector(".pseudo.error");
    // const emailError = document.querySelector(".email.error");
    // const jobError = document.querySelector(".job.error");
    // const passwordError = document.querySelector(".password.error");
    // const passwordConfirmError = document.querySelector(
    //   ".password-confirm.error"
    // );
  };

  return (
    <form action="" onSubmit={handleRegister} id="sign-up-form">
      <label htmlFor="name">Nom</label>
      <br />
      <input
        type="text"
        name="name"
        id="name"
        onChange={(e) => setPseudo(e.target.value)}
        value={pseudo}
      />
      <div className="pseudo error"></div>
      <br />
      <label htmlFor="job">Poste</label>
      <br />
      <input
        type="text"
        name="job"
        id="job"
        onChange={(e) => setJob(e.target.value)}
        value={job}
      />
      <div className="job error"></div>
      <br />
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
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
        value={password}
      />
      <div className="password error"></div>
      <br />
      <label htmlFor="password-conf">Confirmer mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password-conf"
        onChange={(e) => setControlPassword(e.target.value)}
        value={controlPassword}
      />
      <div className="password-confirm error"></div>
      <br />
      <input type="submit" value="Valider inscription" />
    </form>
  );
};

export default SignForm;
