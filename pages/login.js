import { Flex, Heading, VStack } from "@chakra-ui/layout";
import React from "react";
import Logo from "components/ui/Logo";
import { LockIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import BrandButton from "../components/ui/BrandButton";

export default function login() {
  return (
    <Flex
      bgColor="gray.100"
      height="100%"
      alignItems="center"
      justifyContent={"center"}
    >
      <VStack
        bgColor="white"
        p={8}
        borderRadius="lg"
        borderWidth="thin"
        boxShadow="md"
        minW="400px"
        spacing={4}
      >
        <Logo width="200px"></Logo>
        <LockIcon color="gray.400" w={8} h={8}></LockIcon>
        <Heading alignSelf="start" size="md">
          Acceso
        </Heading>
        <Input variant="filled" type="email" placeholder="Email"></Input>
        <Input variant="filled" type="password" placeholder="Password"></Input>
        <BrandButton alignSelf="stretch">Ingresar</BrandButton>
      </VStack>
    </Flex>
  );
}
