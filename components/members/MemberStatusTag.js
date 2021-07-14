import React from "react";
import { Spinner, Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

const statusMap = {
  ACTIVE: { label: "Activo", color: "green" },
  INACTIVE: { label: "Inactivo", color: "gray" },
  PENDING: { label: "Pendiente", color: "cyan" },
  CONDITIONAL: { label: "Condicional", color: "orange" }
};

function getUIMemberStatus(status) {
  return statusMap[status.toUpperCase()];
}

export default function MemberStatusTag({
  status,
  selected = false,
  loading = false
}) {
  const uiStatus = getUIMemberStatus(status);
  return (
    <Tag borderRadius="full" colorScheme={uiStatus.color}>
      {loading && <Spinner size="sm" mr={2} />}
      {selected && !loading && <TagLeftIcon as={CheckIcon}></TagLeftIcon>}
      <TagLabel>{uiStatus.label}</TagLabel>
    </Tag>
  );
}
