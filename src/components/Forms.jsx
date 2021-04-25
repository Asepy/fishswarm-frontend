import React, { Fragment } from "react";
import { Button, TextField, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Buscador from "./Buscador";

// CSS
const useStyles = makeStyles({
  formBox: {
    flexGrow: 1,
  },
  title: {
    marginLeft: "14%",
  },
  button: {
    marginTop: "5%",
    marginLeft: "35%",
  },
  textfield: {
    width: "100%",
  },
});

const Formulario = () => {
  const classes = useStyles();
  const { handleSubmit, handleInputChange, data, result_json } = Buscador();

  return (
    <Fragment>
      <div className={classes.formBox}>
        <Grid
          container
          flexdirection="column nowrap"
          justify="center"
          alignItems={"center"}
          spacing={2}
        >
          <Grid item xs={10} md={3}>
            <h1 className={classes.title}> Sos Socio de ASEPY?</h1>
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
              {result_json.found === "true"
                ? "Sos socio"
                : "No existe el socio"}
            </h3>
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
};

export default Formulario;
