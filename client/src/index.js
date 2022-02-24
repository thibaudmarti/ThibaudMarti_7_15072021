// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// import "./styles/index.scss";

// import { Provider } from "react-redux";
// import store from "./store";

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById("root")
// );

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.scss";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter } from "react-router-dom";
// import { applyMiddleware, createStore } from "redux";
// import thunk from "redux-thunk";
// import rootReducer from "./reducers";
// import { getUsers } from "./actions/users.actions";
// // // dev tools
// import { composeWithDevTools } from "redux-devtools-extension";
// import { getPosts } from "./actions/post.actions";

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );

// store.dispatch(getUsers());
// store.dispatch(getPosts());

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,

  document.getElementById("root")
);
