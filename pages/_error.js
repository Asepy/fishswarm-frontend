import React from "react";
import { Button, Heading, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ErrorIcon from "components/ui/svg/ErrorIcon";

export default function _error() {
  const router = useRouter();
  return (
    <VStack
      spacing={4}
      height="100%"
      alignItems="center"
      justifyContent={"center"}
    >
      <ErrorIcon boxSize="400px"></ErrorIcon>
      <Heading size="2xl">¡Oops!</Heading>
      <Heading size="lg" color="gray.500" fontWeight="semibold">
        Algo salió mal de nuestro lado.
      </Heading>
      <Button onClick={() => router.back()} variant="primary">
        Volver a Intentar
      </Button>
    </VStack>
  );
}
