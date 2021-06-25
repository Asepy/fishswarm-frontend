import React from "react";
import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
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

export default function MemberStatusTag({ status, selected = false }) {
  const uiStatus = getUIMemberStatus(status);
  return (
    <Tag borderRadius="full" colorScheme={uiStatus.color}>
      {selected && <TagLeftIcon as={CheckIcon}></TagLeftIcon>}
      <TagLabel>{uiStatus.label}</TagLabel>
    </Tag>
  );
}
