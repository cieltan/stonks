import React from "react";
import { Provider } from "react-redux";
import { LocationProvider, Router } from "@reach/router";
import store from "./store";
import { history } from "./history";

import Routes from "./routes/routes";

const App = () => {
  return (
    <Provider store={store}>
      <LocationProvider history={history}>
        <Routes />
      </LocationProvider>
    </Provider>
  );
};
export default App;
