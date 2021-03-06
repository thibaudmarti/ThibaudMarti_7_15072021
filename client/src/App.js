import React, { useEffect, useState } from "react"; //, { useEffect, useState }
import Routes from "./components/Routes";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";

const App = () => {
  const [uid, setUid] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const adminInsertion = async () => {
      await axios.get(`${process.env.REACT_APP_API_URL}adminInsert`);
    };

    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          if (res.data) {
            setUid(res.data);
          } else {
            console.log("No token !");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchToken();
    adminInsertion();
    if (uid) dispatch(getUser(uid));
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
