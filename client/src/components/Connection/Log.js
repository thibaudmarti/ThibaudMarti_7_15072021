import React, { useState } from "react";
import LogForm from "./LogForm";
import SignForm from "./SignForm";

const Log = () => {
  const [signFormModal, setSignFormModal] = useState(true);
  const [logFormModal, setLogFormModal] = useState(false);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setLogFormModal(false);
      setSignFormModal(true);
    } else if (e.target.id === "login") {
      setSignFormModal(false);
      setLogFormModal(true);
    }
  };

  return (
    <div className="connection-form">
      <div className="form-container">
        <div className="btn-container">
          <button
            onClick={handleModals}
            id="register"
            className={signFormModal ? "active-btn" : null}
          >
            S'inscrire
          </button>
          <button
            onClick={handleModals}
            id="login"
            className={logFormModal ? "active-btn" : null}
          >
            Se connecter
          </button>
        </div>
        {signFormModal && <SignForm />}
        {logFormModal && <LogForm />}
      </div>
    </div>
  );
};

export default Log;
