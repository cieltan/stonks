import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Navbar from "./Navbar";
import { getTransactionsThunk } from "../store/transaction";

class Transaction extends Component {
  componentDidMount() {
    const { loadTransactions, id } = this.props;
    loadTransactions(id);
  }

  render() {
    const { transactions } = this.props;
    return (
      <div>
        <Navbar />
        {transactions.map(transaction => {
          return (
            <div key={transaction.symbol + transaction.createdAt}>
              {transaction.action}
              {transaction.price / 100}
              {transaction.symbol}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    transactions: state.transactions,
    id: state.user.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadTransactions(id) {
      dispatch(getTransactionsThunk(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);

/**
 * PROP TYPES
 */
Transaction.propTypes = {
  transactions: PropTypes.instanceOf(Array).isRequired,
  id: PropTypes.number.isRequired,
  loadTransactions: PropTypes.func.isRequired
};
