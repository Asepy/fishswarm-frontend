import React from "react";
import { Spinner, Tag, TagLabel, TagLeftIcon, Tooltip } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

const PLUS_DESCRIPTION =
  "Los socios Plus aportan 100.000 Gs mensuales. Esto permite que ASEPY pueda sostener su operación y colaborar en que Paraguay sea un mejor ecosistema para emprender.";

const membershipMap = {
  PLUS_PENDIENTE: {
    label: "Plus Pendiente",
    props: { colorScheme: "teal", variant: "outline" },
    tooltipLabel:
      "Tu solicitud para volverte Socio Plus está en estado pendiente de aprobarse."
  },
  PLUS: {
    label: "Socio Plus",
    props: { colorScheme: "teal", variant: "solid" },
    tooltipLabel: PLUS_DESCRIPTION
  }
};

function getUIMembership(membership) {
  return membershipMap[membership.toUpperCase()];
}

export default function MembershipType({
  membershipType,
  selected = false,
  loading = false,
  tooltipDisabled = true,
  ...restProps
}) {
  const uiMembership = getUIMembership(membershipType);
  if (!uiMembership) {
    return null;
  }
  return (
    <Tooltip
      isDisabled={tooltipDisabled}
      aria-label="Información de membresía"
      label={uiMembership.tooltipLabel}
    >
      <Tag
        cursor={tooltipDisabled ? null : "pointer"}
        {...restProps}
        {...uiMembership.props}
      >
        {loading && <Spinner size="sm" mr={2} />}
        {selected && !loading && <TagLeftIcon as={CheckIcon}></TagLeftIcon>}
        <TagLabel>{uiMembership.label}</TagLabel>
      </Tag>
    </Tooltip>
  );
}
