import React, { Component } from "react";
import { connect } from "react-redux";
import { TextField, Button, Card, Grid, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { buyTransactionsThunk } from "../store";

/**
 * STYLES
 */
const styles = () => ({
  "transaction-form": {
    display: "flex",
    flexDirection: "column"
  },
  "transaction-grid": {
    height: "50vh"
  },
  "transaction-form__button": {
    marginTop: "2rem"
  }
});

/**
 * COMPONENT
 */
class TransactionForm extends Component {
  componentDidMount() {
    this.state = {};
  }

  render() {
    const { handleSubmit, classes } = this.props;
    return (
      <Card>
        <Grid
          className={classes["transaction-grid"]}
          container
          direction="column"
          alignItems="center"
        >
          <h1>Buy Form</h1>
          <form className={classes["transaction-form"]} onSubmit={handleSubmit}>
            <TextField id="symbol" label="Symbol" required />
            <TextField id="quant" label="Quantity" required />
            <Button
              className={classes["transaction-form__button"]}
              variant="contained"
              color="primary"
              type="submit"
            >
              Buy
            </Button>
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
    "transaction-form": PropTypes.string,
    "transaction-grid": PropTypes.string,
    "transaction-form__button": PropTypes.string
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired
};
