import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  HStack,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  FormHelperText,
  Divider,
  Box,
  useToast,
  FormErrorMessage
} from "@chakra-ui/react";
import useForm from "../../utils/useForm";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import useEditMember from "../../utils/useEditMember";
import useDepartments from "utils/useDepartments";

export default function EditModal({ closeModal, member }) {
  const toast = useToast();
  const { mutate: editMember, isLoading: saving } = useEditMember();
  const { values } = useForm({
    name: member?.name || "",
    surname: member?.surname || "",
    document: member?.national_id || "",
    birthdate: member?.birthdate || "",
    sex: member?.sex || "",
    departmentId: member?.departmentId || "",
    cityId: member?.cityId || "",
    email: member?.mail_id || "",
    cellphone: member?.cellphone || "",
    businessName: member?.businessName || "",
    fancyBusinessName: member?.fancyBusinessName || "",
    ruc: member?.ruc || "",
    sector: member?.sector || "",
    numberEmployees: member?.numberEmployees || 0,
    website: member?.website || "",
    anualTurnover: member?.anualTurnover || ""
  });
  const { departmentResult, citiesResult, updateDepartment } = useDepartments({
    initialDepId: member?.departmentId
  });

  const MemberEditSchema = Yup.object().shape({
    name: Yup.string().required("El nombre es requerido"),
    surname: Yup.string().required("El apellido es requerido"),
    email: Yup.string()
      .email("Email inválido")
      .required("El email es requerido"),
    birthdate: Yup.date().required("La fecha de nacimiento es requerida"),
    document: Yup.string().required("La cédula es requerida"),
    cellphone: Yup.string().required("El número de celular es requerido"),
    ruc: Yup.string().required("El RUC es requerido")
  });

  const onChangeDepartment = (e) => {
    updateDepartment(e);
  };

  const handleSubmit = async (values) => {
    editMember(
      { idNumber: member.id_number, values },
      {
        onError: (error) => {
          console.log(error.message);
          const errorMessage =
            "Ocurrió un error al editar los datos del usuario.";
          toast({
            position: "top",
            title: "Error al editar los datos del usuario.",
            description: errorMessage,
            status: "error",
            duration: 7000,
            isClosable: true
          });
        },
        onSuccess: () => {
          toast({
            position: "top",
            title: "Datos modificados correctamente",
            description:
              "Se ha modificado correctamente los datos del usuario " +
              `${member.national_id}`,
            status: "success",
            duration: 7000,
            isClosable: true
          });
          setTimeout(() => {
            closeModal();
          }, 2000);
        }
      }
    );
  };

  const { data: departments, status: departmentStatus } = departmentResult;
  const { data: cities, status: citiesStatus } = citiesResult;

  console.log("departmentResult :: ", departmentResult);
  console.log("citiesResult :: ", citiesResult);
  console.log("cities :: ", cities);

  return (
    <>
      <Modal
        isOpen={true}
        onClose={closeModal}
        closeOnOverlayClick={false}
        size={["3xl"]}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={7}>
            <Formik
              initialValues={values}
              validationSchema={MemberEditSchema}
              onSubmit={(values) => handleSubmit(values)}
            >
              {(props) => (
                <Form name="form">
                  <HStack spacing="4">
                    <Heading size="lg">Registro Personal</Heading>
                  </HStack>
                  <Stack spacing="24px" mt="8" pl="10">
                    <VStack>
                      <Field name="name">
                        {({ field, form }) => (
                          <FormControl
                            id={"name"}
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <FormLabel>Nombres</FormLabel>
                            <Input {...field} id="name" />
                            <FormErrorMessage>
                              {form.errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="surname">
                        {({ field, form }) => (
                          <FormControl
                            id={"surname"}
                            isInvalid={
                              form.errors.surname && form.touched.surname
                            }
                          >
                            <FormLabel>Apellidos</FormLabel>
                            <Input {...field} id="surname" />
                            <FormErrorMessage>
                              {form.errors.surname}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="document">
                        {({ field, form }) => (
                          <FormControl
                            id={"document"}
                            isInvalid={
                              form.errors.document && form.touched.document
                            }
                          >
                            <FormLabel>Cédula</FormLabel>
                            <Input {...field} id="document" />
                            <FormErrorMessage>
                              {form.errors.document}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="birthdate">
                        {({ field, form }) => (
                          <FormControl
                            id={"birthdate"}
                            isInvalid={
                              form.errors.birthdate && form.touched.birthdate
                            }
                          >
                            <FormLabel htmlFor="birthdate">
                              Fecha de Nacimiento
                            </FormLabel>
                            <Input {...field} id="birthdate" type="date" />
                            <FormErrorMessage>
                              {form.errors.birthdate}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="sex">
                        {({ field, form }) => (
                          <FormControl id={"sex"}>
                            <FormLabel>Sexo</FormLabel>
                            <Select {...field} id="sex">
                              <option value="Masculino">Masculino</option>
                              <option value="Femenino">Femenino</option>
                            </Select>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="departmentId">
                        {({ field, form }) => (
                          <FormControl id="departmentId">
                            <FormLabel>Departamento</FormLabel>
                            <Select
                              placeholder="Seleccione departmento"
                              name="departmentId"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                onChangeDepartment(e);
                              }}
                            >
                              {departments?.map((d) => (
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
                          <FormControl id={"cityId"}>
                            <FormLabel>Ciudad</FormLabel>
                            <Select
                              {...field}
                              placeholder={
                                citiesStatus === "loading"
                                  ? "Cargando..."
                                  : "Seleccione ciudad"
                              }
                              name="cityId"
                            >
                              {cities?.map((c) => (
                                <option key={c.id} value={c.id}>
                                  {c.name}
                                </option>
                              ))}
                            </Select>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="email">
                        {({ field, form }) => (
                          <FormControl
                            id={"email"}
                            isInvalid={form.errors.email && form.touched.email}
                          >
                            <FormLabel>E-mail</FormLabel>
                            <Input {...field} type="email" id="email" />
                            <FormErrorMessage>
                              {form.errors.email}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="cellphone">
                        {({ field, form }) => (
                          <FormControl
                            id={"cellphone"}
                            isInvalid={
                              form.errors.cellphone && form.touched.cellphone
                            }
                          >
                            <FormLabel>Celular</FormLabel>
                            <Input {...field} name="cellphone" />
                            <FormErrorMessage>
                              {form.errors.cellphone}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </VStack>
                  </Stack>
                  <Box my="8">
                    <Divider></Divider>
                  </Box>
                  <HStack spacing="4">
                    <Heading size="lg" mt="4">
                      Registro del Emprendimiento
                    </Heading>
                  </HStack>
                  <Stack spacing="24px" mt="8" pl="10">
                    <VStack>
                      <Field name="ruc">
                        {({ field, form }) => (
                          <FormControl
                            id={"ruc"}
                            isInvalid={form.errors.ruc && form.touched.ruc}
                          >
                            <FormLabel>RUC</FormLabel>
                            <Input {...field} name="ruc" />
                            <FormHelperText>
                              El único requisito para asociarte es contar con un
                              RUC activo.
                            </FormHelperText>
                            <FormErrorMessage>
                              {form.errors.ruc}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="businessName">
                        {({ field, form }) => (
                          <FormControl id={"businessName"}>
                            <FormLabel>Razón Social</FormLabel>
                            <Input {...field} name="businessName" />
                          </FormControl>
                        )}
                      </Field>
                      <Field name="fancyBusinessName">
                        {({ field, form }) => (
                          <FormControl id={"fancyBusinessName"}>
                            <FormLabel>Nombre de Fantasía</FormLabel>
                            <Input {...field} name="fancyBusinessName" />
                          </FormControl>
                        )}
                      </Field>
                      <Field name="sector">
                        {({ field, form }) => (
                          <FormControl id={"sector"}>
                            <FormLabel>Especifique el Rubro</FormLabel>
                            <Input {...field} name="sector" />
                          </FormControl>
                        )}
                      </Field>
                      <Field name="numberEmployees">
                        {({ field, form }) => (
                          <FormControl id={"numberEmployees"}>
                            <FormLabel>Cantidad de Empleados</FormLabel>
                            <Input {...field} name="numberEmployees" />
                            <FormHelperText>
                              Cantidad de empleados (si no aplica: 0)
                            </FormHelperText>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="anualTurnover">
                        {({ field, form }) => (
                          <FormControl id={"anualTurnover"}>
                            <FormLabel>Facturación del 2010</FormLabel>
                            <Select {...field} name="anualTurnover">
                              <option
                                value={"Menor o igual a 650 millones Gs."}
                              >
                                Menor o igual a 650 millones Gs.
                              </option>
                              <option
                                value={
                                  "Entre 650 millones y 3.250 millones de Gs."
                                }
                              >
                                Entre 650 millones y 3.250 millones de Gs.
                              </option>
                              <option
                                value={
                                  "Entre 3.250 millones y 7.700 millones de Gs."
                                }
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
                        {({ field, form }) => (
                          <FormControl name="website">
                            <FormLabel>Sitio web o redes sociales</FormLabel>
                            <Input {...field} name="website" />
                          </FormControl>
                        )}
                      </Field>
                    </VStack>
                  </Stack>
                  <ModalFooter>
                    <Button variant="outline" mr={3} onClick={closeModal}>
                      Cancelar
                    </Button>
                    <Button type="submit" variant="primary" isLoading={saving}>
                      Guardar
                    </Button>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
