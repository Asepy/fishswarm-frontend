import React from "react";
import Link from "next/link";
import {
  Alert,
  AlertIcon,
  Button,
  SkeletonText,
  Heading,
  Input,
  Stack,
  HStack,
  VStack,
  Text,
  Box,
} from "@chakra-ui/react";
import { ArrowForwardIcon, SearchIcon } from "@chakra-ui/icons";
import BirthDatePicker from "components/ui/BirthDatePicker";
import Container from "components/ui/Container";
import WaitingSearchIcon from "components/ui/svg/WaitingSearchIcon";
import PublicLayout from "components/ui/layout/PublicLayout";
import useSearchMember from "utils/useSearchMember";
import useForm from "utils/useForm";
import allEmptyValues from "utils/allEmptyValues";

export default function searchMember() {
  const { values, updateValue, updateValueByName } = useForm({
    document: "",
    birthdate: "",
  });
  const { isLoading, data, refetch } = useSearchMember(values);
  const handleSearch = (e) => {
    e.preventDefault();
    refetch();
  };

  return (
    <PublicLayout>
      <Container centerContent>
        <Stack spacing="8">
          <Heading size="md" textAlign="center">
            Ingresá tus datos para saber si ya sos socio
          </Heading>
          <form onSubmit={handleSearch}>
            <HStack spacing="6">
              <Input
                value={values.document}
                onChange={updateValue}
                name="document"
                placeholder="Cédula"
                isRequired
              ></Input>
              <BirthDatePicker
                name="birthdate"
                placeholder="Fecha de Nacimiento"
                selectedDate={values.birthdate}
                onChange={(date) => updateValueByName("birthdate", date)}
              ></BirthDatePicker>
              <Button
                variant="primary"
                px="12"
                onClick={handleSearch}
                rightIcon={<SearchIcon />}
                isLoading={isLoading}
                type="submit"
              >
                Buscar
              </Button>
            </HStack>
          </form>

          <SkeletonText
            isLoaded={!isLoading}
            textAlign="center"
            alignItems="center"
            mt="4"
            noOfLines={4}
            spacing="4"
          >
            {(!data || allEmptyValues(values)) && (
              <WaitingSearchIcon boxSize="xs" />
            )}
            {data && <SearchResult result={data} />}
          </SkeletonText>
        </Stack>
      </Container>
    </PublicLayout>
  );
}

function SearchResult({ result }) {
  const { found } = result.data;
  if (found === "true") {
    return (
      <VStack spacing="8">
        <Alert status="success">
          <AlertIcon />
          ¡Felicidades! Ya estás registrado como miembro.
        </Alert>
        <Text fontWeight="semibold" size="md" textAlign="center">
          Podés consultar{" "}
          <Box
            as="a"
            color="blue.400"
            href="https://asepy.org/membresias/"
            target="__blank"
          >
            nuestra página
          </Box>{" "}
          para saber los beneficions que tienen nuestros socios.
        </Text>
      </VStack>
    );
  }
  return (
    <Stack spacing="8">
      <Alert status="warning">
        <AlertIcon></AlertIcon>
        Aún no estas registrado, puedes utilizar el botón de abajo para hacerlo
      </Alert>
      <Link _hover={undefined} href="/">
        <Button
          rightIcon={<ArrowForwardIcon />}
          size="md"
          bg="transparent"
          border="1px"
        >
          Registrarse
        </Button>
      </Link>
    </Stack>
  );
}
