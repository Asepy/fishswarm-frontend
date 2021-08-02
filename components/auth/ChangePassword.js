import React from "react";
import { Button, Heading, Input, Text } from "@chakra-ui/react";
import Logo from "components/ui/Logo";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export default function ChangePassword({
  onChange,
  changePassword,
  isLoading,
  error
}) {
  return (
    <>
      <Logo width="200px"></Logo>
      <Heading alignSelf="start" size="md">
        Favor ingrese una nueva contraseña antes de ingresar
      </Heading>
      {error && <Text color="red.500">{error.message}</Text>}
      <Input
        name="newPassword"
        variant="filled"
        type="password"
        placeholder="Contraseña Nueva"
        onChange={onChange}
      ></Input>
      <Button
        variant="primary"
        onClick={changePassword}
        alignSelf="stretch"
        isLoading={isLoading}
        rightIcon={<ArrowForwardIcon />}
      >
        Continuar
      </Button>
    </>
  );
}
