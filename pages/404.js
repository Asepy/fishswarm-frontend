import React from "react";
import { Button, Heading, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import NotFoundIcon from "components/ui/svg/NotFoundIcon";
import { ArrowBackIcon } from "@chakra-ui/icons";

export default function page404() {
  const router = useRouter();
  return (
    <VStack
      spacing={4}
      height="100%"
      alignItems="center"
      justifyContent={"center"}
    >
      <NotFoundIcon boxSize="400px"></NotFoundIcon>
      <Heading size="xl">¡Oops!</Heading>
      <Heading size="lg" color="gray.500" fontWeight="semibold">
        La ruta que intentaste acceder no existe.
      </Heading>
      <Button
        onClick={() => router.back()}
        leftIcon={<ArrowBackIcon />}
        variant="primary"
      >
        Volver
      </Button>
    </VStack>
  );
}
