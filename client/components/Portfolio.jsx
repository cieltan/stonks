import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Navbar from "./Navbar";
import { getPortfolioThunk } from "../store/portfolio";
import TransactionForm from "./TransactionForm";

class Portfolio extends Component {
  componentDidMount() {
    const { loadPortfolio, id } = this.props;
    loadPortfolio(id);
  }

  render() {
    const { balance } = this.props;
    return (
      <div>
        <Navbar />
        {balance / 100}
        <TransactionForm />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    balance: state.user.balance,
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
  balance: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  loadPortfolio: PropTypes.func.isRequired
};
