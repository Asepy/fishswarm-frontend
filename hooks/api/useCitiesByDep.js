import { useQuery } from "react-query";
import { handleResponse } from "utils/helpers/api.helpers";

const CITIES_BY_DEP_QUERY = "query:citiesByDep";
const ALL_CITIES_QUERY = "query:allCities";

async function fetchCities({ depId }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/deparments/${depId}/cities`,
    {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`
      }
    }
  );
  const data = await handleResponse(response);
  // eslint-disable-next-line no-console
  console.log("Response was:", data);
  return data;
}

async function fetchAllCities() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/cities`, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`
    }
  });
  const data = await handleResponse(response);
  return data;
}

export function useCitiesByDep({ depId }, options) {
  return useQuery(
    [CITIES_BY_DEP_QUERY, depId],
    async () => {
      if (depId == null || depId === "") {
        return [];
      }
      const resp = await fetchCities({ depId });
      // console.log({ resp });
      return resp?.data || [];
    },
    options
  );
}

export function useAllCities(options) {
  return useQuery(
    [ALL_CITIES_QUERY],
    async () => {
      const resp = await fetchAllCities();
      // console.log({ resp });
      return resp?.data || [];
    },
    options
  );
}
