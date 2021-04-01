import React, { Fragment } from "react";
import { Button, TextField, makeStyles } from "@material-ui/core";
import Cargador from "./Cargador";

// CSS
const useStyles = makeStyles({
  form: {
    diplay: "flex",
    alignItems: "baseline",
    justifyContent: "space-evenly",
  },
  button: {
    display: "block",
  },
});

const Registrarse = () => {
  const classes = useStyles();
  const { handleSubmit, handleInputChange, data } = Cargador();

  return (
    <Fragment>
      <h1> Registrarse</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          label="Nombre y Apellido"
          name="nombre"
          placeholder="Juan Perez"
          value={data.nombre || ""}
          onChange={handleInputChange}
        />
        <br></br>
        <TextField
          margin="normal"
          label="# de C.I."
          name="documento"
          placeholder="123456"
          value={data.documento || ""}
          onChange={handleInputChange}
        />
        <Button
          className={classes.button}
          type="submit"
          variant="contained"
          color="primary"
        >
          Registrarse
        </Button>
      </form>
    </Fragment>
  );
};

export default Registrarse;
