import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { headersData } from "../data/headersData";

// CSS
const useStyles = makeStyles({
  logo: {
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
  },
  menuButton: {
    fontWeight: 700,
    size: "14px",
    marginLeft: "20px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
});

const Header = () => {
  const classes = useStyles();

  const displayToolbar = () => {
    return (
      <Toolbar>
        {asepyLogo} {getMenuButtons()}
      </Toolbar>
    );
  };

  const asepyLogo = (
    <Typography className={classes.logo} variant="h4" color="inherit">
      ASEPY
    </Typography>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
          }}
          className={classes.menuButton}
        >
          {label}
        </Button>
      );
    });
  };

  return (
    <React.Fragment>
      <AppBar position="static">{displayToolbar()}</AppBar>
    </React.Fragment>
  );
};

export default Header;
