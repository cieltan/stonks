import React from "react";
import PropTypes from "prop-types";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Link } from "@reach/router";
import { logoutThunk } from "../store/user";

const styles = () => ({
  menu: {
    display: "flex",
    justifyContent: "flex-end"
  }
});

const Navbar = props => {
  const { logout, classes } = props;
  return (
    <AppBar color="transparent" position="static">
      <Toolbar className={classes.menu}>
        <Button color="inherit">
          <Link to="/transactions">Transactions</Link>
        </Button>
        <Button>
          <Link to="/">Portfolio</Link>
        </Button>
        <Button>
          <Link to="/login " onClick={logout}>
            Logout
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    logout() {
      dispatch(logoutThunk());
    }
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Navbar));

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  classes: PropTypes.shape({
    menu: PropTypes.string
  }).isRequired,
  logout: PropTypes.func.isRequired
};
