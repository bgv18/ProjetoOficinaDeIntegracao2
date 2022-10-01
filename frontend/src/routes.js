import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../src/store";
import Auth from "./components/auth";
import Cadastrar from "./pages/Cadastrar";
import DashboardHome from "./pages/DashboardHome";
// import Livros from "./view/livros";
import HomePage from "./pages/Home";
import Login from "./pages/Login";

function Routes() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/cadastrar" component={Cadastrar} />
          <Route
            exact
            path="/home"
            component={() => (
              <Auth component={DashboardHome} redirect={Login} />
            )}
          />
        </Router>
      </PersistGate>
    </Provider>
  );
}
export default Routes;
