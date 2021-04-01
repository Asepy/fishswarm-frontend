import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// CSS
const useStyles = makeStyles({
  footer: {
    position: "absolute",
    textAlign: "center",
    bottom: 0,
    width: "100%",
    height: "2.5rem",
  },
});

const Footer = () => {
  const year = new Date().getFullYear();
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <p>Copyright ⓒ {year}</p>
    </footer>
  );
};

export default Footer;
