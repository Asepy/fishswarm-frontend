export default function postMember(nuevoSocio) {
  return fetch(`${process.env.REACT_APP_API_POST}`, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify({
      name: nuevoSocio.nombre,
      document: nuevoSocio.documento,
      surname: nuevoSocio.surname,
      birthdate: nuevoSocio.birthdate,
    }),
    headers: {
      Authorization: `Bearer: none`,
      "Content-Type": "application/json; charset=UTF-8",
      Accept: "application/json",
      "x-api-key": "FC7M7exIC45NDNNprYxGi5Rki0bb0EZw1iyucSfV",
    },
  })
    .then((res) => res.json())
    .catch((error) => console.log(error)); //SyntaxError: JSON.parser ?
}
