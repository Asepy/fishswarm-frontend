import React from "react";
import { Center, Heading, Stack, HStack } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import { SearchIcon } from "@chakra-ui/icons";
import { Skeleton } from "@chakra-ui/skeleton";
import Link from "next/link";
import Container from "../components/ui/Container";
import BrandButton from "../components/ui/BrandButton";
import useForm from "../utils/useForm";
import useSearchMember from "../utils/useSearchMember";
import WaitingSearch from "../components/ui/svg/WaitingSearch";
import formatDate from "../utils/formatDate";
import BirthDatePicker from "../components/ui/BirthDatePicker";
import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";

export default function searchMember() {
  const [searchValues, setSearchValues] = React.useState({
    document: "",
    birthdate: "",
  });
  const { isLoading, data } = useSearchMember(searchValues);
  const { values, updateValue, updateValueByName } = useForm({
    document: "",
    birthdate: "",
  });
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValues({
      document: values.document,
      birthdate: formatDate(values.birthdate),
    });
  };
  console.log({ data });
  return (
    <Container>
      <Stack spacing="8">
        <Center flexDirection="column">
          <Heading size="md">
            Ingresá tus datos para saber si ya sos socio
          </Heading>
        </Center>
        <Center>
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
        </Center>
        <Skeleton isLoaded={!isLoading} height="400px">
          <Center>
            {!data && !isLoading && <WaitingSearch />}
            {data && !isLoading && <SearchResult result={data} />}
          </Center>
        </Skeleton>
      </Stack>
    </Container>
  );
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
        <Button size="md" bg="transparent" border="1px">
          Registrarse
        </Button>
      </Link>
    </Stack>
  );
}
