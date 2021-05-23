import React from "react";
import formatDate from "./formatDate";
import handleResponse from "./handleResponse";

async function postMemberToApi(newMember) {
  const response = await fetch("/api/createMember", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ...newMember,
      birthdate: formatDate(newMember.birthdate)
    })
  });

  return handleResponse(response);
}

export default function useCreateMember() {
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
