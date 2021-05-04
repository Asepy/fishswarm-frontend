import React from "react";
import formatDate from "./formatDate";

async function filterMember() {
  const response = await fetch(`/api/members/filter`, {
    method: "GET",
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

export default function useSearchMember(options = {}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState();
  const [error, setError] = React.useState();
  const refetch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await filterMember();
      setData(response);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, refetch, data, error };
}
