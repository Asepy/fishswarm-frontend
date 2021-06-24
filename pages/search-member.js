import React from "react";
import Link from "next/link";
import {
  Button,
  SkeletonText,
  Heading,
  Input,
  Icon,
  Stack,
  HStack,
  VStack,
  Text,
  Box
} from "@chakra-ui/react";
import { ArrowForwardIcon, SearchIcon } from "@chakra-ui/icons";
import { AiOutlineSmile, AiOutlineFrown } from "react-icons/ai";
import BirthDatePicker from "components/ui/BirthDatePicker";
import Container from "components/ui/Container";
import WaitingSearchIcon from "components/ui/svg/WaitingSearchIcon";
import PublicLayout from "components/ui/layout/PublicLayout";
import useSearchMember from "utils/useSearchMember";
import useForm from "utils/useForm";
import allEmptyValues from "utils/allEmptyValues";
import Seo from "components/ui/layout/Seo";
import ErrorAlert from "components/ui/ErrorAlert";
import BenefitsLogos from "components/members/BenefitsLogos";

export default function searchMember() {
  const { values, updateValue, updateValueByName } = useForm({
    document: "",
    birthdate: ""
  });
  const { isLoading, data, refetch, error } = useSearchMember(values);

  const handleSearch = (e) => {
    e.preventDefault();
    refetch();
  };

  return (
    <PublicLayout>
      <Seo title="¿Soy Socio?"></Seo>
      <Container w={{ md: "container.md" }} centerContent py={4}>
        <Stack w="full" spacing="8">
          <Heading size="sm" textAlign="center">
            Ingresá tus datos para saber si ya sos socio
          </Heading>
          <form onSubmit={handleSearch}>
            <FieldsStack>
              <Input
                type="text"
                autoFocus
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
                width={{ base: "full", md: "auto" }}
              >
                Buscar
              </Button>
            </FieldsStack>
          </form>

          {error && <ErrorAlert>{error.message}</ErrorAlert>}
          <SkeletonText
            isLoaded={!isLoading}
            textAlign="center"
            alignItems="center"
            mt="4"
            noOfLines={4}
            spacing="4"
          >
            {(!data || allEmptyValues(values)) && (
              <WaitingSearchIcon mt={6} boxSize={{ base: "14rem", md: "xs" }} />
            )}
            {data && <SearchResult mt={6} result={data} />}
          </SkeletonText>
        </Stack>
      </Container>
    </PublicLayout>
  );
}

function FieldsStack({ children }) {
  return (
    <>
      <HStack spacing={4} display={{ base: "none", md: "flex" }}>
        {children}
      </HStack>
      <Stack spacing={4} display={{ md: "none" }}>
        {children}
      </Stack>
    </>
  );
}

function SearchResult({ result, ...rest }) {
  const { found } = result.data;
  if (found === true) {
    return (
      <>
        <VStack spacing="4" {...rest}>
          <Icon as={AiOutlineSmile} w={16} h={16} color="green.400"></Icon>
          <Heading size="md">
            ¡Felicidades! Ya estás registrado como miembro.
          </Heading>
          <Text fontSize="lg" textAlign="center">
            Estos son algunos de nuestros beneficios. Para ver más{" "}
            <Box
              as="a"
              color="blue.400"
              href="https://asepy.org/membresias/"
              target="__blank"
            >
              visitá nuestra sección de beneficios.
            </Box>
          </Text>
        </VStack>
        <BenefitsLogos mt={4} mb={12} />
      </>
    );
  }
  return (
    <VStack spacing="4" {...rest}>
      <Icon as={AiOutlineFrown} w={16} h={16} color="gray.400"></Icon>
      <Heading size="md">Aún no estas registrado.</Heading>
      <Text fontSize="lg" textAlign="center">
        Puedes utilizar el botón de abajo para hacerlo.
      </Text>
      <Link _hover={undefined} href="/">
        <Button
          rightIcon={<ArrowForwardIcon />}
          size="md"
          bg="transparent"
          border="1px"
          w="md"
        >
          Registrarse
        </Button>
      </Link>
    </VStack>
  );
}
