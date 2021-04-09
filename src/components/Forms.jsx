import React, { Fragment } from "react";
import {
  Button,
  TextField,
  makeStyles,
  TextareaAutosize,
} from "@material-ui/core";
import Buscador from "./Buscador";

// CSS
const useStyles = makeStyles({
  form: {
    // diplay: "flex",
    // alignItems: "baseline",
    // justifyContent: "space-evenly",
  },
  formBox: {
    display: "inline-block",
    justifyContent: "center",
    alignItems: "center",
    height: "60%",
  },
  button: {
    display: "block",
  },
  textfield: {
    display: "block",
    color: "black",
  },
});

const Formulario = () => {
  const classes = useStyles();
  const { handleSubmit, handleInputChange, data, result_json } = Buscador();

  return (
    <Fragment>
      <div className={classes.formBox}>
        <h1 style={{ display: "block" }}> Sos Socio de ASEPY?</h1>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            label="Cedula"
            name="cedula"
            placeholder="Ingrese numero de C.I."
            value={data.cedula || ""}
            onChange={handleInputChange}
            className={classes.textfield}
          />
          <TextField
            margin="normal"
            label="Fecha de Nacimiento"
            name="birthdate"
            placeholder="yyyy-mm-dd"
            value={data.birthdate || ""}
            onChange={handleInputChange}
            className={classes.textfield}
          />
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Buscar
          </Button>
        </form>
        <h3>
          {data.cedula} -{" "}
          {result_json.found === "true" ? "Sos socio" : "No existe el socio"}
        </h3>
      </div>
    </Fragment>
  );
};

export default Formulario;
