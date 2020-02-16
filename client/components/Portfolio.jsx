import React, { Component } from "react";
import { connect } from "react-redux";
import {
  TableContainer,
  TableRow,
  Grid,
  Card,
  Table,
  TableHead,
  TableCell,
  TableBody,
  withStyles
} from "@material-ui/core";
import PropTypes from "prop-types";
import Navbar from "./Navbar";
import { getPortfolioThunk } from "../store/portfolio";
import TransactionForm from "./TransactionForm";

/**
 * STYLES
 */
const styles = () => ({
  "portfolio-grid": {
    display: "flex",
    height: "75vh",
    justify: "space-around",
    alignItems: "center"
  },
  "portfolio-card": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  "portfolio-stock--green": {
    color: "66BB6A"
  },
  "portfolio-stock--red": {
    color: "#FF1744"
  },
  "portfolio-stock--grey": {
    color: "#424242"
  }
});

/**
 * COMPONENT
 */
class Portfolio extends Component {
  componentDidMount() {
    const { loadPortfolio, id } = this.props;
    loadPortfolio(id);
  }

  calculate = portfolio => {
    const result = portfolio.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
    return result / 100;
  };

  render() {
    const { balance, portfolio, classes } = this.props;
    return (
      <div>
        <Navbar />
        <Grid className={classes["portfolio-grid"]} container spacing={5}>
          <Grid item xs={6}>
            <Card className={classes["portfolio-card"]}>
              <h1>Portfolio (${this.calculate(portfolio)})</h1>
              <h2>Current Balance: ${balance / 100}</h2>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Stock</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell># of Shares</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {portfolio.map(hold => {
                      const { status, quantity, symbol, price } = hold;
                      let color;
                      let arrow;
                      if (status === "bull") {
                        color = classes["portfolio-stock--green"];
                        arrow = String.fromCharCode(8593);
                      } else if (status === "bear") {
                        color = classes["portfolio-stock--red"];
                        arrow = String.fromCharCode(8595);
                      } else {
                        color = classes["portfolio-stock--grey"];
                        arrow = "";
                      }
                      return (
                        <TableRow key={hold.symbol}>
                          <TableCell className={color} align="left">
                            {symbol}
                          </TableCell>
                          <TableCell className={color} align="left">
                            {arrow}
                            {(price * quantity) / 100}
                          </TableCell>
                          <TableCell align="left">{quantity}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <TransactionForm />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    portfolio: state.portfolio,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Portfolio));

/**
 * PROP TYPES
 */
Portfolio.propTypes = {
  classes: PropTypes.shape({
    "portfolio-grid": PropTypes.string,
    "portfolio-card": PropTypes.string,
    "portfolio-stock--green": PropTypes.string,
    "portfolio-stock--grey": PropTypes.string,
    "portfolio-stock--red": PropTypes.string
  }).isRequired,
  portfolio: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  balance: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  loadPortfolio: PropTypes.func.isRequired
};
