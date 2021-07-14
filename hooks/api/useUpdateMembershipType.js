import { useState } from "react";
import { useQueryClient } from "react-query";
import { handleResponse, getCurrentUserToken } from "utils/helpers/api.helpers";
import { FILTER_MEMBER_PAGED_QUERY_ID } from "hooks/api/useFilterMember";

async function mutateMembership(idNumber, updateData) {
  const token = await getCurrentUserToken();
  const body = JSON.stringify(updateData);
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/membership/${idNumber}`,
    {
      method: "PUT",
      mode: "cors",
      body,
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`,
        Authorization: token
      }
    }
  );
  return handleResponse(resp);
}

export function useUpdateMembershipType() {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const mutate = async ({ idNumber, values }, options) => {
    setIsLoading(true);
    try {
      const data = await mutateMembership(idNumber, values);
      // Forces a refresh of the member's table
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
