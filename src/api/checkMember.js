export default function checkMember(memberId) {
  console.log("Dentro de checkMember(): " + memberId);
  return fetch(`${process.env.REACT_APP_API_BASE}/members/${memberId}`, {
    method: "GET",
    mode: "cors",
    headers: {
      Authorization: `Bearer: none`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}
