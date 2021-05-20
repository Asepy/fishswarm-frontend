import React from "react";
import { useQueryClient } from "react-query";
import { FILTER_MEMBER_PAGED_QUERY_ID } from "./useFilterMember";

async function deactivateMemberToApi(document) {
  const response = await fetch(`/api/deactivateMember?document=${document}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorJson = await response.json();
    throw new Error(errorJson.message);
  }
  return response.json();
}

export default function useDeactivateMember() {
  const [isLoading, setIsLoading] = React.useState(false);
  const queryClient = useQueryClient();
  const mutate = async (values, options) => {
    setIsLoading(true);
    try {
      const data = await deactivateMemberToApi(values);
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
