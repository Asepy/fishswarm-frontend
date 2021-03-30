import React, {Fragment, useContext, useEffect, useState} from "react";
import checkMember from "../api/checkMember";


const Search = (props) =>{
  // Declarar estado
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data , setData ] = useState([]);


  // Declrar effects
  useEffect( () =>  {
    const memberId = props.cedula;
    console.log(memberId + 'Llego la cedula')
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

  if (error !== null) {
    return(
    <div>
       Error: {error.message}
      <h2>
        Data = {data}
      </h2>
    </div>
   );

  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <h2>{JSON.stringify(data)}</h2>
      
    );
  }
}


export default Search;