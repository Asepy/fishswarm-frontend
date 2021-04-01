import React from "react";
<<<<<<< HEAD
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Formulario from "./components/Formulario";
=======
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import Search from './components/Search';
import Formulario from './components/Forms'
import Registrarse from './components/Register'
>>>>>>> 61eb901d74050694000d65bbed9f027930298dcb
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

<<<<<<< HEAD
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
=======
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/show" children={<Formulario/>}/>
          <Route path="/check" children={<Child/>}/>
          <Route path="/register" children={<Registrarse/>}/>
        </Switch>
      </div>
    </Router>
  );
}


function Child() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();

  return (
    <div>
      <h2>Prueba</h2>
    </div>
>>>>>>> 61eb901d74050694000d65bbed9f027930298dcb
  );
}

export default App;
