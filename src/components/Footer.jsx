import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// CSS
const useStyles = makeStyles({
  footer: {
    position: "absolute",
    textAlign: "center",
    bottom: 0,
    width: "100%",
  },
  copyright: {
    marginTop: "5%",
  },
});

const Footer = () => {
  const year = new Date().getFullYear();
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <p className={classes.copyright}>Copyright ⓒ {year}</p>
    </footer>
  );
};

export default Footer;
