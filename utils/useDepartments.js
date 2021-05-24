import { useState } from "react";
import { useQuery } from "react-query";
import handleResponse from "./handleResponse";
import useCitiesByDep from "./useCitiesByDep";

async function getDepartmentsFromApi() {
  const response = await fetch(`/api/departments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  return handleResponse(response);
}

export const DEPARTMENTS_QUERY_ID = "query:departments";

export default function useDepartments(departmentOptions, citiesOptions) {
  const [selectedDepId, setSelectedDepId] = useState();
  const citiesQuery = useCitiesByDep(
    {
      depId: selectedDepId
    },
    citiesOptions
  );

  const departmentQuery = useQuery(
    DEPARTMENTS_QUERY_ID,
    async () => {
      const resp = await getDepartmentsFromApi();
      return resp?.data || [];
    },
    departmentOptions
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
