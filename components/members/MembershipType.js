import React from "react";
import { Spinner, Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

const membershipMap = {
  PLUS_PENDIENTE: {
    label: "Plus Pendiente",
    props: { colorScheme: "teal", variant: "outline" }
  },
  PLUS: {
    label: "Socio Plus",
    props: { colorScheme: "teal", variant: "solid" }
  }
};

function getUIMembership(membership) {
  return membershipMap[membership.toUpperCase()];
}

export default function MembershipType({
  membershipType,
  selected = false,
  loading = false,
  ...restProps
}) {
  const uiMembership = getUIMembership(membershipType);
  if (!uiMembership) {
    return null;
  }
  return (
    <Tag {...restProps} {...uiMembership.props}>
      {loading && <Spinner size="sm" mr={2} />}
      {selected && !loading && <TagLeftIcon as={CheckIcon}></TagLeftIcon>}
      <TagLabel>{uiMembership.label}</TagLabel>
    </Tag>
  );
}
