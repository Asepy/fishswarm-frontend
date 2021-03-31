import React, {Fragment, useContext, useEffect, useState} from "react";
import checkMember from "../api/checkMember";
import Search from './Search';
import Buscador from './Buscador';

const  Formulario = () =>
{
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [result_json , setResult ] = useState([]);

    const signup = () => {
   
      
        console.log('Cedula = '+ data.cedula);
    
        checkMember(data.cedula) 
        .then(
            (result) => {
              // this.setState({
              //   isLoaded: true,
              //   data: JSON.stringify(result.data)             
              // });
              setIsLoaded(true);
              setResult(result.data );
            }
        )
        
        console.log('Resultado: '+ result_json.found +' Esta cargado: '+isLoaded+' Error: '+error);

      }
    const {handleSubmit,handleInputChange,data} = Buscador(signup);
    //const [datos,setDatos] = useState(
    //    {
    //        cedula: ''
    //    })
    
    //const handleInputChange = (event) =>
    //{
    //    setDatos({
    //    ...datos,
    //    [event.target.name] : event.target.value
    //    })
    // }
    
    // const enviarDatos = (event) =>
    // {
    //     event.preventDefault();
    //     console.log('Hay cedula '+ datos.cedula);
    //     return(
    //         numero_cedula = datos.cedula
    //     );
    // }
    
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
                <h3>{data.cedula} - <p>{result_json.found}</p></h3>
            </Fragment>
        )
    
       
    
    
}

export default Formulario;