import { useState } from "react";
import { useQuery } from "react-query";
import { handleResponse } from "utils/helpers/api.helpers";
import { useCitiesByDep } from "./useCitiesByDep";

if (process.env.NEXT_PUBLIC_API_KEY) {
  throw Error("NEXT_PUBLIC_API_KEY is not present");
}

if (process.env.NEXT_PUBLIC_API_BASE) {
  throw Error("NEXT_PUBLIC_API_BASE is not present");
}

export async function fetchDepartments() {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/deparments`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`
    }
  });
  const data = await handleResponse(resp);
  return data;
}

const DEPARTMENTS_QUERY_ID = "query:departments";

export function useDepartments(departmentOptions = {}, citiesOptions) {
  const { initialDepId, ...restDepOptions } = departmentOptions;
  const [selectedDepId, setSelectedDepId] = useState(initialDepId);
  const citiesQuery = useCitiesByDep(
    {
      depId: selectedDepId
    },
    citiesOptions
  );

  const departmentQuery = useQuery(
    DEPARTMENTS_QUERY_ID,
    async () => {
      const resp = await fetchDepartments();
      return resp?.data || [];
    },
    restDepOptions
  );

  const updateDepartment = (e) => {
    const depId = e.target.value;
    setSelectedDepId(depId);
  };

  return {
    departmentResult: departmentQuery,
    citiesResult: citiesQuery,
    updateDepartment
  };
}
