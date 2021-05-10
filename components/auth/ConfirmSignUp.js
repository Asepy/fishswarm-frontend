import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
} from "@chakra-ui/react";
import Logo from "components/ui/Logo";

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
      <Button
        variant="primary"
        onClick={confirmSignUp}
        alignSelf="stretch"
        isLoading={isLoading}
      >
        Continuar
      </Button>
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
