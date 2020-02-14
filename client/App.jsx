import React from "react";
import { Provider } from "react-redux";
import { CssBaseline, Container } from "@material-ui/core";
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles
} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { LocationProvider } from "@reach/router";
import store from "./store";
import { history } from "./history";
import Routes from "./routes/Routes";

const theme = createMuiTheme({});

const styles = () => ({
  main: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

const App = props => {
  const { classes } = props;
  return (
    <Container class={classes.main}>
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <CssBaseline />
          <LocationProvider history={history}>
            <Routes />
          </LocationProvider>
        </Provider>
      </MuiThemeProvider>
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
