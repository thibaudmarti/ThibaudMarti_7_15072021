import React, { createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Connection from "./pages/Connection";
import Forum from "./pages/Forum";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import { CreateStore } from "redux";

function App() {
  const context = createContext();

  return (
    // <context.Provider value={""}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connexion" element={<Connection />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
    // </context.Provider>
  );
}

export default App;
