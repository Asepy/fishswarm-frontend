import React , {Fragment,useState} from 'react'
import checkMember from "../api/checkMember";
import Search from '../components/Search';
const  Formulario = () =>
{
    const [datos,setDatos] = useState(
        {
            cedula: ''
        })
    
    const handleInputChange = (event) =>
    {
        setDatos({
        ...datos,
        [event.target.name] : event.target.value
        })
    }

    const enviarDatos = (event) =>
    {
        event.preventDefault();
        console.log('Hay cedula '+ datos.cedula);
        return(
           <Search cedula={datos.cedula}/>
        )
    }
    return(
        <Fragment>
            <h1> Formulario</h1>
            <form onSubmit={enviarDatos}>
                <input
                placeholder='Cedula' 
                type='text'
                name='cedula'
                onChange={handleInputChange}></input>
                <br>
                </br>
                <button type='submit'>Buscar</button>                
            </form>
            <h3>{datos.cedula} - </h3>
        </Fragment>
    )
}

export default Formulario;