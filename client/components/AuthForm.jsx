import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Button, Card, Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import { Link, Redirect } from "@reach/router";
import { auth } from "../store";

/**
 * STYLES
 */
const styles = () => ({
  "auth-container": {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  "auth-form": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  "auth-form__input": {
    margin: "10px"
  },
  "auth-form__sheet": {
    display: "flex",
    flexDirection: "column"
  }
});

/**
 * COMPONENT
 */
const AuthForm = props => {
  const { classes, isLoggedIn, name, displayName, handleSubmit, error } = props;
  if (isLoggedIn) return <Redirect to="/" noThrow />;
  return (
    <Grid className={classes["auth-container"]}>
      <Card className={classes["auth-form"]}>
        <form
          className={classes["auth-form__sheet"]}
          onSubmit={handleSubmit}
          name={name}
        >
          {name === "signup" && (
            <>
              <TextField
                id="firstName"
                label="First Name"
                className={classes["auth-form__input"]}
                required
              />
              <TextField
                id="lastName"
                label="Last Name"
                className={classes["auth-form__input"]}
                required
              />
            </>
          )}
          <TextField
            id="email"
            label="Email"
            className={classes["auth-form__input"]}
            required
          />
          <TextField
            className={classes["auth-form__input"]}
            id="password"
            label="Password"
            required
          />
          <Button type="submit" variant="contained" color="primary">
            {displayName}
          </Button>
          {error && error.response && <div>{error.response.data}</div>}
        </form>
        <Link to={name === "login" ? "/signup" : "/login"}>
          {name === "login" ? "Sign Up" : "Already a user? Log in."}
        </Link>
      </Card>
    </Grid>
  );
};

const mapLogin = state => {
  return {
    name: "login",
    displayName: "Login",
    error: state.user.error,
    isLoggedIn: !!state.user.id
  };
};

const mapSignup = state => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.user.error,
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      if (ownProps.path === "/signup") {
        const firstName = evt.target.firstName.value;
        const lastName = evt.target.lastName.value;
        dispatch(auth(email, password, formName, firstName, lastName));
      } else {
        dispatch(auth(email, password, formName));
      }
    }
  };
};

export const Login = connect(
  mapLogin,
  mapDispatch
)(withStyles(styles)(AuthForm));
export const Signup = connect(
  mapSignup,
  mapDispatch
)(withStyles(styles)(AuthForm));

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  classes: PropTypes.shape({
    "auth-container": PropTypes.string,
    "auth-form__input": PropTypes.string,
    "auth-form__sheet": PropTypes.string,
    "auth-form": PropTypes.string
  }).isRequired,
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.shape({ response: PropTypes.object }),
  isLoggedIn: PropTypes.bool.isRequired
};

AuthForm.defaultProps = {
  error: null
};
