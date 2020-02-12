import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Navbar from "./Navbar";
import { getPortfolioThunk } from "../store/portfolio";

class Portfolio extends Component {
  componentDidMount() {
    const { loadPortfolio, id } = this.props;
    loadPortfolio(id);
  }

  render() {
    return (
      <div>
        <Navbar />
        Portfolio
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    id: state.user.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadPortfolio(id) {
      dispatch(getPortfolioThunk(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);

/**
 * PROP TYPES
 */
Portfolio.propTypes = {
  id: PropTypes.number.isRequired,
  loadPortfolio: PropTypes.func.isRequired
};
