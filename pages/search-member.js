import React from "react";
import Link from "next/link";
import { Center, Heading, Stack, HStack } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import { ArrowForwardIcon, SearchIcon } from "@chakra-ui/icons";
import { SkeletonText } from "@chakra-ui/skeleton";
import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import BirthDatePicker from "components/ui/BirthDatePicker";
import Container from "components/ui/Container";
import BrandButton from "components/ui/BrandButton";
import WaitingSearch from "components/ui/svg/WaitingSearch";
import PublicLayout from "components/ui/layout/PublicLayout";
import useSearchMember from "utils/useSearchMember";
import useForm from "utils/useForm";

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
  console.log({ data });
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
              <BrandButton
                px="12"
                onClick={handleSearch}
                rightIcon={<SearchIcon />}
                isLoading={isLoading}
                type="submit"
              >
                Buscar
              </BrandButton>
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
            {(!data || allEmptyValues(values)) && <WaitingSearch />}
            {data && <SearchResult result={data} />}
          </SkeletonText>
        </Stack>
      </Container>
    </PublicLayout>
  );
}

function allEmptyValues(values) {
  return !Object.values(values).some(Boolean);
}
function SearchResult({ result }) {
  const { found } = result.data;
  if (found === "true") {
    return (
      <Center>
        <Alert status="success">
          <AlertIcon />
          Ya estas registrado como miembro. ¡Felicidades!
        </Alert>
      </Center>
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