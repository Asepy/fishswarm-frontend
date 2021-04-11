export default function postMember(nuevoSocio,birthdate_changed) {
    return fetch(`${process.env.REACT_APP_API_POST}`,{
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify({
            name: nuevoSocio.nombre,
            document: nuevoSocio.documento,
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
