export default function postMember(nuevoSocio) {
    return fetch(`${process.env.REACT_APP_API_POST}`,{
          method: "POST",
          mode: "cors",
          body: JSON.stringify({
            name: nuevoSocio.nombre,
            document: nuevoSocio.document,
            surname: nuevoSocio.surname,
            birthdate: nuevoSocio.birthdate
            }),
          headers: {
              "Authorization": `Bearer: none`,
              "Content-type": "application/json; charset=UTF-8",
              'Accept': "application/json"
          },
          })
          .then(res => res.json());
          

  }
