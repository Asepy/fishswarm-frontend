import React, {Fragment, useContext, useEffect, useState} from "react";
import checkMember from "../api/checkMember";
import Search from './Search';
import Buscador from './Buscador';

const  Filterby = () =>
{
  

    
    const {handleSubmit,handleInputChange,data,result_json} = Buscador();
    
        return(
            <Fragment>
                <h1> Busqueda filtrada</h1>
                <form onSubmit={handleSubmit}>
                    <input
                    placeholder='Cedula' 
                    type='text'
                    name='cedula'
                    onChange={handleInputChange}
                    value={data.cedula}></input>
                    <br>
                    
                    </br>
                    <input
                    placeholder='Nombre' 
                    type='text'
                    name='nombre'
                    onChange={handleInputChange}
                    value={data.nombre}></input>
                    <br>
                    </br>
                    <button type='submit'>Buscar</button>                
                </form>
                <h3>{result_json.id}</h3>
            </Fragment>
        )
    
       
    
    
}

export default Filterby;