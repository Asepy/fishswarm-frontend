import { useState } from "react";
import { useQueryClient } from "react-query";
import { handleResponse, getCurrentUserToken } from "utils/helpers/api.helpers";
import { FILTER_MEMBER_PAGED_QUERY_ID } from "hooks/api/useFilterMember";

async function mutateMemberStatus(idNumber, editMember) {
  const token = await getCurrentUserToken();
  const body = JSON.stringify(editMember);
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/members-status/${idNumber}`,
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

export function useUpdateMemberStatus() {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const mutate = async ({ idNumber, values }, options) => {
    setIsLoading(true);
    try {
      const data = await mutateMemberStatus(idNumber, values);
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
