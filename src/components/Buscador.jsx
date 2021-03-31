import React, {Fragment, useContext, useEffect, useState} from "react";
import checkMember from "../api/checkMember";

const Buscador = (callback) =>
{
    const [data,setData] = useState({});
    const handleSubmit = (event) => {
        if (event) {
          event.preventDefault();
        }
        callback();
      }
    const handleInputChange = (event) => {
        event.persist();
        setData(data => ({...data, [event.target.name]: event.target.value}));
    }
    return(
        {handleSubmit,handleInputChange,data}
    );
}

export default Buscador