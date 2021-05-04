import { Flex, Heading, Text, VStack } from "@chakra-ui/layout";
import React from "react";
import Logo from "components/ui/Logo";
import { LockIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import BrandButton from "../components/ui/BrandButton";

export default function login() {
  const [error, setError] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    const response = await fetch("/api/auth", {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(
          `${event.target.email.value}:${event.target.password.value}`
        )}`,
      },
    });

    if (response.ok) {
      const result = await response.json();
      localStorage.setItem("fishswarm:token", result.token);
      setIsLoading(false);
    } else {
      const error = await response.json();
      setError(new Error(error));
      setIsLoading(false);
    }
  }
  return (
    <Flex height="100%" alignItems="center" justifyContent={"center"}>
      <VStack
        rounded="lg"
        shadow="-16px 16px 32px #ededed, 16px -16px 32px #ffffff"
        maxW="360px"
        w="full"
        as="form"
        bgColor="white"
        p={8}
        spacing={4}
        onSubmit={handleSubmit}
      >
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
        ></Input>
        <Input
          name="password"
          variant="filled"
          type="password"
          placeholder="Password"
        ></Input>
        <BrandButton type="submit" alignSelf="stretch" isLoading={isLoading}>
          Ingresar
        </BrandButton>
      </VStack>
    </Flex>
  );
}
