import React from "react";
import { Provider } from "react-redux";
import { createHistory, LocationProvider, Router } from "@reach/router";
import store from "./store";
import { Login, Signup } from "./components/AuthForm";

const history = createHistory(window);

const App = () => {
  return (
    <Provider store={store}>
      <LocationProvider history={history}>
        <Router>
          <Login path="/" />
          <Signup path="signup" />
        </Router>
      </LocationProvider>
    </Provider>
  );
};
export default App;
