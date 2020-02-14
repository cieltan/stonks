import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { buyTransactionsThunk } from "../store";

class TransactionForm extends Component {
  componentDidMount() {
    this.state = {};
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="symbol">
          <p>Stock</p>
          <input name="symbol" type="text" />
        </label>
        <label htmlFor="quant">
          <p>Quantity</p>
          <input name="quant" type="text" />
        </label>
        <button type="submit">Buy</button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const symbol = evt.target.symbol.value;
      const quant = evt.target.quant.value;
      dispatch(buyTransactionsThunk({ symbol, quant }));
    }
  };
};

export default connect(null, mapDispatchToProps)(TransactionForm);

/**
 * PROP TYPES
 */
TransactionForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};
