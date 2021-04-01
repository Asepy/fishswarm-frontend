import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Formulario from "./components/Formulario";
function App() {
  return (
    <>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/show">Show Members</Link>
              </li>
              <li>
                <Link to="/check">Check Member</Link>
              </li>
              <li>
                <Link to="/register">Register Member</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/show" children={<Formulario />} />
            <Route path="/check" />
            <Route path="/register" />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
