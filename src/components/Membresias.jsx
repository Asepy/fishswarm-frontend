import React, { useState } from "react";
import { Typography, Button, makeStyles } from "@material-ui/core";
import { Route, Link } from "react-router-dom";
import { socioActivo } from "../data/socioActivo";
import { socioPlus } from "../data/socioPlus";
import Register from "../components/Register";

const useStyle = makeStyles({
  beneficios: {
    display: "inline-block",
    background: "#e8e4e1",
    border: ".5px solid #1b2021",
  },
  button: {
    display: "block",
    margin: "10px",
  },
});

const Membresias = ({ match }) => {
  const classes = useStyle();
  const [miembroActivo, setMiembroActivo] = useState(false);

  const serSocioActivoClick = () => {
    setMiembroActivo(true);
  };

  // Opcion de boton Socio Activo no seleccionada
  if (!miembroActivo) {
    return (
      <React.Fragment>
        <div className={classes.beneficios}>
          <Typography variant="h4">Usuario Activo</Typography>
          <ul>
            {socioActivo.map((item) => {
              return <li key={item.id}>{item.beneficio}</li>;
            })}
          </ul>
        </div>

        <Button
          className={classes.button}
          component={Link}
          to={`${match.url}/socio-activo`}
          variant="outlined"
          color="default"
          onClick={serSocioActivoClick}
        >
          Quiero ser Socio Activo
        </Button>

        <div className={classes.beneficios}>
          <Typography variant="h4">Usuario Plus</Typography>
          <ul>
            {socioPlus.map((item) => {
              return <li key={item.id}>{item.beneficio}</li>;
            })}
          </ul>
        </div>

        <Button className={classes.button} variant="contained" color="primary">
          Quiero ser Socio Plus
        </Button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Route path={`${match.path}/:tipoDeSocio`} component={Register} />
      </React.Fragment>
    );
  }
};

export default Membresias;
