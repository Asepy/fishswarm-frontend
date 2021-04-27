import React from "react";
import { AppBar, Toolbar, makeStyles } from "@material-ui/core";
import Link from "next/link";
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
        <div>
          <Link href="/" className={classes.menuButton}>
            <a>Asociáte</a>
          </Link>
          <Link href="/search-member" className={classes.menuButton}>
            <a>¿Soy Socio?</a>
          </Link>
        </div>
      </Toolbar>
    );
  };

  // const getMenuButtons = () => {
  //   return headersData.map(({ label, href }) => {
  //     return (
  //       <RouterLink
  //         {...{
  //           key: label,
  //           color: "inherit",
  //           to: href,
  //         }}
  //         className={classes.menuButton}
  //       >
  //         {label}
  //       </RouterLink>
  //     );
  //   });
  // };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <AppBar position="static" className={classes.header} color="secondary">
          {displayToolbar()}
        </AppBar>
      </div>
    </React.Fragment>
  );
};

export default Header;
