import React from "react";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Stack,
  Input,
  Grid,
  GridItem,
  HStack,
  Heading,
  Select,
  Divider,
  Box,
  Tag,
  TagLabel,
  Button,
  useToast,
} from "@chakra-ui/react";
import DatePicker from "../ui/DatePicker";
import useForm from "../../utils/useForm";
import useCreateMember from "../../utils/useCreateMember";

export default function RegisterForm() {
  const toast = useToast();
  const { isLoading, mutate: createMember } = useCreateMember();

  const { values, updateValue, updateValueByName } = useForm({
    name: "",
    surname: "",
    document: "",
    birthdate: "",
    sexo: "",
    departamento: "",
    city: "",
    email: "",
    cellphone: "",
    razonsocial: "",
    nfantasia: "",
    ruc: "",
    rubro: "",
    empleados: 0,
    sitioweb: "",
    facturacion: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ values });
    createMember(values, {
      onError: (error) => {
        const errorMessage =
          error.message || "Ocurrió un error durante el registro.";
        toast({
          title: "Error durante el registro",
          description: errorMessage,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      },
      onSuccess: () => {
        toast({
          title: "Registro creado",
          description: "Hemos registrado sus datos.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      },
    });
  };
  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={4} pb="16">
      <GridItem colSpan={3}>
        <form onSubmit={handleSubmit}>
          <HStack spacing="4">
            <Tag
              size="md"
              borderRadius="full"
              variant="solid"
              colorScheme="green"
            >
              <TagLabel>1</TagLabel>
            </Tag>
            <Heading size="lg" mt="4">
              Registro Personal
            </Heading>
          </HStack>
          <Stack spacing="24px" mt="8" pl="10">
            <HStack spacing="12px">
              <FormControl id="name">
                <FormLabel>Nombres</FormLabel>
                <Input
                  type="text"
                  placeholder="Juan José"
                  name="name"
                  value={values.name}
                  onChange={updateValue}
                  isRequired
                />
              </FormControl>
              <FormControl id="surname">
                <FormLabel>Apellidos</FormLabel>
                <Input
                  type="text"
                  placeholder="Pérez Emprendedor"
                  name="surname"
                  value={values.surname}
                  onChange={updateValue}
                  isRequired
                />
              </FormControl>
            </HStack>
            <FormControl id="document">
              <FormLabel>Cédula</FormLabel>
              <Input
                type="text"
                placeholder="123456"
                name="document"
                value={values.document}
                onChange={updateValue}
                isRequired
              />
            </FormControl>
            <FormControl id="birthdate">
              <FormLabel htmlFor="birthdate">Fecha de Nacimiento</FormLabel>
              <DatePicker
                id="birthdate"
                selectedDate={values.birthdate}
                onChange={(date) => updateValueByName("birthdate", date)}
                isRequired
              />
            </FormControl>
            <FormControl id="sexo">
              <FormLabel>Sexo</FormLabel>
              <Select
                placeholder="Sexo"
                name="sexo"
                value={values.sexo}
                onChange={updateValue}
              >
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </Select>
            </FormControl>

            <HStack spacing="12px">
              <FormControl id="departmento">
                <FormLabel>Departamento</FormLabel>
                <Select
                  placeholder="Seleccione departmento"
                  name="departamento"
                  value={values.departamento}
                  onChange={updateValue}
                >
                  <option value={"Capital"}>Capital</option>
                  <option value={"Concepción"}>Concepción</option>
                  <option value={"San Pedro"}>Capital</option>
                  <option value={"Coordillera"}>Coordillera</option>
                  <option value={"Guairá"}>Guairá</option>
                  <option value={"Caaguazú"}>Caaguazú</option>
                  <option value={"Caazapá"}>Caazapá</option>
                  <option value={"Itapúa"}>Itapúa</option>
                  <option value={"Misiones"}>Misiones</option>
                  <option value={"Paraguarí"}>Paraguarí</option>
                  <option value={"Alto Paraná"}>Alto Paraná</option>
                  <option value={"Central"}>Central</option>
                  <option value={"Ñeembucú"}>Ñeembucú</option>
                  <option value={"Amambay"}>Amambay</option>
                  <option value={"Canindeyú"}>Canindeyú</option>
                  <option value={"Pdte. Hayes"}>Pdte. Hayes</option>
                  <option value={"Alto Paraguay"}>Alto Paraguay</option>
                </Select>
              </FormControl>
              <FormControl id="city">
                <FormLabel>Ciudad</FormLabel>
                <Input
                  type="text"
                  name="city"
                  value={values.city}
                  onChange={updateValue}
                />
              </FormControl>
            </HStack>
            <FormControl id="email">
              <FormLabel>E-mail</FormLabel>
              <Input
                type="email"
                placeholder="john@example.com"
                name="email"
                value={values.email}
                onChange={updateValue}
              />
            </FormControl>
            <FormControl id="cellphone">
              <FormLabel>Celular</FormLabel>
              <Input
                type="text"
                placeholder="0991555555"
                name="cellphone"
                value={values.cellphone}
                onChange={updateValue}
              />
            </FormControl>
          </Stack>
          <Box my="8">
            <Divider></Divider>
          </Box>
          <HStack spacing="4">
            <Tag
              size="md"
              borderRadius="full"
              variant="solid"
              colorScheme="green"
            >
              <TagLabel>2</TagLabel>
            </Tag>
            <Heading size="lg" mt="4">
              Registro del Emprendimiento
            </Heading>
          </HStack>
          <Stack spacing="24px" mt="8" pl="10">
            <HStack spacing="4">
              <FormControl id="razonsocial">
                <FormLabel>Razón Social</FormLabel>
                <Input
                  type="text"
                  name="razonsocial"
                  value={values.razonsocial}
                  onChange={updateValue}
                />
              </FormControl>
              <FormControl id="nfantasia">
                <FormLabel>Nombre de Fantasía</FormLabel>
                <Input
                  type="text"
                  name="nfantasia"
                  value={values.nfantasia}
                  onChange={updateValue}
                />
              </FormControl>
            </HStack>
            <FormControl id="ruc">
              <FormLabel>RUC</FormLabel>
              <Input
                type="text"
                placeholder="7777777-3"
                name="ruc"
                value={values.ruc}
                onChange={updateValue}
              />
              <FormHelperText>
                El único requisito para asociarte es contar con un RUC activo.
              </FormHelperText>
            </FormControl>
            <FormControl id="rubro">
              <FormLabel>Especifique el Rubro</FormLabel>
              <Input
                type="text"
                name="rubro"
                value={values.rubro}
                onChange={updateValue}
              />
            </FormControl>
            <FormControl id="empleados">
              <FormLabel>Cantidad de Empleados</FormLabel>
              <Input
                type="text"
                name="empleados"
                placeholder="7"
                value={values.empleados}
                onChange={updateValue}
              />
              <FormHelperText>
                Cantidad de empleados (si no aplica: 0)
              </FormHelperText>
            </FormControl>
            <FormControl id="facturacion">
              <FormLabel>Facturación del 2010</FormLabel>
              <Select
                name="facturacion"
                value={values.facturacion}
                onChange={updateValue}
              >
                <option value={"Menor o igual a 650 millones Gs."}>
                  Menor o igual a 650 millones Gs.
                </option>
                <option value={"Entre 650 millones y 3.250 millones de Gs."}>
                  Entre 650 millones y 3.250 millones de Gs.
                </option>
                <option value={"Entre 3.250 millones y 7.700 millones de Gs."}>
                  Entre 3.250 millones y 7.700 millones de Gs.
                </option>
                <option value={"Mayor a 7.700 millones Gs."}>
                  Mayor a 7.700 millones Gs.
                </option>
              </Select>
            </FormControl>
            <FormControl id="sitioweb">
              <FormLabel>Sitio web o redes sociales</FormLabel>
              <Input
                type="text"
                name="sitioweb"
                placeholder="www.asepy.com"
                value={values.sitioweb}
                onChange={updateValue}
              />
            </FormControl>
            <Box my="8">
              <Divider></Divider>
            </Box>
            <Button
              mt="4"
              colorScheme="blackAlpha"
              size="lg"
              type="submit"
              isLoading={isLoading}
            >
              Registrarse
            </Button>
          </Stack>
        </form>
      </GridItem>
      <GridItem />
    </Grid>
  );
}
