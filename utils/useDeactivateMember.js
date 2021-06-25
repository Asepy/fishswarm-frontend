import React from "react";
import { useQueryClient } from "react-query";
import { handleResponse } from "./helpers/api.helpers";

import { FILTER_MEMBER_PAGED_QUERY_ID } from "./useFilterMember";

async function deleteMember(idNumber) {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/members/${idNumber}`,
    {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`
      }
    }
  );
  return handleResponse(resp);
}

export default function useDeactivateMember() {
  const [isLoading, setIsLoading] = React.useState(false);
  const queryClient = useQueryClient();
  const mutate = async (idNumber, options) => {
    setIsLoading(true);
    try {
      const data = await deleteMember(idNumber);
      queryClient.invalidateQueries(FILTER_MEMBER_PAGED_QUERY_ID);
      options.onSuccess(data);
    } catch (error) {
      options.onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading };
}
