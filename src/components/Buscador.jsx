import React, {Fragment, useContext, useEffect, useState} from "react";
import checkMember from "../api/checkMember";

const Buscador = () =>
{
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [result_json , setResult ] = useState([]);
    const [data,setData] = useState({});

    const handleSubmit = (event) => {
        if (event) {
          event.preventDefault();
        }
        checkMember(data.cedula) 
        .then(
            (result) => {
            
              setIsLoaded(true);
              setResult(result.data );
            }
        )
      }
    const handleInputChange = (event) => {
        event.persist();
        setData(data => ({...data, [event.target.name]: event.target.value}));
    }
    return(
        {handleSubmit,handleInputChange,data,result_json}
    );
}

export default Buscador