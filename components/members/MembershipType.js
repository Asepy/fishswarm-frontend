import React from "react";
import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

const statusMap = {
  PLUS_PENDIENTE: {
    label: "Plus Pendiente",
    props: { colorScheme: "teal", variant: "outline" }
  },
  PLUS: {
    label: "Socio Plus",
    props: { colorScheme: "teal", variant: "solid" }
  }
};

function getUIMembership(status) {
  return statusMap[status.toUpperCase()];
}

export default function MembershipType({ membershipType, selected = false }) {
  const uiMembership = getUIMembership(membershipType);
  if (!uiMembership) {
    return null;
  }
  return (
    <Tag size="sm" {...uiMembership.props}>
      {selected && <TagLeftIcon as={CheckIcon}></TagLeftIcon>}
      <TagLabel>{uiMembership.label}</TagLabel>
    </Tag>
  );
}
