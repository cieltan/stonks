import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "@reach/router";
import { logoutThunk } from "../store/user";

const Navbar = props => {
  const { logout } = props;
  return (
    <nav>
      <Link to="/transactions">Transactions</Link>
      <Link to="/">Portfolio</Link>
      <Link to="/login " onClick={logout}>
        Logout
      </Link>
    </nav>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    logout() {
      dispatch(logoutThunk());
    }
  };
};

export default connect(null, mapDispatchToProps)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  logout: PropTypes.func.isRequired
};
