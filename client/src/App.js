// import React, { createContext } from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Connection from "./pages/Connection";
// import Forum from "./pages/Forum";
// import Home from "./pages/Home";
// import Profil from "./pages/Profil";
// import { CreateStore } from "redux";

// function App() {
//   const context = createContext();

//   return (
//     // <context.Provider value={""}>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/connexion" element={<Connection />} />
//         <Route path="/profil" element={<Profil />} />
//         <Route path="/forum" element={<Forum />} />
//         <Route path="*" element={<Home />} />
//       </Routes>
//     </BrowserRouter>
//     // </context.Provider>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import Routes from "./components/Routes";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";

const App = () => {
  const [uid, setUid] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          console.log(res.data);
          setUid(res.data);
        })
        .catch((err) => console.log("No token"));
    };
    fetchToken();
    console.log(uid);
    if (uid) dispatch(getUser(uid.id_user));
  }, [uid, dispatch]); //uid, dispatch

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
