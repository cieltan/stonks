import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "@reach/router";

/**
 * COMPONENT
 */
const ProtectedRoute = ({ isLoggedIn, as: Comp }) => {
  return isLoggedIn ? <Comp /> : <Redirect to="/login" noThrow />;
};

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

export default connect(mapStateToProps, null)(ProtectedRoute);

/**
 * PROP TYPES
 */
ProtectedRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  as: PropTypes.elementType.isRequired
};
