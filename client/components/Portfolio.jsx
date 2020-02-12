import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "@reach/router";
import { logoutThunk } from "../store/user";

const Portfolio = props => {
  const { logout } = props;
  return (
    <div>
      <nav>
        <Link to="/transactions">Transactions</Link>
        <Link to="/login " onClick={logout}>
          Logout
        </Link>
      </nav>
    </div>
  );
};

const mapStateToProps = () => {};

const mapDispatchToProps = dispatch => {
  return {
    logout() {
      dispatch(logoutThunk());
    }
  };
};

export default connect(null, mapDispatchToProps)(Portfolio);

/**
 * PROP TYPES
 */
Portfolio.propTypes = {
  logout: PropTypes.func.isRequired
};
