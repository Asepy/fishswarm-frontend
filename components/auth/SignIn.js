import React from "react";
import { Box, Button, Input, Divider, Heading, Text } from "@chakra-ui/react";
import { LockIcon } from "@chakra-ui/icons";
import Logo from "components/ui/Logo";
import NextLink from "next/link";

export default function SignIn({ onChange, signIn, error, isLoading }) {
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
      <Button
        variant="primary"
        onClick={signIn}
        alignSelf="stretch"
        isLoading={isLoading}
      >
        Ingresar
      </Button>

      <Divider></Divider>
      <NextLink href="/">
        <Box as="a" fontSize="sm" cursor="pointer">
          Asociáte como Miembro
        </Box>
      </NextLink>
    </>
  );
}
