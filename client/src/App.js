import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import actu from "./page/actu";
import connexion from "./page/connexion";
import profil from "./page/profil";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={actu} />
        <Route path="/profil" exact component={profil} />
        <Redirect to="/connexion" component={connexion} />
      </Switch>
    </Router>
  );
}

export default App;
