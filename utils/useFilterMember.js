import { useState, useMemo } from "react";
import { useQuery } from "react-query";
import handleResponse from "./handleResponse";
import serialize from "./serialize";

export const FILTER_MEMBER_QUERY_ID = "query:filter-members";
export const FILTER_MEMBER_PAGED_QUERY_ID = "query:filter-members-paginated";

async function fetchFilteredMembers({ page, name, document }) {
  const queryParams = serialize({ page, name, document });
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/members/filter?${queryParams}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`
      }
    }
  );
  const data = await handleResponse(resp);

  // eslint-disable-next-line no-console
  console.log("response was:", data);

  return data;
}

export default function useFilterMember({ page }) {
  return useQuery([FILTER_MEMBER_QUERY_ID, page], () =>
    fetchFilteredMembers({ page })
  );
}

export function useFilterMemberPaginated(queryParams) {
  const [page, setPage] = useState(1);

  const { name, document } = queryParams;
  const { data, ...restQuery } = useQuery(
    [FILTER_MEMBER_PAGED_QUERY_ID, page, name, document],
    () => fetchFilteredMembers({ page, name, document }),
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
