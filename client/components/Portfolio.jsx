import React, { Component } from "react";
import { connect } from "react-redux";
import { TableContainer, TableRow, Container, Card } from "@material-ui/core";
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
    const { balance, portfolio } = this.props;
    return (
      <div>
        <Navbar />
        <Container>
          <Card>
            <p>
              Current Balance:
              {balance / 100}
            </p>
            <TableContainer>
              {portfolio.map(hold => {
                return <TableRow key={hold.symbol}>{hold.symbol}</TableRow>;
              })}
            </TableContainer>
          </Card>
          <TransactionForm />
        </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);

/**
 * PROP TYPES
 */
Portfolio.propTypes = {
  portfolio: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  balance: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  loadPortfolio: PropTypes.func.isRequired
};
