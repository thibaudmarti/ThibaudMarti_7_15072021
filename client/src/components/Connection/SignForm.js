import React, { useEffect, useState } from "react";
import axios from "axios";

const SignForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [user_name, setName] = useState("");
  const [user_job, setJob] = useState("");
  const [user_email, setEmail] = useState("");
  const [user_password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");
  const [validation, setFormValidation] = useState(false);

  useEffect(() => {
    let passwordRegex =
      /^(?=.*?[a-z])(?=(.*[A-Z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
    let alphaRegex = /^[\sa-z/-]{1,}$/i;
    let emailRegex = /^[\w_.-]+@[\w-_.]+\.[\w.]{2,}$/i;
    const emailError = document.querySelector(".email.error");
    const nameError = document.querySelector(".name.error");
    const jobError = document.querySelector(".job.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );
    const formValidation = async () => {
      if (
        alphaRegex.test(user_name) === true &&
        alphaRegex.test(user_job) === true &&
        emailRegex.test(user_email) === true &&
        passwordRegex.test(user_password) === true &&
        controlPassword === user_password
      ) {
        setFormValidation(true);
      } else {
        setFormValidation(false);
      }
    };

    if (user_password) {
      if (passwordRegex.test(user_password)) {
        passwordError.innerHTML = "";
      } else {
        passwordError.innerHTML =
          "Merci d'entrer un mot de passe valide avec une majuscule, un chiffre, un caractère spécial et de minimum 8 caractères";
      }
    }
    if (user_email) {
      if (emailRegex.test(user_email)) {
        emailError.innerHTML = "";
      } else {
        emailError.innerHTML =
          "Merci d'entrer un e-mail valide, ex: email@valide.com.";
      }
    }

    if (user_name) {
      if (alphaRegex.test(user_name)) {
        nameError.innerHTML = "";
      } else {
        nameError.innerHTML =
          "Merci d'entrer un prénom valide, ex: Martin (lettres et - uniquement).";
      }
    }
    if (user_job) {
      if (alphaRegex.test(user_job)) {
        jobError.innerHTML = "";
      } else {
        jobError.innerHTML =
          "Merci d'entrer un poste valide (lettres et - uniquement)";
      }
    }

    if (user_password !== controlPassword) {
      passwordConfirmError.innerHTML =
        "Les mots de passe ne correspondent pas.";
    } else {
      passwordConfirmError.innerHTML = "";
    }

    formValidation();
  }, [
    user_email,
    user_name,
    user_password,
    user_job,
    controlPassword,
    validation,
  ]);

  const handleRegister = async (e) => {
    const errorValidation = document.querySelector(".error-validation.error");
    e.preventDefault();

    if (validation) {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/auth/signup`,
        data: {
          user_name,
          user_job,
          user_email,
          user_password,
        },
      })
        .then((res) => {
          if (res.data.message.includes("Email")) {
            errorValidation.innerHTML = res.data.message;
          } else {
            errorValidation.innerHTML = "";
            setFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
    } else {
      errorValidation.innerHTML =
        "Tout les champs ne sont pas correctement rempli !";
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <span></span>
          <h4 className="success">
            Inscription réussie, veuillez vous connecter
          </h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="name">Nom</label>
          <br />
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={user_name}
          />
          <div className="name error"></div>
          <br />
          <label htmlFor="job">Poste</label>
          <br />
          <input
            type="text"
            name="job"
            id="job"
            onChange={(e) => setJob(e.target.value)}
            value={user_job}
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
          <div className="error-validation error"></div>
        </form>
      )}
    </>
  );
};

export default SignForm;
