import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import grey from "@material-ui/core/colors/grey";
import Formulario from "./components/Forms";
import Membresias from "./components/Membresias";
import Header from "./components/Header";
import Footer from "./components/Footer";

// CSS - Styling
// const useStyles = makeStyles({
//   root: {
//     margin: 20,
//     padding: 20,
//     maxWidth: 400,
//   },
// });

const theme = createMuiTheme({
  palette: {
    primary: { main: grey[50] },
  },
  shadows: ["none"],
});

function App() {
  // const classes = useStyles();
  return (
    <React.Fragment>
      <ScopedCssBaseline>
        <ThemeProvider theme={theme}>
          <Router>
            <Header />
            <div>
              <Switch>
                <Route path="/soy-socio" component={Formulario} />
                <Route path="/membresia" component={Membresias} />
                {/* <Route path="/asociate" component={Registrarse} /> */}
              </Switch>
            </div>
            <Footer />
          </Router>
        </ThemeProvider>
      </ScopedCssBaseline>
    </React.Fragment>
  );
}

export default App;
