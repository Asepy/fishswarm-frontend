import { useMutation } from "react-query";
import formatDate from "./formatDate";

async function postMemberToApi(newMember) {
  const response = await fetch("/api/createMember", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...newMember,
      cityId: 1, // TODO en duro por ahora
      birthdate: formatDate(newMember.birthdate),
    }),
  });
  if (!response.ok) {
    const errorJson = await response.json();
    throw new Error(errorJson.message);
  }
  return response.json();
}

export default function useCreateMember() {
  return useMutation((newMember) => postMemberToApi(newMember));
}
