import React from "react";
import packageJson from "package.json";
import { Text } from "@chakra-ui/react";

export default function Version() {
  return (
    <Text fontSize="xs" fontWeight="light">
      Versión {packageJson.version}
    </Text>
  );
}
