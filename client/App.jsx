import React from "react";
import { Provider } from "react-redux";
import {
  CssBaseline,
  Container,
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { LocationProvider } from "@reach/router";
import store from "./store";
import { history } from "./history";
import Routes from "./routes/Routes";

const styles = () => ({
  main: {
    height: "100vh"
  }
});

const App = props => {
  const { classes } = props;
  return (
    <Container maxWidth="xl" className={classes.main}>
      <CssBaseline />
      <Provider store={store}>
        <LocationProvider history={history}>
          <Routes />
        </LocationProvider>
      </Provider>
    </Container>
  );
};

export default withStyles(styles)(App);

/**
 * PROP TYPES
 */
App.propTypes = {
  classes: PropTypes.shape({
    main: PropTypes.string
  }).isRequired
};
