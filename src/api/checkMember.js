export default function checkMember(
  memberId = "123456",
  birthDate = "1990-01-01"
) {
  return fetch(
    `${process.env.REACT_APP_API_BASE}/${memberId}?birthdate=${birthDate}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `Bearer: none`,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());
}
