import React, { Fragment } from "react";
import { Button, TextField, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Cargador from "./Cargador";

// CSS
const useStyles = makeStyles({
  formBox: {
    flexGrow: 1,
  },
  title: {
    marginLeft: "30%",
  },
  button: {
    marginTop: "5%",
    marginLeft: "35%",
  },
  textfield: {
    width: "100%",
  },
});

const Registrarse = () => {
  const classes = useStyles();
  const { handleSubmit, handleInputChange, data, result_json } = Cargador();

  return (
    <Fragment>
      <Grid
        container
        lexdirection="column nowrap"
        justify="center"
        alignItems={"center"}
        spacing={2}
      >
        <Grid item xs={10} md={3}>
          <h1 className={classes.title}> Registrarse</h1>
          <form className={classes.formBox} onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              label="Nombre"
              name="nombre"
              placeholder="Juan"
              value={data.nombre || ""}
              onChange={handleInputChange}
              className={classes.textfield}
            />
            <br></br>
            <TextField
              margin="normal"
              label="Apellido"
              name="surname"
              placeholder="Perez"
              value={data.surname || ""}
              onChange={handleInputChange}
              className={classes.textfield}
            />
            <br></br>
            <TextField
              margin="normal"
              label="# de C.I."
              name="document"
              placeholder="123456"
              value={data.documento || ""}
              onChange={handleInputChange}
              className={classes.textfield}
            />
            <br></br>
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
              className={classes.button}
            >
              Registrarse
            </Button>
          </form>
          <h3>{result_json}</h3>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Registrarse;
