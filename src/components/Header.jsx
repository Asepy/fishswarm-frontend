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
  root: {
    flexGrow: 1,
  },
  logo_img: {
    maxWidth: "15%",
    maxHeight: "15%",
  },
  menuButton: {
    fontWeight: 400,
    size: "18px",
    marginLeft: "38px",
    textDecorationLine: "none",
    color: "black",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  header: {
    paddingRight: "79px",
    paddingLeft: "118px",
  },
});

const Header = () => {
  const classes = useStyles();

  const displayToolbar = () => {
    return (
      <Toolbar className={classes.toolbar}>
        <img
          src="https://asepy.org/wp-content/uploads/2018/06/ASEPY-Logo.png"
          alt="Asepy logo"
          className={classes.logo_img}
        />
        <div>{getMenuButtons()}</div>
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
        <RouterLink
          {...{
            key: label,
            color: "inherit",
            to: href,
          }}
          className={classes.menuButton}
        >
          {label}
        </RouterLink>
      );
    });
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <AppBar position="static" className={classes.header}>
          {displayToolbar()}
        </AppBar>
      </div>
    </React.Fragment>
  );
};

export default Header;
