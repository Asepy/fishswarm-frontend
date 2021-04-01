import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Formulario from "./components/Forms";
import Registrarse from "./components/Register";
import Membresias from "./components/Membresias";
import Header from "./components/Header";
import Footer from "./components/Footer";

// CSS
const useStyles = makeStyles({
  root: {
    margin: 20,
    padding: 20,
    maxWidth: 400,
  },
});

function App() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Router>
        <Header />
        <div className={classes.root}>
          <Switch>
            <Route path="/soy-socio" component={Formulario} />
            <Route path="/asociate" component={Membresias} />
            {/* <Route path="/asociate" component={Registrarse} /> */}
          </Switch>
        </div>
        <Footer />
      </Router>
    </React.Fragment>
  );
}

export default App;
