import React from "react";
import { Spinner, Tag, TagLabel, TagLeftIcon, Tooltip } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

const PLUS_DESCRIPTION =
  "Los socios Plus aportan 100.000 Gs mensuales. Esto permite que ASEPY pueda sostener su operación y colaborar en que Paraguay sea un mejor ecosistema para emprender.";

export const membershipMap = {
  BASICO: {
    value: "BASICO",
    label: "Básico",
    props: { colorScheme: "minsk", variant: "outline" },
    tooltipLabel:
      "Miembros de asepy, que reciben los beneficios, y no poseen una cuota social."
  },
  PLUS_PENDIENTE: {
    value: "PLUS_PENDIENTE",
    label: "Plus Pendiente",
    props: { colorScheme: "teal", variant: "outline" },
    tooltipLabel:
      "El usuario se registró como socio plus, pero aún no fue aprobado."
  },
  PLUS: {
    value: "PLUS",
    label: "Plus",
    props: { colorScheme: "teal", variant: "solid" },
    tooltipLabel: PLUS_DESCRIPTION
  },
  EMBAJADOR: {
    value: "EMBAJADOR",
    label: "Embajador",
    props: { colorScheme: "stiletto", variant: "outline" },
    tooltipLabel:
      "Miembros de asepy, representan a la organización, pagan una cuota social mayor a los plus, votan en la asamblea."
  },
  FUNDADOR: {
    value: "FUNDADOR",
    label: "Fundador",
    props: { colorScheme: "apple", variant: "outline" },
    tooltipLabel:
      "Miembros de asepy, pagaron una cuota al comienzo para fundar la organización. Derecho a voto en la asamblea."
  },
  FUNDADOR_EMBAJADOR: {
    value: "FUNDADOR_EMBAJADOR",
    label: "Fundador Embajador",
    props: { colorScheme: "mule-fawn", variant: "outline" },
    tooltipLabel:
      "Miembros de asepy, pagaron una cuota al comienzo para fundar la organización. Derecho a voto en la asamblea. Siguen pagando una cuota como el embajador. Representan a la organización.M"
  }
};

function getUIMembership(membership) {
  return membershipMap[membership.toUpperCase()];
}

export function getMembershipTypesAsOptions(options = {}) {
  const { filterValue = null } = options;
  return Object.values(membershipMap)
    .filter((m) => m.value !== filterValue)
    .map(({ value, label }) => ({ value, label }));
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
