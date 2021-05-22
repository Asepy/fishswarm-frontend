import React from 'react';
import { useQueryClient } from 'react-query';
import { FILTER_MEMBER_PAGED_QUERY_ID } from './useFilterMember';

async function editMemberToApi(document, editMember) {
  console.log(
    'editMember :: ' +
      JSON.stringify({
        ...editMember
      })
  );
  const response = await fetch(`/api/editMember?document=${document}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...editMember,
      cityId: 1 // TODO en duro por ahora
    })
  });
  if (!response.ok) {
    const errorJson = await response.json();
    throw new Error(errorJson.message);
  }
  return response.json();
}

export default function useEditMember() {
  const [isLoading, setIsLoading] = React.useState(false);
  const queryClient = useQueryClient();

  const mutate = async ({ document, values }, options) => {
    setIsLoading(true);
    try {
      const data = await editMemberToApi(document, values);
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
