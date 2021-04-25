import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// CSS
const useStyles = makeStyles({
  footer: {
    display: "block",
    textAlign: "center",
    left: 0,
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
    <footer>
      <div className={classes.footer}>
        <p className={classes.copyright}>Copyright ⓒ {year}</p>
      </div>
    </footer>
  );
};

export default Footer;
