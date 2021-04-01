import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Formulario from "./components/Forms";
import Registrarse from "./components/Register";
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
            <Route path="/asociate" component={Registrarse} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </React.Fragment>
  );
}

function Child() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  //let { id } = useParams();

  return (
    <div>
      <h2>Prueba</h2>
    </div>
  );
}

export default App;
