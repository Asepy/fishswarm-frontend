import React, {Fragment, useContext, useEffect, useState} from "react";
import filterMembers from "../api/filterMembers";

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
        filterMembers(data.cedula,data.name) 
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


export default Filtrador