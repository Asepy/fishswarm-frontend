import React from "react";
import handleResponse from "./handleResponse";
import removeEmptyString from "./removeEmptyStrings";

async function postMember(newMember) {
  const cleanMember = removeEmptyString(newMember);
  const body = JSON.stringify(cleanMember);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/members`, {
    method: "POST",
    mode: "cors",
    body,
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`
    }
  });
  const jsonResponse = await handleResponse(response);
  // eslint-disable-next-line no-console
  console.log("response was", { jsonResponse });
  return jsonResponse;
}

export default function useCreateMember() {
  const [isLoading, setIsLoading] = React.useState(false);
  const mutate = async (values, options) => {
    setIsLoading(true);
    try {
      const data = await postMember(values);
      options.onSuccess(data);
    } catch (error) {
      options.onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading };
}
