import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../store/user";

const Portfolio = props => {
  return (
    <button type="button" onClick={() => props.logout()}>
      Hello!
    </button>
  );
};

const mapStateToProps = () => {};

const mapDispatchToProps = dispatch => {
  return {
    logout() {
      dispatch(logout());
    }
  };
};

Portfolio.propTypes = {
  logout: PropTypes.func.isRequired
};
export default connect(null, mapDispatchToProps)(Portfolio);
