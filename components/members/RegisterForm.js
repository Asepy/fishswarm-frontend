import React from "react";

import {
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Stack,
  Input,
  HStack,
  Heading,
  Select,
  Divider,
  Box,
  Tag,
  TagLabel,
  useToast
} from "@chakra-ui/react";
import BirthDatePicker from "components/ui/BirthDatePicker";
import useForm from "utils/useForm";
import useCreateMember from "utils/useCreateMember";

export default function RegisterForm(props) {
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
    tarroMiel: ""
  });
  const [cities, setCities] = React.useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createMember(values, {
      onError: (error) => {
        const errorMessage =
          error.message || "Ocurrió un error durante el registro.";
        console.error({ errorMessage });
        toast({
          position: "top",
          title: "Error durante el registro",
          description: errorMessage,
          status: "error",
          duration: 9000,
          isClosable: true
        });
      },
      onSuccess: () => {
        toast({
          position: "top",
          title: "Registro creado",
          description: "Hemos registrado sus datos.",
          status: "success",
          duration: 9000,
          isClosable: true
        });
      }
    });
  };
  const onChangeDepartment = (e) => {
    updateValue(e);
    const selectedDep = e.target.value;
    setCities(props.citiesByDep[selectedDep]);
  };
  const { departments = [] } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Input
        id="tarroMiel"
        type="text"
        name="tarroMiel"
        value={values.tarroMiel}
        onChange={updateValue}
        display="none"
      />
      <HStack spacing="4">
        <Tag size="md" borderRadius="full" variant="solid" colorScheme="green">
          <TagLabel>1</TagLabel>
        </Tag>
        <Heading fontSize={{ base: "lg", md: "xl" }}>Registro Personal</Heading>
      </HStack>
      <Stack spacing={{ base: "12px", md: "24px" }} my={8} pl={{ md: "10" }}>
        <Box display={{ md: "flex" }}>
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
          <FormControl id="surname" ml={{ md: 4 }} mt={{ base: 4, md: 0 }}>
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
        </Box>
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
          <BirthDatePicker
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
            onChange={updateValue}>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </Select>
        </FormControl>

        <Box display={{ md: "flex" }}>
          <FormControl id="departmento">
            <FormLabel>Departamento</FormLabel>
            <Select
              placeholder="Seleccione departmento"
              name="departamento"
              value={values.departamento}
              onChange={onChangeDepartment}>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl id="city" ml={{ md: 4 }} mt={{ base: 4, md: 0 }}>
            <FormLabel>Ciudad</FormLabel>
            <Select name="cityId" value={values.city} onChange={updateValue}>
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Box>
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
        <Divider></Divider>
      </Stack>
      <HStack spacing="4">
        <Tag size="md" borderRadius="full" variant="solid" colorScheme="green">
          <TagLabel>2</TagLabel>
        </Tag>
        <Heading fontSize={{ base: "lg", md: "xl" }} mt="4">
          Registro del Emprendimiento
        </Heading>
      </HStack>
      <Stack spacing={{ base: "12px", md: "24px" }} mt="8" pl={{ md: "10" }}>
        <FormControl id="ruc">
          <FormLabel>RUC</FormLabel>
          <Input
            type="text"
            placeholder="7777777-3"
            name="ruc"
            value={values.ruc}
            onChange={updateValue}
            isRequired
          />
          <FormHelperText>
            El único requisito para asociarte es contar con un RUC activo.
          </FormHelperText>
        </FormControl>
        <Box display={{ md: "flex" }}>
          <FormControl id="razonsocial">
            <FormLabel>Razón Social</FormLabel>
            <Input
              type="text"
              name="razonsocial"
              value={values.razonsocial}
              onChange={updateValue}
            />
          </FormControl>
          <FormControl id="nfantasia" ml={{ md: 4 }} mt={{ base: 4, md: 0 }}>
            <FormLabel>Nombre de Fantasía</FormLabel>
            <Input
              type="text"
              name="nfantasia"
              value={values.nfantasia}
              onChange={updateValue}
            />
          </FormControl>
        </Box>

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
            onChange={updateValue}>
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
          variant="primary"
          mt="4"
          size="lg"
          type="submit"
          isLoading={isLoading}>
          Registrarse
        </Button>
      </Stack>
    </form>
  );
}
