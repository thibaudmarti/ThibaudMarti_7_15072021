import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Connection from "./pages/Connection";
import Forum from "./pages/Forum";
import Home from "./pages/Home";
import Profil from "./pages/Profil";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connexion" element={<Connection />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
