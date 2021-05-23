import { useQuery } from "react-query";
import handleResponse from "./handleResponse";

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

export default function useDepartments() {
  return useQuery([DEPARTMENTS_QUERY_ID], () => getDepartmentsFromApi());
}
