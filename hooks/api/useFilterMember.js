import { useState, useMemo, useReducer } from "react";
import { useQuery } from "react-query";
import { handleResponse, getCurrentUserToken } from "utils/helpers/api.helpers";
import { serializeToUri } from "utils/helpers/object.helpers";

export const FILTER_MEMBER_QUERY_ID = "query:filter-members";
export const FILTER_MEMBER_PAGED_QUERY_ID = "query:filter-members-paginated";

async function fetchFilteredMembers({
  page,
  searchTerm,
  departmentId,
  cityId,
  status,
  membershipType,
  sortBy,
  rubroId
}) {
  const token = await getCurrentUserToken();
  const queryParams = serializeToUri({
    page,
    searchTerm,
    departmentId,
    cityId,
    status,
    membershipType,
    sortBy,
    rubroId
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
  status: "",
  membershipType: "",
  departmentId: "",
  cityId: "",
  searchTerm: "",
  trigger: false,
  fetching: false,
  rubroId: ""
};

function searchReducer(state, action) {
  if (action.type === "trigger") {
    const {
      searchTerm,
      departmentId,
      cityId,
      status,
      membershipType,
      rubroId
    } = action;
    return {
      ...state,
      searchTerm,
      departmentId: departmentId,
      cityId: cityId,
      status: status,
      membershipType: membershipType,
      trigger: true,
      rubroId: rubroId
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
      state.status,
      state.membershipType,
      state.rubroId
    ],
    () => {
      dispatch({ type: "fetching" });
      return fetchFilteredMembers({
        page,
        searchTerm: state.searchTerm,
        departmentId: state.departmentId,
        cityId: state.cityId,
        status: state.status,
        membershipType: state.membershipType,
        sortBy,
        rubroId: state.rubroId
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
    dispatch({ type: "trigger", ...searchValues });
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
