import React, { Fragment, useState } from "react";
import checkMember from "../api/checkMember";

const Formulario = () => {
  const [input, setInput] = useState({ cedula: "" });
  const [userFound, setUserFound] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput({ ...input, [name]: value });
  };

  const enviarDatos = (event) => {
    event.preventDefault();
    // El/la usuario se olvido de tipear su numero de documento
    if (input.cedula === "") {
      //setUserFound(false);
      return 0;
    }
    // CALL API:
    checkMember(input.cedula).then(
      (result) => {
        setUserFound(JSON.stringify(result.data.found));
      },
      (error) => {
        setError(JSON.stringify(error));
      }
    );
  };

  if (error !== null) {
    return (
      <>
        <h4>Por favor introduzca un numero de socio</h4>
      </>
    );
  } else {
    return (
      <Fragment>
        <h1> Formulario</h1>
        <form onSubmit={enviarDatos}>
          <input
            placeholder="Cedula"
            type="text"
            name="cedula"
            value={input.cedula}
            onChange={handleInputChange}
          ></input>
          <br></br>
          <button type="submit">Buscar</button>
        </form>
        <h3>
          {input.cedula} -{" "}
          {userFound && input.cedula !== ""
            ? "Sos Socio de ASEPY, pescadin!"
            : ""}
        </h3>
      </Fragment>
    );
  }
};

export default Formulario;
