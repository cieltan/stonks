import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import { auth } from "../store";

/**
 * COMPONENT
 */
const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          {name === "signup" && (
            <div className="form--signup-name">
              <label htmlFor="firstName">
                <p>First Name</p>
                <input name="firstName" type="text" />
              </label>
              <label htmlFor="lastName">
                <p>Last Name</p>
                <input name="lastName" type="text" />
              </label>
            </div>
          )}
          <label htmlFor="email">
            <p>Email</p>
            <input name="email" type="text" autoComplete="username" />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            <p>Password</p>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
            />
          </label>
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div>{error.response.data}</div>}
      </form>
      <Link to={name === "login" ? "/signup" : "/"}>
        {name === "login" ? "Sign Up" : "Login"}
      </Link>
    </div>
  );
};

const mapLogin = state => {
  return {
    name: "login",
    displayName: "Login",
    error: state.user.error
  };
};

const mapSignup = state => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.user.error
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      if (ownProps.path === "signup") {
        const firstName = evt.target.firstName.value;
        const lastName = evt.target.lastName.value;
        dispatch(auth(email, password, formName, firstName, lastName));
      } else {
        dispatch(auth(email, password, formName));
      }
    }
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.shape({ response: PropTypes.object })
};

AuthForm.defaultProps = {
  error: null
};
