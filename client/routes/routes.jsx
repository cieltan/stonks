import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Router } from "@reach/router";
import { Login, Signup } from "../components/AuthForm";
import Portfolio from "../components/Portfolio";
import ProtectedRoute from "./protectedroute";
import { me } from "../store";

class Routes extends Component {
  componentDidMount() {
    const { loadInitialData } = this.props;
    loadInitialData();
  }

  render() {
    return (
      <Router>
        <Signup path="/signup" />
        <Login path="/login" />
        <ProtectedRoute as={Portfolio} path="/" />
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);

Routes.propTypes = {
  isLoggedIn: PropTypes.bool,
  loadInitialData: PropTypes.func.isRequired
};

Routes.defaultProps = {
  isLoggedIn: false
};
