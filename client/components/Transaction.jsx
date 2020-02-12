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
    return (
      <div>
        <Navbar />
        Transactions!
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
  id: PropTypes.number.isRequired,
  loadTransactions: PropTypes.func.isRequired
};
