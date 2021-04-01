export default function postMember(nuevoSocio) {
    return fetch(`${process.env.REACT_APP_API_POST}/5`,{
          method: "POST",
          mode: "cors",
          body: JSON.stringify({
            name: nuevoSocio.nombre,
            document: nuevoSocio.documento,
            }),
          headers: {
              "Content-type": "application/json; charset=UTF-8",
              'Accept': "application/json"
          },
          })
          .then(res => res.json());

  }
