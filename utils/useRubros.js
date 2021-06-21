import { useState } from "react";
import { useQuery } from "react-query";
import handleResponse from "./handleResponse";

export async function fetchRubros() {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/rubros`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`
    }
  });
  const data = await handleResponse(resp);
  // eslint-disable-next-line no-console
  console.log("response was:", data);
  return data;
}

export const RUBROS_QUERY_ID = "query:rubros";

export default function useRubros(options = {}) {
  const { initialRubros = null, queryOptions } = options;
  const rubrosQuery = useQuery(
    RUBROS_QUERY_ID,
    async () => {
      const resp = await fetchRubros();
      return resp?.data || [];
    },
    {
      enabled: initialRubros !== null,
      ...queryOptions
    }
  );
  const { data } = rubrosQuery;
  return {
    data: initialRubros ? initialRubros : data,
    ...rubrosQuery
  };
}
