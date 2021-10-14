import { useState } from "react";
import { handleResponse, getCurrentUserToken } from "utils/helpers/api.helpers";

async function exportMembers(filterValues, sortBy) {
  const token = await getCurrentUserToken();
  const body = JSON.stringify({
    ...filterValues,
    sortBy
  });
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/members/export`,
    {
      method: "POST",
      mode: "cors",
      body,
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`,
        Authorization: token
      }
    }
  );
  const data = await handleResponse(resp);

  return data;
}

export function useExportMembers() {
  const [isLoading, setIsLoading] = useState(false);
  const mutate = async (filterValues, sortBy, options) => {
    setIsLoading(true);
    try {
      const data = await exportMembers(filterValues, sortBy);
      options.onSuccess(data);
    } catch (error) {
      options.onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading };
}
