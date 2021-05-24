import { useQuery } from "react-query";
import handleResponse from "./handleResponse";

async function getCitiesByDep({ depId }) {
  const response = await fetch(`/api/departments/${depId}/cities`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  return handleResponse(response);
}

export const CITIES_BY_DEP_QUERY = "query:citiesByDep";

export default function useCitiesByDep({ depId }, options) {
  return useQuery(
    [CITIES_BY_DEP_QUERY, depId],
    async () => {
      if (depId == null || depId === "") {
        return [];
      }
      const resp = await getCitiesByDep({ depId });
      return resp?.data || [];
    },
    options
  );
}
