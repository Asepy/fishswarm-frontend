import React, {Fragment, useContext, useEffect, useState} from "react";
import checkMember from "../api/checkMember";
import Search from './Search';
import Buscador from './Buscador';

const  Formulario = () =>
{
  

    
    const {handleSubmit,handleInputChange,data,result_json} = Buscador();
    
        return(
            <Fragment>
                <h1> Formulario</h1>
                <form onSubmit={handleSubmit}>
                    <input
                    placeholder='Cedula' 
                    type='text'
                    name='cedula'
                    onChange={handleInputChange}
                    value={data.cedula}></input>
                    <br>
                    </br>
                    <button type='submit'>Buscar</button>                
                </form>
                <h3>{data.cedula} - {(result_json.found)?'Sos socio':''}</h3>
            </Fragment>
        )
    
       
    
    
}

export default Formulario;