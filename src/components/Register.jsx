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
  const { handleSubmit, handleInputChange, data, result_json } = Cargador();

  return (
    <Fragment>
      <h1> Registrarse</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          label="Nombre"
          name="nombre"
          placeholder="Juan"
          value={data.nombre || ""}
          onChange={handleInputChange}
        />
        <br></br>
        <TextField
          margin="normal"
          label="Apellido"
          name="surname"
          placeholder="Perez"
          value={data.surname || ""}
          onChange={handleInputChange}
        />
        <br></br>
        <TextField
          margin="normal"
          label="# de C.I."
          name="document"
          placeholder="123456"
          value={data.documento || ""}
          onChange={handleInputChange}
        />
        <br></br>
        <TextField
          margin="normal"
          label="Fecha de Nacimiento"
          name="birthdate"
          placeholder="yyyy-mm-dd"
          value={data.birthdate || ""}
          onChange={handleInputChange}
        />
        {/* <input
          type="text"
          name="birthdate"
          placeholder="fecha de cumple"
          style={{ display: "block", margin: "15px 20px" }}
        /> */}

        <Button
          className={classes.button}
          type="submit"
          variant="contained"
          color="primary"
        >
          Registrarse
        </Button>
      </form>
      <h3>
        {result_json}
      </h3>
    </Fragment>
  );
};

export default Registrarse;
