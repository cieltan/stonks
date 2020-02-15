import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  Paper
} from "@material-ui/core";
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
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Stock</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Shares</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map(transaction => {
                return (
                  <TableRow key={transaction.symbol + transaction.createdAt}>
                    <TableCell component="th" scope="row">
                      {transaction.symbol}
                    </TableCell>
                    <TableCell align="left">
                      {transaction.price / 100}
                    </TableCell>
                    <TableCell align="left">{transaction.quantity}</TableCell>
                    <TableCell align="left">{`(${transaction.action})`}</TableCell>
                    <TableCell align="left">{transaction.date}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
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
