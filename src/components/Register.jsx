import React, { Fragment } from "react";
import {
  Button,
  TextField,
  makeStyles,
  Typography,
  Paper,
  CircularProgress,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Cargador from "./Cargador";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

// CSS

const useStyles = makeStyles({
  formBox: {
    flexGrow: 1,
  },
  title: {
    padding: "0 30% 0 30%",
    display: "flex",
    justifyContent: "center",
  },
  longTitle: {
    padding: "0 20% 0 15%",
    display: "flex",
    justifyContent: "center",
  },
  button: {
    display: "flex",
    justifyContent: "center",
  },
  textfield: {
    width: "100%",
  },
  dropDown: {
    width: "8rem",
  },
});

const Registrarse = () => {
  const classes = useStyles();
  const {
    handleSubmit,
    handleInputChange,
    data,
    result_json,
    loading,
  } = Cargador();

  return (
    <Fragment>
      <Grid
        container
        lexdirection="column nowrap"
        justify="center"
        alignItems={"center"}
        spacing={2}
      >
        <Grid item xs={10} md={6}>
          <Typography className={classes.title} variant="h4">
            Registro
          </Typography>
          <form className={classes.formBox} onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              label="Nombres"
              name="nombre"
              placeholder="Juan Jose"
              value={data.nombre || ""}
              onChange={handleInputChange}
              className={classes.textfield}
            />
            <br></br>
            <TextField
              margin="normal"
              label="Apellidos"
              name="surname"
              placeholder="Perez Emprendedor"
              value={data.surname || ""}
              onChange={handleInputChange}
              className={classes.textfield}
            />
            <br></br>
            <TextField
              margin="normal"
              label="# de C.I."
              name="documento"
              placeholder="123456"
              value={data.documento || ""}
              onChange={handleInputChange}
              className={classes.textfield}
            />
            <br></br>
            <TextField
              margin="normal"
              name="birthdate"
              label="Fecha de Nacimiento"
              type="date"
              value={data.birthdate || ""}
              onChange={handleInputChange}
              className={classes.textfield}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <br></br>
            <br></br>
            <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={data.sexo || ""}
              onChange={handleInputChange}
              className={classes.dropDown}
            >
              <MenuItem value={"Masculino"}>Masculino</MenuItem>
              <MenuItem value={"Femenino"}>Femenino</MenuItem>
            </Select>
            <br></br>
            <br></br>
            <InputLabel id="demo-simple-select-label">Departamento</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={data.departamento || ""}
              onChange={handleInputChange}
              className={classes.dropDown}
            >
              <MenuItem value={"Capital"}>Capital</MenuItem>
              <MenuItem value={"Concepción"}>Concepción</MenuItem>
              <MenuItem value={"San Pedro"}>Capital</MenuItem>
              <MenuItem value={"Coordillera"}>Coordillera</MenuItem>
              <MenuItem value={"Guairá"}>Guairá</MenuItem>
              <MenuItem value={"Caaguazú"}>Caaguazú</MenuItem>
              <MenuItem value={"Caazapá"}>Caazapá</MenuItem>
              <MenuItem value={"Itapúa"}>Itapúa</MenuItem>
              <MenuItem value={"Misiones"}>Misiones</MenuItem>
              <MenuItem value={"Paraguarí"}>Paraguarí</MenuItem>
              <MenuItem value={"Alto Paraná"}>Alto Paraná</MenuItem>
              <MenuItem value={"Central"}>Central</MenuItem>
              <MenuItem value={"Ñeembucú"}>Ñeembucú</MenuItem>
              <MenuItem value={"Amambay"}>Amambay</MenuItem>
              <MenuItem value={"Canindeyú"}>Canindeyú</MenuItem>
              <MenuItem value={"Pdte. Hayes"}>Pdte. Hayes</MenuItem>
              <MenuItem value={"Alto Paraguay"}>Alto Paraguay</MenuItem>
            </Select>
            <br></br>
            <TextField
              margin="normal"
              label="Ciudad"
              name="city"
              placeholder="Ciudad"
              value={data.city || ""}
              onChange={handleInputChange}
              className={classes.textfield}
            />
            <br></br>
            <TextField
              margin="normal"
              label="Email"
              name="mail"
              placeholder="correo@gmail.com"
              value={data.mail || ""}
              onChange={handleInputChange}
              className={classes.textfield}
            />
            <br></br>
            <TextField
              margin="normal"
              label="Celular"
              name="celular"
              placeholder="0981000000"
              value={data.celular || ""}
              onChange={handleInputChange}
              className={classes.textfield}
            />
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Typography className={classes.longTitle} variant="h4">
              Registro del Emprendimiento
            </Typography>
            <br></br>
            <TextField
              margin="normal"
              label="Razon social"
              name="razonsocial"
              placeholder="Razón social"
              value={data.razonsocial || ""}
              onChange={handleInputChange}
              className={classes.textfield}
            />
            <br></br>
            <TextField
              margin="normal"
              label="Nombre de Fantasía"
              name="nfantasia"
              placeholder="Nombre de fantasia"
              value={data.nfantasia || ""}
              onChange={handleInputChange}
              className={classes.textfield}
            />
            <br></br>
            <TextField
              margin="normal"
              label="R.U.C"
              name="ruc"
              placeholder="7777777-3"
              value={data.ruc || ""}
              onChange={handleInputChange}
              className={classes.textfield}
            />
            <InputLabel id="demo-simple-select-label">
              {" "}
              * El único requisito para asociarte es contar con un RUC activo
            </InputLabel>

            <TextField
              margin="normal"
              label="Especifique el rubro"
              name="rubro"
              placeholder="Rubro"
              value={data.rubro || ""}
              onChange={handleInputChange}
              className={classes.textfield}
            />
            <br></br>
            <TextField
              margin="normal"
              label=" Cantidad de empleados (si no aplica: 0)"
              name="empleados"
              placeholder="7"
              value={data.empleados || ""}
              onChange={handleInputChange}
              className={classes.textfield}
            />
            <br></br>
            <br></br>
            <InputLabel id="demo-simple-select-label">
              Facturación del 2019
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={data.facturacion || ""}
              onChange={handleInputChange}
            >
              <MenuItem value={"Menor o igual a 650 millones Gs."}>
                Menor o igual a 650 millones Gs.
              </MenuItem>
              <MenuItem value={"Entre 650 millones y 3.250 millones de Gs."}>
                Entre 650 millones y 3.250 millones de Gs.
              </MenuItem>
              <MenuItem value={"Entre 3.250 millones y 7.700 millones de Gs."}>
                Entre 3.250 millones y 7.700 millones de Gs.
              </MenuItem>
              <MenuItem value={"Mayor a 7.700 millones Gs."}>
                Mayor a 7.700 millones Gs.
              </MenuItem>
            </Select>
            <br></br>
            <TextField
              margin="normal"
              label=" Sitio web o redes sociales"
              name="sitioweb"
              placeholder="www.asepy.com"
              value={data.sitioweb || ""}
              onChange={handleInputChange}
              className={classes.textfield}
            />
            <br></br>
            <br></br>
            <Button
              className={classes.button}
              type="submit"
              variant="contained"
              color="primary"
            >
              Registrarse
              {loading && <CircularProgress color="secondary" size={20} />}
            </Button>
          </form>
          <h3>{result_json}</h3>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Registrarse;
