import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "@reach/router";
import { logout } from "../store/user";

const Portfolio = props => {
  return (
    <div>
      <nav>
        <Link to="../transactions">Transactions</Link>
      </nav>
      <button type="button" onClick={() => props.logout()}>
        Hello!
      </button>
    </div>
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
