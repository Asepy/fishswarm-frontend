import React, {Fragment, useContext, useEffect, useState} from "react";
import Cargador from './Cargador'



const  Registrarse = () =>
{

    const {handleSubmit,handleInputChange,data,result_json} = Cargador();
    
        return(
            <Fragment>
                <h1> Registrarse</h1>
                <form onSubmit={handleSubmit}>
                   <input
                    placeholder='Nombre' 
                    type='text'
                    name='nombre'
                    onChange={handleInputChange}
                    value={data.nombre}></input>
                    <br></br>
                    
                    <br></br>
                    <input 
                    placeholder='RUC' 
                    type='text'
                    name='documento'
                    onChange={handleInputChange}
                    value={data.documento}></input>
                    
                    <br></br> 
                    <button type='submit'>Registrarse</button>              
                </form>
            </Fragment>
        )
    
       
    
    
}

export default Registrarse;