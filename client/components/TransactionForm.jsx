import React, { Component } from "react";
import { connect } from "react-redux";
import { TextField, Button, Card } from "@material-ui/core";
import PropTypes from "prop-types";
import { buyTransactionsThunk } from "../store";

class TransactionForm extends Component {
  componentDidMount() {
    this.state = {};
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Card>
        <h1>Buy Form</h1>
        <form onSubmit={handleSubmit}>
          <TextField id="symbol" label="Symbol" required />
          <TextField id="quant" label="Quantity" required />
          <Button type="submit">Buy</Button>
        </form>
      </Card>
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
