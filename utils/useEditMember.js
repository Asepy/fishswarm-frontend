import React from "react";

async function editMemberToApi(document, editMember) {
  console.log("editMember :: "+JSON.stringify({
    ...editMember
  }));
  const response = await fetch(`/api/editMember?document=${document}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...editMember
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
  const mutate = async ({ document, values }, options) => {
    setIsLoading(true);
    try {
      const data = await editMemberToApi(document, values);
      options.onSuccess(data);
    } catch (error) {
      options.onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading };
}
