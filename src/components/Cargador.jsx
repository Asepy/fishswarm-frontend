import React, {Fragment, useContext, useEffect, useState} from "react";
import postMembers from "../api/postMembers";

const Cargador = () =>
{
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [result_json , setResult ] = useState([]);
    const [data,setData] = useState({});

    const handleSubmit = (event) => {
        if (event) {
          event.preventDefault();
        }
        postMembers(data);
      }
    const handleInputChange = (event) => {
        event.persist();
        setData(data => ({...data, [event.target.name]: event.target.value}));
    }
    return(
        {handleSubmit,handleInputChange,data,result_json}
    );
}

export default Cargador