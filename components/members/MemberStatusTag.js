import React from "react";
import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";

import getUIMemberStatus from "utils/getUIMemberStatus";
import { CheckIcon } from "@chakra-ui/icons";

export default function MemberStatusTag({ status, selected = false }) {
  const uiStatus = getUIMemberStatus(status);
  return (
    <Tag borderRadius="full" colorScheme={uiStatus.color}>
      {selected && <TagLeftIcon as={CheckIcon}></TagLeftIcon>}
      <TagLabel>{uiStatus.label}</TagLabel>
    </Tag>
  );
}
