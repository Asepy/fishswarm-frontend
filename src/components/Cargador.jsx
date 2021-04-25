import { useState } from "react";
import postMembers from "../api/postMembers";
import date from "../data/date";

const Cargador = () => {
  // const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result_json, setResult] = useState([]);
  const [data, setData] = useState({});

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }

    // Transformar fecha de nacimiento de cadena a fecha
    console.log(
      "Fecha de Nacimiento introducida por el usuario: " + data.birthdate
    );

    setLoading(true);

    // POST API call: Registrar nuevo/a socio/a
    postMembers(data)
      .then((result) => {
        setLoading(false);
        //setResult(result.success);
        //alert("Server says: " + result_json);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  // Guardar el input de los usuarios
  const handleInputChange = (event) => {
    event.persist();
    setData((data) => ({ ...data, [event.target.name]: event.target.value }));
    //console.log(JSON.stringify(data));
  };

  return { handleSubmit, handleInputChange, data, result_json, loading };
};

export default Cargador;
