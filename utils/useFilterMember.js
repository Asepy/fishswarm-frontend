import { useState, useMemo, useReducer } from "react";
import { useQuery } from "react-query";
import { handleResponse, getCurrentUserToken } from "./helpers/api.helpers";

import { serializeToUri } from "./helpers/object.helpers";

export const FILTER_MEMBER_QUERY_ID = "query:filter-members";
export const FILTER_MEMBER_PAGED_QUERY_ID = "query:filter-members-paginated";

async function fetchFilteredMembers({
  page,
  searchTerm,
  departmentId,
  cityId,
  status,
  sortBy
}) {
  const token = await getCurrentUserToken();
  const queryParams = serializeToUri({
    page,
    searchTerm,
    departmentId,
    cityId,
    status,
    sortBy
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

  // eslint-disable-next-line
  console.log("response was:", data);

  return data;
}

export default function useFilterMember({ page }) {
  return useQuery([FILTER_MEMBER_QUERY_ID, page], () =>
    fetchFilteredMembers({ page })
  );
}

const searchInitialState = {
  status: "",
  departmentId: "",
  cityId: "",
  searchTerm: "",
  trigger: false,
  fetching: false
};

// const validName = new RegExp(
//   "^[A-Za-zñÑäÄëËïÏöÖüÜáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ]+$"
// );
// const validRuc = new RegExp("^([0-9]*)-[0-9]$");

function searchReducer(state, action) {
  if (action.type === "trigger") {
    const { searchTerm, departmentId, cityId, status } = action;
    return {
      ...state,
      searchTerm,
      departmentId: departmentId,
      cityId: cityId,
      status: status,
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
  throw new Error(`Not recognized action type ${action.type}`);
}

export function useFilterMemberPaginated() {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState();
  const [state, dispatch] = useReducer(searchReducer, searchInitialState);

  const { data, isFetching, isPreviousData, ...restUseQueryResult } = useQuery(
    [
      FILTER_MEMBER_PAGED_QUERY_ID,
      page,
      sortBy,
      state.searchTerm,
      state.departmentId,
      state.cityId,
      state.status
    ],
    () => {
      dispatch({ type: "fetching" });
      return fetchFilteredMembers({
        page,
        searchTerm: state.searchTerm,
        departmentId: state.departmentId,
        cityId: state.cityId,
        status: state.status,
        sortBy
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

  const onSearch = ({ searchTerm, departmentId, cityId, status }) => {
    setPage(1);
    dispatch({ type: "trigger", searchTerm, departmentId, cityId, status });
  };

  const onClear = () => {
    setPage(1);
    setSortBy(null);
    dispatch({ type: "clear" });
  };

  const onSortBy = (column, isSorted, isSortedDesc) => {
    if (!isSorted) {
      // resets sorting on this column
      setSortBy(null);
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
    ...restUseQueryResult
  };
}
