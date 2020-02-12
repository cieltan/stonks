import React from "react";
import { Provider } from "react-redux";
import { LocationProvider, Router } from "@reach/router";
import store from "./store";
import { history } from "./history";
import { Login, Signup } from "./components/AuthForm";
import ProtectedRoute from "./routes";
import Portfolio from "./components/Portfolio";

const App = () => {
  return (
    <Provider store={store}>
      <LocationProvider history={history}>
        <Router>
          <Signup path="/signup" />
          <Login path="/login" />
          <ProtectedRoute as={Portfolio} path="/" />
        </Router>
      </LocationProvider>
    </Provider>
  );
};
export default App;
