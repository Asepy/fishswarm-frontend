import React, { useEffect, useState } from "react";
import checkMember from "../api/checkMember";

const Search = (props) => {
  // Declarar estado
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState(props.cedula);

  // Declrar effects
<<<<<<< HEAD
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
=======
  useEffect( () =>  {
    const memberId = props.cedula;
    console.log(cedula + 'Llego la cedula')
       checkMember(memberId)
        .then(
          (result) => {
            // this.setState({
            //   isLoaded: true,
            //   data: JSON.stringify(result.data)             
            // });
            setIsLoaded(true);
            setData(result.data );
          },
          // Nota: es importante manejar errores aquí y no en 
          // un bloque catch() para que no interceptemos errores
          // de errores reales en los componentes.
          (error) => {
            // this.setState({
            //   isLoaded: true,
            //   error
            // });
            setIsLoaded(true);
            setError(error);
          }
        )
  } , [] );
>>>>>>> 61eb901d74050694000d65bbed9f027930298dcb

  if (error !== null) {
    return error.message;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return JSON.stringify(data);
  }
};

export default Search;
