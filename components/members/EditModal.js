import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
  Button,
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
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { useForm } from "hooks/components";
import { useDepartments, useEditMember } from "hooks/api";
import EnterOrSelectRubro from "./EnterOrSelectRubro";

export default function EditModal({ closeModal, member }) {
  const toast = useToast();
  const { mutate: editMember, isLoading: saving } = useEditMember();
  const { values } = useForm({
    name: member?.name || "",
    surname: member?.surname || "",
    document: member?.national_id || "",
    birthdate: member?.birthdate || "",
    gender: member?.gender || "",
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
    annualTurnover: member?.annualTurnover || "",
    rubroId: member?.rubroId || "",
    memberDefinedRubro: member?.memberDefinedRubro || ""
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
          console.error(error.message);
          const errorMessage =
            error.message ||
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

  const { data: departments } = departmentResult;
  const { data: cities, status: citiesStatus } = citiesResult;

  return (
    <>
      <Modal
        title="holas"
        isOpen={true}
        onClose={closeModal}
        closeOnOverlayClick={false}
        size={["3xl"]}
      >
        <ModalOverlay />
        <ModalContent px={4}>
          <ModalHeader>Editar Miembro</ModalHeader>
          <ModalCloseButton />
          <ModalBody mt={4}>
            <Formik
              initialValues={values}
              validationSchema={MemberEditSchema}
              onSubmit={(values) => handleSubmit(values)}
            >
              {(props) => (
                <Form name="form">
                  <Stack spacing="24px">
                    <Heading fontSize={{ base: "lg", md: "xl" }}>
                      Información Personal
                    </Heading>
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
                      <Field name="gender">
                        {({ field, form }) => (
                          <FormControl id={"gender"}>
                            <FormLabel>Sexo</FormLabel>
                            <Select {...field} id="gender">
                              <option value="Masculino">Masculino</option>
                              <option value="Femenino">Femenino</option>
                            </Select>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="departmentId">
                        {({ field }) => (
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
                        {({ field }) => (
                          <FormControl id={"cityId"}>
                            <FormLabel>Ciudad</FormLabel>
                            <Select
                              {...field}
                              isDisabled={citiesStatus === "loading"}
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

                  <Stack spacing="24px" mt="8">
                    <Heading fontSize={{ base: "lg", md: "xl" }}>
                      Información del Emprendimiento
                    </Heading>
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
                        {({ field }) => (
                          <FormControl id={"businessName"}>
                            <FormLabel>Razón Social</FormLabel>
                            <Input {...field} name="businessName" />
                          </FormControl>
                        )}
                      </Field>
                      <Field name="fancyBusinessName">
                        {({ field }) => (
                          <FormControl id={"fancyBusinessName"}>
                            <FormLabel>Nombre de Fantasía</FormLabel>
                            <Input {...field} name="fancyBusinessName" />
                          </FormControl>
                        )}
                      </Field>
                      <FormControl id="rubroId">
                        <FormLabel>Rubro</FormLabel>
                        <EnterOrSelectRubro
                          selectName="rubroId"
                          enterName="memberDefinedRubro"
                        />
                      </FormControl>
                      <Field name="numberEmployees">
                        {({ field }) => (
                          <FormControl id={"numberEmployees"}>
                            <FormLabel>Cantidad de Empleados</FormLabel>
                            <Input {...field} name="numberEmployees" />
                            <FormHelperText>
                              Cantidad de empleados (si no aplica: 0)
                            </FormHelperText>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="annualTurnover">
                        {({ field }) => (
                          <FormControl id={"annualTurnover"}>
                            <FormLabel>Facturación del 2010</FormLabel>
                            <Select {...field} name="annualTurnover">
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
                        {({ field }) => (
                          <FormControl name="website">
                            <FormLabel>Sitio web o redes sociales</FormLabel>
                            <Input {...field} name="website" />
                          </FormControl>
                        )}
                      </Field>
                    </VStack>
                  </Stack>
                  <ModalFooter mt={4}>
                    <Button variant="ghost" mr={3} onClick={closeModal}>
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
