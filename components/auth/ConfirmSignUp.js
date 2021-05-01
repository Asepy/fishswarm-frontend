import React from "react";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/layout";
import Logo from "components/ui/Logo";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import BrandButton from "components/ui/BrandButton";
import { FormControl } from "@chakra-ui/form-control";

export default function ConfirmSignUp({ setUiState, onChange, confirmSignUp }) {
  return (
    <>
      <Logo width="200px"></Logo>
      <Heading alignSelf="start" size="md">
        Confirmación de Registro
      </Heading>
      {/* {error && <Text color="red.500">{error.message}</Text>} */}
      <FormControl>
        <FormLabel>Código de Confirmación</FormLabel>
        <Input
          name="email"
          variant="filled"
          type="email"
          placeholder="Código de Confirmación"
          onChange={onChange}
        ></Input>
      </FormControl>
      <BrandButton
        onClick={confirmSignUp}
        alignSelf="stretch"
        // isLoading={isLoading}
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
