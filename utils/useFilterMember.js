import { useState, useMemo } from "react";
import { useQuery } from "react-query";
import serialize from "./serialize";

export const FILTER_MEMBER_QUERY_ID = "query:filter-members";
export const FILTER_MEMBER_PAGED_QUERY_ID = "query:filter-members-paginated";

async function filterMember({ page, name, document }) {
  const queryParams = serialize({ page, name, document });
  const response = await fetch(`/api/members/filter?${queryParams}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (!response.ok) {
    const errorJson = await response.json();
    throw new Error(errorJson.message);
  }
  return response.json();
}

export default function useFilterMember({ page }) {
  return useQuery([FILTER_MEMBER_QUERY_ID, page], () => filterMember({ page }));
}

export function useFilterMemberPaginated(queryParams) {
  const [page, setPage] = useState(1);

  const { name, document } = queryParams;
  const { data, ...restQuery } = useQuery(
    [FILTER_MEMBER_PAGED_QUERY_ID, page, name, document],
    () => filterMember({ page, name, document }),
    { keepPreviousData: true }
  );

  const hasMore = useMemo(
    () => page < data?.pageTotal && data?.pageTotal < data?.total,
    [data]
  );

  const previousPage = () => setPage((old) => Math.max(old - 1, 0));

  const nextPage = () => setPage((old) => (hasMore ? old + 1 : old));

  return {
    hasMore,
    nextPage,
    page,
    setPage,
    previousPage,
    data,
    ...restQuery
  };
}
