import { useQuery } from "react-query";
import formatDate from "./formatDate";

async function getMemberFromApi({ document, birthdate }) {
  const response = await fetch(
    `/api/members/${document}?birthdate=${birthdate}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    const errorJson = await response.json();
    throw new Error(errorJson.message);
  }
  return response.json();
}

export default function useSearchMember({ document, birthdate }) {
  return useQuery(
    ["query-search-member", document],
    () =>
      getMemberFromApi({
        document,
        birthdate,
      }),
    {
      enabled: Boolean(document),
    }
  );
}
