import React, { Component } from "react";
import { connect } from "react-redux";
import { TextField, Button, Card, Grid, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { buyTransactionsThunk } from "../store";

const styles = () => ({
  "transaction-form": {
    display: "flex",
    flexDirection: "column"
  }
});
class TransactionForm extends Component {
  componentDidMount() {
    this.state = {};
  }

  render() {
    const { handleSubmit, classes } = this.props;
    return (
      <Card>
        <Grid container direction="column">
          <h1>Buy Form</h1>
          <form className={classes["transaction-form"]} onSubmit={handleSubmit}>
            <TextField id="symbol" label="Symbol" required />
            <TextField id="quant" label="Quantity" required />
            <Button type="submit">Buy</Button>
          </form>
        </Grid>
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

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(TransactionForm));

/**
 * PROP TYPES
 */
TransactionForm.propTypes = {
  classes: PropTypes.shape({
    "transaction-form": PropTypes.string
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired
};
