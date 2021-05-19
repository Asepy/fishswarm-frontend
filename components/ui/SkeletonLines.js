import React from "react";
import { Skeleton, Stack } from "@chakra-ui/react";

export default function SkeletonLines({
  noOfLines = 1,
  thickness = "20px",
  ...rest
}) {
  return (
    <Stack {...rest}>
      {Array.from({ length: noOfLines }, (_, index) => (
        <Skeleton key={`${index}-${noOfLines}`} height={thickness} />
      ))}
    </Stack>
  );
}
