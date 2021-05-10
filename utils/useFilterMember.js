import React from "react";
import { useQuery } from "react-query";
import serialize from "./serialize";

async function filterMember({ page, name, document }) {
  const queryParams = serialize({ page, name, document });
  const response = await fetch(`/api/members/filter?${queryParams}`, {
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

export default function useFilterMember({ page }, options = {}) {
  return useQuery(["query:filter-members", page], () => filterMember({ page }));
}

export function useFilterMemberPaginated(queryParams, options = {}) {
  const [page, setPage] = React.useState(1);
  const { name, document } = queryParams;
  const { data, ...restQuery } = useQuery(
    ["query:filter-members-paginated", page, name, document],
    () => filterMember({ page, name, document }),
    { keepPreviousData: true }
  );

  const hasMore = React.useMemo(
    () => page < data?.pageTotal && data?.pageTotal < data?.total,
    [data]
  );
  const previousPage = () => setPage((old) => Math.max(old - 1, 0));
  const nextPage = () => setPage((old) => (hasMore ? old + 1 : old));

  console.log({ data });
  return {
    hasMore,
    nextPage,
    page,
    setPage,
    previousPage,
    data,
    ...restQuery,
  };
}
