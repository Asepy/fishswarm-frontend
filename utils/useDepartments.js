import { useState } from "react";
import { useQuery } from "react-query";
import handleResponse from "./handleResponse";
import useCitiesByDep from "./useCitiesByDep";

async function fetchDepartments() {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/deparments`, {
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
  const parsedData = data.data.map((item) =>
    typeof item === "string" ? JSON.parse(item) : item
  );
  return { ...data, data: parsedData };
}

export const DEPARTMENTS_QUERY_ID = "query:departments";

export default function useDepartments(departmentOptions = {}, citiesOptions) {
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
