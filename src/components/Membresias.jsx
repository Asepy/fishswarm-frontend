import React from "react";
import { Typography, Button, makeStyles } from "@material-ui/core";
import { Route, Link } from "react-router-dom";
import { socioActivo } from "../data/socioActivo";
import { socioPlus } from "../data/socioPlus";

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

  const serSocioActivoClick = () => {
    console.log("Ser socio Activo");
    return <Link to={`${match.url}/socio-activo`} />;
  };

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

      <Route
        path={`${match.path}/:tipoDeSocio`}
        render={(props) => {
          <div>{props.match.params.tipoDeSocio} category</div>;
        }}
      />
    </React.Fragment>
  );
};

export default Membresias;
