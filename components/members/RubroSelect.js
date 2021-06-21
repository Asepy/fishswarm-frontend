import React from "react";
import { Select } from "@chakra-ui/react";
import useRubros from "utils/useRubros";

export default function RubroSelect({ children, initialRubros, ...props }) {
  const {
    data,
    loading = false,
    error = null
  } = useRubros({
    initialRubros: initialRubros
  });
  console.log({ initialRubros });
  return (
    <Select isDisabled={loading || error} {...props}>
      {children}
      {data?.map((rubro) => (
        <option key={rubro.id} value={rubro.id}>
          {rubro.description}
        </option>
      ))}
    </Select>
  );
}
