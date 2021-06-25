import { useState } from "react";

export function useTable({ columns }) {
  const [headersInternal, setHeadersInternal] = useState(() => {
    return columns.reduce((prev, curr) => {
      return {
        ...prev,
        [curr.accessor]: {
          accessor: curr.accessor,
          key: `header_${curr.accessor}`,
          isSorted: false,
          isSortedDesc: undefined,
          title: curr.title,
          getHeaderProps: () => ({
            isNumeric: curr.isNumeric,
            onClick: curr.sortable ? getOnHeaderClick(curr) : undefined,
            role: "columnHeader",
            style: { cursor: curr.sortable ? "pointer" : undefined },
            textAlign: curr.textAlign
          })
        }
      };
    }, {});
  }, columns);

  function getHeaders() {
    return Object.values(headersInternal).map((header) => ({
      ...header
    }));
  }

  function getNextSortValues({ isSorted, isSortedDesc }) {
    if (isSorted === false && isSortedDesc === undefined) {
      // click 1 => sorted: true, isSortedDesc: false
      return {
        isSorted: true,
        isSortedDesc: false
      };
    }
    if (isSorted === true && isSortedDesc === false) {
      // click 2 => sorted: true, isSortedDesc: true,
      return {
        isSorted: true,
        isSortedDesc: true
      };
    }
    if (isSorted === true && isSortedDesc === true) {
      // click 3 => sorted: false, isSortedDesc: undefined
      return {
        isSorted: false,
        isSortedDesc: undefined
      };
    }
  }
  function getOnHeaderClick({ accessor }) {
    return () => {
      setHeadersInternal((prev) => {
        const newHeaders = { ...prev };

        // set previous sorted to false if any
        const prevSortedKey = Object.keys(prev).find(
          (key) => key !== accessor && prev[key].isSorted
        );
        if (prevSortedKey) {
          newHeaders[prevSortedKey] = {
            ...newHeaders[prevSortedKey],
            isSorted: false,
            isSortedDesc: undefined
          };
        }

        // set current selected col to sorted
        const sortedValues = getNextSortValues(newHeaders[accessor]);
        newHeaders[accessor] = {
          ...newHeaders[accessor],
          isSorted: sortedValues.isSorted,
          isSortedDesc: sortedValues.isSortedDesc
        };

        return newHeaders;
      });
    };
  }

  return { getHeaders, getNextSortValues };
}
