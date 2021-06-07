import React from "react";

import {
  Box,
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
  Tag,
  TagLabel,
  useToast,
  FormErrorMessage
} from "@chakra-ui/react";
import useCreateMember from "utils/useCreateMember";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import useDepartments from "utils/useDepartments";
import { differenceInYears, parse } from "date-fns";

export default function RegisterForm(props) {
  const toast = useToast();
  const { isLoading, mutate: createMember } = useCreateMember();
  const initialState = {
    name: "",
    surname: "",
    document: "",
    birthdate: "",
    gender: "",
    deparmentId: "",
    cityId: "",
    email: "",
    cellphone: "",
    businessName: "",
    fancyBusinessName: "",
    ruc: "",
    sector: "",
    numberEmployees: 0,
    website: "",
    annualTurnover: "",
    tarroMiel: ""
  };

  const CreateMemberSchema = Yup.object().shape({
    name: Yup.string().required("El nombre es requerido"),
    surname: Yup.string().required("El apellido es requerido"),
    email: Yup.string()
      .email("Email inválido")
      .required("El email es requerido"),
    birthdate: Yup.string()
      .required("La fecha de nacimiento es requerida")
      .test("mayor-de-edad", "Debe ser mayor de 18 años", (value) => {
        const dateBorn = parse(value, "yyyy-MM-dd", new Date());
        const today = new Date();
        return differenceInYears(today, dateBorn) >= 18;
      }),
    document: Yup.string().required("La cédula es requerida"),
    cellphone: Yup.string()
      .required("El número de celular es requerido")
      .matches(/^09.*$/i, "Debe empezar con '09'")
      .length(10, "Mímimo 10 dígitos"),
    ruc: Yup.string().required("El RUC es requerido"),
    cityId: Yup.number().required("Ciudad es requerido")
  });

  const { citiesResult, updateDepartment } = useDepartments(
    {
      enabled: false
    },
    { staleTime: Infinity }
  );

  const handleSubmit = async (values) => {
    createMember(values, {
      onError: (error) => {
        console.error(error.message);
        const errorMessage =
          error.message || "Ocurrió un error durante el registro.";
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
    updateDepartment(e);
  };

  const { departments = [] } = props;
  const { data: cities, status: citiesStatus } = citiesResult;

  return (
    <Box>
      <Formik
        initialValues={initialState}
        validationSchema={CreateMemberSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {() => (
          <Form name="form">
            <HStack spacing="4">
              <Tag
                size="md"
                borderRadius="full"
                variant="solid"
                colorScheme="green"
              >
                <TagLabel>1</TagLabel>
              </Tag>
              <Heading fontSize={{ base: "lg", md: "xl" }}>
                Registro Personal
              </Heading>
            </HStack>
            <Stack
              spacing={{ base: "12px", md: "24px" }}
              my={8}
              pl={{ md: "10" }}
            >
              <Box display={{ md: "flex" }}>
                <Field name="name">
                  {({ field, form }) => (
                    <FormControl
                      id="name"
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <FormLabel>Nombres</FormLabel>
                      <Input type="text" placeholder="Juan José" {...field} />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="surname">
                  {({ field, form }) => (
                    <FormControl
                      id="surname"
                      ml={{ md: 4 }}
                      mt={{ base: 4, md: 0 }}
                      isInvalid={form.errors.surname && form.touched.surname}
                    >
                      <FormLabel>Apellidos</FormLabel>
                      <Input
                        type="text"
                        placeholder="Pérez Emprendedor"
                        name="surname"
                        {...field}
                      />
                      <FormErrorMessage>{form.errors.surname}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Box>
              <Field name="document">
                {({ field, form }) => (
                  <FormControl
                    id="document"
                    isInvalid={form.errors.document && form.touched.document}
                  >
                    <FormLabel>Cédula</FormLabel>
                    <Input
                      type="text"
                      placeholder="123456"
                      name="document"
                      {...field}
                    />
                    <FormErrorMessage>{form.errors.document}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="birthdate">
                {({ field, form }) => (
                  <FormControl
                    id="birthdate"
                    isInvalid={form.errors.birthdate && form.touched.birthdate}
                  >
                    <FormLabel htmlFor="birthdate">
                      Fecha de Nacimiento
                    </FormLabel>
                    <Input id="birthdate" type="date" {...field} />
                    <FormErrorMessage>{form.errors.birthdate}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="email">
                {({ field, form }) => (
                  <FormControl
                    id="email"
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel>E-mail</FormLabel>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      name="email"
                      {...field}
                    />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="cellphone">
                {({ field, form }) => (
                  <FormControl
                    id="cellphone"
                    isInvalid={form.errors.cellphone && form.touched.cellphone}
                  >
                    <FormLabel>Celular</FormLabel>
                    <Input
                      type="text"
                      placeholder="0991555555"
                      name="cellphone"
                      {...field}
                    />
                    <FormErrorMessage>{form.errors.cellphone}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Box display={{ md: "flex" }}>
                <Field name="deparmentId">
                  {({ field }) => (
                    <FormControl id="departmento">
                      <FormLabel>Departamento</FormLabel>
                      <Select
                        placeholder="Seleccione departmento"
                        name="deparmentId"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          onChangeDepartment(e);
                        }}
                      >
                        {departments.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </Field>
                <Field name="cityId">
                  {({ field, form }) => (
                    <FormControl
                      id="cityId"
                      ml={{ md: 4 }}
                      mt={{ base: 4, md: 0 }}
                      isDisabled={!cities || cities.length === 0}
                      isInvalid={form.errors.cityId && form.touched.cityId}
                    >
                      <FormLabel>Ciudad</FormLabel>
                      <Select
                        placeholder={
                          citiesStatus === "loading"
                            ? "Cargando..."
                            : "Seleccione ciudad"
                        }
                        name="cityId"
                        {...field}
                      >
                        {cities?.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </Select>
                      <FormErrorMessage>{form.errors.cityId}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Box>
              <Field name="gender">
                {({ field }) => (
                  <FormControl id="gender">
                    <FormLabel>Sexo (Opcional)</FormLabel>
                    <Select placeholder="Sexo" name="gender" {...field}>
                      <option value="Masculino">Masculino</option>
                      <option value="Femenino">Femenino</option>
                    </Select>
                  </FormControl>
                )}
              </Field>
              <Divider></Divider>
            </Stack>
            <HStack spacing="4">
              <Tag
                size="md"
                borderRadius="full"
                variant="solid"
                colorScheme="green"
              >
                <TagLabel>2</TagLabel>
              </Tag>
              <Heading fontSize={{ base: "lg", md: "xl" }} mt="4">
                Registro del Emprendimiento
              </Heading>
            </HStack>
            <Stack
              spacing={{ base: "12px", md: "24px" }}
              mt="8"
              pl={{ md: "10" }}
            >
              <Field name="ruc">
                {({ field, form }) => (
                  <FormControl
                    id="ruc"
                    isInvalid={form.errors.ruc && form.touched.ruc}
                  >
                    <FormLabel>RUC</FormLabel>
                    <Input
                      type="text"
                      placeholder="7777777-3"
                      name="ruc"
                      {...field}
                    />
                    <FormHelperText>
                      El único requisito para asociarte es contar con un RUC
                      activo.
                    </FormHelperText>
                    <FormErrorMessage>{form.errors.ruc}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="businessName">
                {({ field }) => (
                  <FormControl id="businessName">
                    <FormLabel>Razón Social (Opcional)</FormLabel>
                    <Input type="text" name="businessName" {...field} />
                  </FormControl>
                )}
              </Field>
              <Field name="fancyBusinessName">
                {({ field }) => (
                  <FormControl
                    id="fancyBusinessName"
                    ml={{ md: 4 }}
                    mt={{ base: 4, md: 0 }}
                  >
                    <FormLabel>Nombre de Fantasía (Opcional)</FormLabel>
                    <Input type="text" name="fancyBusinessName" {...field} />
                  </FormControl>
                )}
              </Field>
              <Field name="sector">
                {({ field }) => (
                  <FormControl id="sector">
                    <FormLabel>Especifique el Rubro (Opcional)</FormLabel>
                    <Input type="text" name="sector" {...field} />
                  </FormControl>
                )}
              </Field>
              <Field name="numberEmployees">
                {({ field }) => (
                  <FormControl id="numberEmployees">
                    <FormLabel>Cantidad de Empleados (Opcional)</FormLabel>
                    <Input
                      type="text"
                      name="numberEmployees"
                      placeholder="7"
                      {...field}
                    />
                    <FormHelperText>
                      Cantidad de empleados (si no aplica: 0)
                    </FormHelperText>
                  </FormControl>
                )}
              </Field>
              <Field name="annualTurnover">
                {({ field }) => (
                  <FormControl id="annualTurnover">
                    <FormLabel>Facturación del 2020 (Opcional)</FormLabel>
                    <Select name="annualTurnover" {...field}>
                      <option value={"Menor o igual a 650 millones Gs."}>
                        Menor o igual a 650 millones Gs.
                      </option>
                      <option
                        value={"Entre 650 millones y 3.250 millones de Gs."}
                      >
                        Entre 650 millones y 3.250 millones de Gs.
                      </option>
                      <option
                        value={"Entre 3.250 millones y 7.700 millones de Gs."}
                      >
                        Entre 3.250 millones y 7.700 millones de Gs.
                      </option>
                      <option value={"Mayor a 7.700 millones Gs."}>
                        Mayor a 7.700 millones Gs.
                      </option>
                    </Select>
                  </FormControl>
                )}
              </Field>
              <Field name="website">
                {({ field }) => (
                  <FormControl id="website">
                    <FormLabel>Sitio web o redes sociales (Opcional)</FormLabel>
                    <Input
                      type="text"
                      name="website"
                      placeholder="www.asepy.com"
                      {...field}
                    />
                  </FormControl>
                )}
              </Field>
              <Box my="8">
                <Divider></Divider>
              </Box>
              <Button
                variant="primary"
                mt="4"
                size="lg"
                type="submit"
                isLoading={isLoading}
              >
                Registrarse
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
