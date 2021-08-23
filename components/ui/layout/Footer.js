import React from "react";
import { Flex, Stack } from "@chakra-ui/react";
import Container from "components/ui/Container";
import Logo from "components/ui/Logo";
import Version from "./Version";

export default function Footer(props) {
  return (
    <Flex
      as="footer"
      w="100%"
      justify="center"
      align="center"
      py={8}
      {...props}
    >
      <Container>
        <Stack spacing={2}>
          <Logo width="130px" />
          <Version />
        </Stack>
      </Container>
    </Flex>
  );
}
