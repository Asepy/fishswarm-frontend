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
  FormErrorMessage,
  InputGroup
} from "@chakra-ui/react";
import { Field, Form, Formik, getIn } from "formik";
import * as Yup from "yup";
import { useDepartments, useCreateMember } from "hooks/api";
import EnterOrSelectRubro from "./EnterOrSelectRubro";
import PlusMembershipFields from "./PlusMemberShipFields";
import { PAYMENT_METHOD_OPTIONS } from "utils/constants";
import {
  formatDateMembers,
  isAdult,
  testValidDateMember
} from "utils/helpers/date.helpers";
import { useScrollTo } from "hooks/components";

const FIELDS_SPACING = { base: "12px", md: "24px" };
const FORM_SECTION_PADDING_LEFT = { md: "10" };

export default function RegisterForm(props) {
  const toast = useToast();
  const { scrollTo } = useScrollTo({ mass: 1, tension: 180, friction: 12 });

  const { isLoading, mutate: createMember } = useCreateMember();
  const initialState = {
    name: "",
    surname: "",
    document: "",
    birthdate: { day: "", month: "", year: "" },
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
    tarroMiel: "",
    rubroId: "",
    memberDefinedRubro: "",
    checkedPlus: false,
    plusBillingAddress: "",
    plusPaymentMethod: ""
  };

  const CreateMemberSchema = Yup.object().shape({
    name: Yup.string().required("El nombre es requerido"),
    surname: Yup.string().required("El apellido es requerido"),
    email: Yup.string()
      .email("Email inválido")
      .required("El email es requerido"),
    birthdate: Yup.object().shape({
      day: Yup.number()
        .typeError("Día debe ser un número")
        .required("Día es requerido")
        .test("valid-day", "Día inválido", (value) =>
          testValidDateMember({ day: value })
        ),
      month: Yup.number()
        .typeError("Mes debe ser un número")
        .required("Mes es requerido")
        .test("valid-month", "Mes inválido", (value) =>
          testValidDateMember({ month: value })
        ),
      year: Yup.number()
        .typeError("Año debe ser un número")
        .required("Año es requerido")
        .test("mayor-de-edad", "Debe ser mayor de 18 años", isAdult)
        .test("valid-year", "Año inválido", (value) =>
          testValidDateMember({ year: value })
        )
    }),
    document: Yup.string().required("La cédula es requerida"),
    cellphone: Yup.string()
      .required("El número de celular es requerido")
      .matches(/^09.*$/i, "Debe empezar con '09'")
      .length(10, "Mímimo 10 dígitos"),
    ruc: Yup.string().required("El RUC es requerido"),
    cityId: Yup.number().required("Ciudad es requerido"),
    checkedPlus: Yup.boolean(),
    plusBillingAddress: Yup.string().when("checkedPlus", {
      is: true,
      then: Yup.string().required("Dirección de facturación es requerida")
    }),
    plusPaymentMethod: Yup.string().when("checkedPlus", {
      is: true,
      then: Yup.string().required("Modalidad de pago es requerida")
    })
  });

  const { citiesResult, updateDepartment } = useDepartments(
    {
      enabled: false
    },
    { staleTime: Infinity }
  );

  const handleSubmit = async (values, actions) => {
    const { birthdate } = values;
    const processedValues = {
      ...values,
      birthdate: formatDateMembers(birthdate)
    };
    createMember(processedValues, {
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
        actions.resetForm();
        // scroll to top of form
        scrollTo();
      }
    });
  };

  const onChangeDepartment = (e) => {
    updateDepartment(e);
  };

  const { departments = [], rubros = [] } = props;
  const { data: cities, status: citiesStatus } = citiesResult;

  return (
    <Box>
      <Formik
        initialValues={initialState}
        validationSchema={CreateMemberSchema}
        onSubmit={(values, actions) => handleSubmit(values, actions)}
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
              spacing={FIELDS_SPACING}
              my={8}
              pl={FORM_SECTION_PADDING_LEFT}
            >
              <Box display={{ md: "flex" }}>
                <Field name="name">
                  {({ field, form }) => (
                    <FormControl
                      id="name"
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <FormLabel>Nombres</FormLabel>
                      <Input
                        autoFocus
                        type="text"
                        placeholder="Juan José"
                        {...field}
                      />
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
              <fieldset>
                <FormLabel>Fecha de Nacimiento</FormLabel>
                <InputGroup width="25%">
                  <Field name="birthdate.day">
                    {({ field, form }) => (
                      <FormControl
                        id="birthdate.day"
                        isInvalid={
                          getIn(form.errors, "birthdate.day") &&
                          getIn(form.touched, "birthdate.day")
                        }
                      >
                        <FormLabel fontSize="sm">Día</FormLabel>
                        <Input
                          width="16"
                          type="text"
                          placeholder="DD"
                          name="birthdate.day"
                          maxLength={2}
                          {...field}
                        />
                        <FormErrorMessage>
                          {getIn(form.errors, "birthdate.day")}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="birthdate.month">
                    {({ field, form }) => (
                      <FormControl
                        ml="4"
                        id="birthdate.month"
                        isInvalid={
                          getIn(form.errors, "birthdate.month") &&
                          getIn(form.touched, "birthdate.month")
                        }
                      >
                        <FormLabel fontSize="sm">Mes</FormLabel>
                        <Input
                          width="16"
                          type="text"
                          placeholder="MM"
                          name="birthdate.month"
                          maxLength={2}
                          {...field}
                        />
                        <FormErrorMessage>
                          {getIn(form.errors, "birthdate.month")}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="birthdate.year">
                    {({ field, form }) => (
                      <FormControl
                        ml="4"
                        id="birthdate.year"
                        isInvalid={
                          getIn(form.errors, "birthdate.year") &&
                          getIn(form.touched, "birthdate.year")
                        }
                      >
                        <FormLabel fontSize="sm">Año</FormLabel>
                        <Input
                          width="24"
                          type="text"
                          placeholder="AAAA"
                          maxLength={4}
                          name="birthdate.year"
                          {...field}
                        />
                        <FormErrorMessage>
                          {getIn(form.errors, "birthdate.year")}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </InputGroup>
              </fieldset>

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
                      maxLength={10}
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
                      <option value="Prefiero no decirlo">
                        Prefiero no decirlo
                      </option>
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
              spacing={FIELDS_SPACING}
              mt="8"
              pl={FORM_SECTION_PADDING_LEFT}
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
              <FormControl id="rubroId">
                <FormLabel>Rubro (Opcional)</FormLabel>
                <EnterOrSelectRubro
                  rubros={rubros}
                  selectName="rubroId"
                  enterName="memberDefinedRubro"
                ></EnterOrSelectRubro>
              </FormControl>
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
              <Divider></Divider>
            </Stack>
            <Stack
              spacing={FIELDS_SPACING}
              mt="8"
              pl={FORM_SECTION_PADDING_LEFT}
            >
              <PlusMembershipFields spacing={FIELDS_SPACING}>
                <Field name="plusPaymentMethod">
                  {({ field, form }) => (
                    <FormControl
                      id="plusPaymentMethod"
                      isInvalid={
                        form.errors.plusPaymentMethod &&
                        form.touched.plusPaymentMethod
                      }
                    >
                      <FormLabel>Modalidad de Pago</FormLabel>
                      <Select placeholder="Seleccione modalidad" {...field}>
                        {PAYMENT_METHOD_OPTIONS.map(({ value, label }) => (
                          <option value={value} key={value}>
                            {label}
                          </option>
                        ))}
                      </Select>
                      <FormErrorMessage>
                        {form.errors.plusPaymentMethod}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="plusBillingAddress">
                  {({ field, form }) => (
                    <FormControl
                      id="plusBillingAddress"
                      isInvalid={
                        form.errors.plusBillingAddress &&
                        form.touched.plusBillingAddress
                      }
                    >
                      <FormLabel>Dirección de Facturación</FormLabel>
                      <Input
                        placeholder="San Martin c/ Mcal. López 555"
                        {...field}
                      />
                      <FormErrorMessage>
                        {form.errors.plusBillingAddress}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </PlusMembershipFields>

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
