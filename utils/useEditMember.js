import { useState } from "react";
import { useQueryClient } from "react-query";
import getCurrentUserToken from "./getCurrentUserToken";
import handleResponse from "./handleResponse";
import { FILTER_MEMBER_PAGED_QUERY_ID } from "./useFilterMember";

async function editMemberToApi(idNumber, editMember) {
  const token = await getCurrentUserToken();
  const body = JSON.stringify(editMember);
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/members/${idNumber}`,
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

export default function useEditMember() {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const mutate = async ({ idNumber, values }, options) => {
    setIsLoading(true);
    try {
      const data = await editMemberToApi(idNumber, values);
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
