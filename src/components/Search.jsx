import React, {Fragment, useContext, useEffect, useState} from "react";

class Search extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        data: []
      };
    }
  
    componentDidMount() {
       fetch(" https://cors-anywhere.herokuapp.com/https://pvukdj3jak.execute-api.sa-east-1.amazonaws.com/dev/api/asepy/members/123456",{
        method: "GET",
        mode: "cors",
        headers: {
          "Authorization": `Bearer: none`,
          "Content-Type": "application/json",
        },
        })
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              data: JSON.stringify(result.data)             
            });
          },
          // Nota: es importante manejar errores aquí y no en 
          // un bloque catch() para que no interceptemos errores
          // de errores reales en los componentes.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  
    render() {
      const { error, isLoaded, data } = this.state;
      if (error) {
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
          <h2>{data}</h2>
        );
      }
    }
  }
export default Search;