import React from "react";
import formatDate from "./formatDate";

async function getMemberFromApi({ document, birthdate }) {
  const dateAsStr = formatDate(birthdate);
  const response = await fetch(
    `/api/members/${document}?birthdate=${dateAsStr}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    const errorJson = await response.json();
    throw new Error(errorJson.message);
  }
  return response.json();
}

export default function useSearchMember({ document, birthdate }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState();
  const refetch = async () => {
    setIsLoading(true);
    try {
      const response = await getMemberFromApi({ document, birthdate });
      setData(response);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, refetch, data };
}
