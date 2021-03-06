import React from "react";
import { Provider } from "react-redux";
import { CssBaseline, Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { LocationProvider } from "@reach/router";
import store from "./store";
import { history } from "./history";
import Routes from "./routes/routes";

const styles = () => ({
  main: {
    height: "100vh"
  },
  "@global": {
    html: {
      postion: "relative",
      minHeight: "100%",
      overflow: "hidden"
    },
    body: {
      height: "100%",
      backgroundImage: "url('./background.jpg')",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      backgroundSize: "cover",
      overflow: "auto"
    }
  }
});

/**
 * COMPONENT
 */
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
