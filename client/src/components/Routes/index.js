import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import Connection from "../../pages/Connection";
import Navbar from "../Navbar";

const index = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connexion" element={<Connection />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
};

export default index;
