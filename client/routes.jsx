import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "@reach/router";

import { me } from "./store";

class ProtectedRoute extends Component {
  componentDidMount() {
    const { loadInitialData } = this.props;
    loadInitialData();
  }

  render() {
    const { isLoggedIn, as: Comp } = this.props;
    if (!isLoggedIn) {
      return <Redirect to="/login" noThrow />;
    }
    return <Comp />;
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

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);

ProtectedRoute.propTypes = {
  as: PropTypes.elementType.isRequired,
  isLoggedIn: PropTypes.bool,
  loadInitialData: PropTypes.func.isRequired
};

ProtectedRoute.defaultProps = {
  isLoggedIn: false
};
