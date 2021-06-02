import { Box, Spinner } from "@chakra-ui/react";
import React from "react";

export default function LoadingOverlay({ isActive = false }) {
  return (
    <Box
      display={isActive ? "flex" : "none"}
      backgroundColor="rgba(255, 255, 255, 0.7)"
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      top={0}
      zIndex={9998}
      alignItems="center"
      justifyContent="center"
    >
      <Spinner />
    </Box>
  );
}
