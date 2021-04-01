import React, { useEffect, useState } from "react";
import checkMember from "../api/checkMember";

const Search = (props) => {
  // Declarar estado
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState(props.cedula);

  // Declrar effects
  useEffect(() => {
    console.log(data + "Llego la cedula");
    checkMember(data).then(
      (result) => {
        setIsLoaded(true);
        setData(result.data);
      },
      // Nota: es importante manejar errores aquí y no en
      // un bloque catch() para que no interceptemos errores
      // de errores reales en los componentes.
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    );
  }, [data]);

  if (error !== null) {
    return error.message;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return JSON.stringify(data);
  }
};

export default Search;
