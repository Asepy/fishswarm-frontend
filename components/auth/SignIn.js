import React from "react";
import { Box, Heading, Text } from "@chakra-ui/layout";
import Logo from "components/ui/Logo";
import { LockIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import BrandButton from "components/ui/BrandButton";

export default function SignIn({
  onChange,
  setUiState,
  signIn,
  error,
  isLoading,
}) {
  return (
    <>
      <Logo width="200px"></Logo>
      <LockIcon color="gray.400" w={8} h={8}></LockIcon>
      <Heading alignSelf="start" size="md">
        Acceso
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
      <BrandButton onClick={signIn} alignSelf="stretch" isLoading={isLoading}>
        Ingresar
      </BrandButton>
      <Text mt="12" fontSize="sm">
        ¿No tenés una cuenta?
        <Box
          as="span"
          onClick={() => setUiState("signUp")}
          role="button"
          cursor="pointer"
          color="pink.600"
          ml="2"
        >
          Registráte.
        </Box>
      </Text>
    </>
  );
}
