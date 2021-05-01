import React from "react";
import formatDate from "./formatDate";

async function doAuth({ email, password }) {
  const response = await fetch("/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  if (!response.ok) {
    const errorJson = await response.json();
    throw new Error(errorJson.message);
  }
  return response.json();
}

export default function useAuth() {
  const [isLoading, setIsLoading] = React.useState(false);
  const mutate = async (values, options) => {
    setIsLoading(true);
    try {
      const data = await doAuth(values);
      options.onSuccess(data);
    } catch (error) {
      options.onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // API
  return { mutate, isLoading };
}
