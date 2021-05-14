import React from "react";

async function postMemberToApi(editMember) {
  const response = await fetch(`/api/members/${editMember.national_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...editMember,
    }),
  });
  if (!response.ok) {
    const errorJson = await response.json();
    throw new Error(errorJson.message);
  }
  return response.json();
}

export default function useEditMember() {
  const [isLoading, setIsLoading] = React.useState(false);
  const mutate = async (values, options) => {
    setIsLoading(true);
    try {
      const data = await postMemberToApi(values);
      options.onSuccess(data);
    } catch (error) {
      options.onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading };
}
