import React from "react";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import Logo from "components/ui/Logo";
import { Input } from "@chakra-ui/input";
import BrandButton from "components/ui/BrandButton";

export default function ConfirmSignUp({
  setUiState,
  onChange,
  confirmSignUp,
  isLoading,
  error,
}) {
  return (
    <>
      <Logo width="200px"></Logo>
      <Heading alignSelf="start" size="md">
        Confirmación de Registro
      </Heading>
      {error && <Text color="red.500">{error.message}</Text>}
      <FormControl>
        <FormLabel>Código de Confirmación</FormLabel>
        <Input
          name="authCode"
          variant="filled"
          placeholder="Código de Confirmación"
          onChange={onChange}
        ></Input>
      </FormControl>
      <BrandButton
        onClick={confirmSignUp}
        alignSelf="stretch"
        isLoading={isLoading}
      >
        Continuar
      </BrandButton>
      <Text mt="12" fontSize="sm">
        <Box
          as="span"
          onClick={() => setUiState("signIn")}
          role="button"
          cursor="pointer"
          color="pink.600"
        >
          Cancelar
        </Box>
      </Text>
    </>
  );
}
