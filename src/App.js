import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Formulario from "./components/Forms";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./components/Register";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#000000" },
    secondary: { main: "#FFFFFF" },
  },
  shadows: ["none"],
});

function App() {
  return (
    <React.Fragment>
      <ScopedCssBaseline>
        <ThemeProvider theme={theme}>
          <Router>
            <Header />
            <div>
              <Switch>
                <Route path="/soy-socio" component={Formulario} />
                <Route path="/membresia" component={Register} />
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
