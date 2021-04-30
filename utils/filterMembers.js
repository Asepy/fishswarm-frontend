export default function filterMember(memberId = "123456",name = "Juan") {
    return fetch(`http://127.0.0.1:3000/members/filter?document=${memberId}&name=${birthDate}`,{
          method: "GET",
          mode: "cors",
          headers: {
            "Authorization": `Bearer: none`,
            "Content-Type": "application/json",
          },
          })
          .then(res => res.json());
  }