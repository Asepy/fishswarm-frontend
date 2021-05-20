import React from "react";

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
  const mutate = async (values, options) => {
    setIsLoading(true);
    try {
      const data = await deactivateMemberToApi(values);
      options.onSuccess(data);
    } catch (error) {
      options.onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading };
}
