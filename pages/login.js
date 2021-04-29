import React from "react";
import {
  Box,
  Flex,
  FormControl,
  Heading,
  VStack,
  Input,
} from "@chakra-ui/react";
import Logo from "../components/ui/Logo";
import BrandButton from "../components/ui/BrandButton";
import { LockIcon } from "@chakra-ui/icons";

export default function login() {
  return (
    <Flex
      flexDirection="column"
      bg="gray.100"
      minHeight="100%"
      justifyContent="center"
      alignItems="center"
    >
      <VStack bgColor="white" minW="400px" boxShadow="md" p="4" spacing="4">
        <Box as="a" textAlign="center" href="asepy.org">
          <Logo w="200px"></Logo>
        </Box>
        <LockIcon w="8" h="8" />
        <Heading as="h1" size="md" textAlign="left">
          Acceso
        </Heading>
        <FormControl>
          <Input type="email" placeholder="Email"></Input>
        </FormControl>
        <FormControl>
          <Input type="password" placeholder="Password"></Input>
        </FormControl>
        <BrandButton minW="100%" size="lg">
          Ingresar
        </BrandButton>
      </VStack>
    </Flex>
  );
}
