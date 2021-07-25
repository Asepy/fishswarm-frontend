import { useState } from "react";
import { handleResponse } from "utils/helpers/api.helpers";

async function searchMember({ document, birthdate }) {
  const dateAsStr = birthdate;
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/members/validate?document=${document}&birthdate=${dateAsStr}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`
      }
    }
  );
  const jsonResp = await handleResponse(resp);
  // eslint-disable-next-line no-console
  console.log("response was", { jsonResp });
  return jsonResp;
}

export function useSearchMember() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState();
  const refetch = async (values) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await searchMember(values);
      setData(response);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, refetch, data, error };
}
