import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Adminlayout } from "./layout/Admin";
// core components
import Admin from "./layouts/Admin";
import AdminX from "./layouts/AdminX";
import RTL from "./layouts/RTL";
import LoginX from "./components/LoginX/LoginX";
import "./assets/css/material-dashboard-react.css?v=1.6.0";
import { StoreProvider } from "./hooksTore/store";
import authStore from "./stores/authStore";
import postsStore from "./stores/postsStore";
import { useStoreAsyncVersion } from "./stores/store";

authStore();
postsStore();
const hist = createBrowserHistory();

ReactDOM.render(
  // tslint:disable-next-line: jsx-wrap-multiline
  <Router history={hist}>
    <Switch>
      {/* <Route path="/admin" component={Admin} />
      <Route path="/rtl" component={RTL} />
      <Redirect from="/" to="/admin/dashboard" /> */}
      <Route path="/adminx" component={AdminX} />
      <Route path="/loginx" component={LoginX} />
      <Redirect from="/" to="/adminx/dashboardx" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
