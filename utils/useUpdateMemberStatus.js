import { useState } from "react";
import { useQueryClient } from "react-query";
import handleResponse from "./handleResponse";
import { FILTER_MEMBER_PAGED_QUERY_ID } from "./useFilterMember";

async function mutateMemberStatus(idNumber, editMember) {
  const body = JSON.stringify(editMember);
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/members-status/${idNumber}`,
    {
      method: "PUT",
      mode: "cors",
      body,
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`
      }
    }
  );
  return handleResponse(resp);
}

export default function useUpdateMemberStatus() {
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
