import { useState, useMemo, useReducer } from "react";
import { useQuery } from "react-query";
import { handleResponse, getCurrentUserToken } from "utils/helpers/api.helpers";
import { serializeToUri } from "utils/helpers/object.helpers";

export const FILTER_MEMBER_QUERY_ID = "query:filter-members";
export const FILTER_MEMBER_PAGED_QUERY_ID = "query:filter-members-paginated";

async function fetchFilteredMembers({ page, sortBy, filters }) {
  const token = await getCurrentUserToken();
  console.log({ filters });
  const queryParams = serializeToUri({
    page,
    sortBy,
    ...filters
  });
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/members/filter?${queryParams}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`,
        Authorization: token
      }
    }
  );
  const data = await handleResponse(resp);

  return data;
}

export function useFilterMember({ page }) {
  return useQuery([FILTER_MEMBER_QUERY_ID, page], () =>
    fetchFilteredMembers({ page })
  );
}

const searchInitialState = {
  trigger: false,
  fetching: false,
  filters: {
    status: "",
    membershipType: "",
    departmentId: "",
    cityId: "",
    searchTerm: "",
    rubroId: "",
    startDateBegin: "",
    startDateEnd: ""
  }
};

function searchReducer(state, action) {
  if (action.type === "trigger") {
    return {
      ...state,
      filters: action.filters,
      trigger: true
    };
  }
  if (action.type === "fetching") {
    return {
      ...state,
      // only if a previous search was triggered
      fetching: state.trigger,
      trigger: false
    };
  }
  if (action.type === "finish") {
    return {
      ...state,
      fetching: false
    };
  }
  if (action.type === "clear") {
    return searchInitialState;
  }
  throw new Error(`Not recognized action action.type ${action.type}`);
}

export function useFilterMemberPaginated() {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState();
  const [state, dispatch] = useReducer(searchReducer, searchInitialState);
  console.log({ state });
  const { data, isFetching, isPreviousData, ...restUseQueryResult } = useQuery(
    [
      FILTER_MEMBER_PAGED_QUERY_ID,
      page,
      sortBy,
      ...Object.values(state.filters)
    ],
    () => {
      dispatch({ type: "fetching" });
      return fetchFilteredMembers({
        page,
        sortBy,
        filters: state.filters
      });
    },
    {
      keepPreviousData: true,
      onSettled: () => {
        dispatch({ type: "finish" });
      }
    }
  );

  const hasMore = useMemo(() => data?.hasMore, [data]);

  const previousPage = () => setPage((old) => Math.max(old - 1, 0));

  const nextPage = () => setPage((old) => (hasMore ? old + 1 : old));

  const onSearch = (searchValues) => {
    setPage(1);
    dispatch({ type: "trigger", filters: searchValues });
  };

  const onClear = () => {
    setPage(1);
    setSortBy(undefined);
    dispatch({ type: "clear" });
  };

  const onSortBy = (column, isSorted, isSortedDesc) => {
    if (!isSorted) {
      // resets sorting on this column
      setSortBy(undefined);
      return;
    }
    const orderBy = isSortedDesc ? "desc" : "asc";
    setSortBy(`${orderBy}(${column})`);
  };

  return {
    data,
    hasMore,
    nextPage,
    isFetching,
    isPreviousData,
    isFetchingNewPage: isPreviousData && isFetching,
    isNextPageDisabled: isPreviousData || !hasMore,
    isSearching: state.fetching,
    onClear,
    onSearch,
    onSortBy,
    previousPage,
    page,
    setPage,
    sortBy,
    ...restUseQueryResult
  };
}
