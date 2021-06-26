import React from "react";
import { Select } from "@chakra-ui/react";
import { useRubros } from "hooks/api";

export default function RubroSelect({ children, initialRubros, ...props }) {
  const {
    data,
    loading = false,
    status = "",
    error = null
  } = useRubros({
    initialRubros: initialRubros
  });
  return (
    <Select isDisabled={loading || error || status === "loading"} {...props}>
      {status === "loading" && <option value="">Cargando...</option>}
      {children}
      {data?.map((rubro) => (
        <option key={rubro.id} value={rubro.id}>
          {rubro.description}
        </option>
      ))}
    </Select>
  );
}
