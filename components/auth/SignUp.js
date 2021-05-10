import React from "react";
import { Box, Button, Heading, Input, Text } from "@chakra-ui/react";
import Logo from "components/ui/Logo";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export default function SignUp({
  onChange,
  setUiState,
  signUp,
  isLoading,
  error,
}) {
  return (
    <>
      <Logo width="200px"></Logo>
      <Heading alignSelf="start" size="md">
        Registro de nueva cuenta
      </Heading>
      {error && <Text color="red.500">{error.message}</Text>}
      <Input
        name="email"
        variant="filled"
        type="email"
        placeholder="Email"
        onChange={onChange}
      ></Input>
      <Input
        name="password"
        variant="filled"
        type="password"
        placeholder="Password"
        onChange={onChange}
      ></Input>
      <Button
        variant="primary"
        onClick={signUp}
        alignSelf="stretch"
        isLoading={isLoading}
        rightIcon={<ArrowForwardIcon />}
      >
        Continuar
      </Button>
      <Text mt="12" fontSize="sm">
        ¿Ya tenés una cuenta?
        <Box
          as="span"
          onClick={() => setUiState("signIn")}
          role="button"
          cursor="pointer"
          color="pink.600"
          ml="2"
        >
          Ingresá.
        </Box>
      </Text>
    </>
  );
}
