import React from "react";
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
  Box, useToast
} from "@chakra-ui/react";
import useForm from "../../utils/useForm";
import {Form, Formik, Field} from "formik";
import BirthDatePicker from "components/ui/BirthDatePicker";
import useEditMember from "../../utils/useEditMember";

export default function EditModal({ closeModal, member }) {
  const toast = useToast();
  const { isLoading, mutate: editMember } = useEditMember();

  const { values, updateValue } = useForm({
    name: member?.name || "",
    surname: member?.surname || "",
    document: member?.national_id || "",
    birthdate: member?.birthdate || "",
    sex: member?.sex || "",
    departament: member?.department || "",
    city: member?.city || "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    editMember({ document: member.national_id, values: values }, {
      onError: (error) => {
        console.log(error.message);
        const errorMessage = "Ocurrió un error al editar los datos del usuario.";
        toast({
          position: "top",
          title: "Error al editar los datos del usuario.",
          description: errorMessage,
          status: "error",
          duration: 7000,
          isClosable: true,
        });
      },
      onSuccess: () => {
        toast({
          position: "top",
          title: "Datos modificados correctamente",
          description: "Se ha modificado correctamente los datos del usuario " + `${member.national_id}`,
          status: "success",
          duration: 7000,
          isClosable: true,
        });
      },
    });
    setTimeout(() => {
      closeModal();
    }, 5000);
  };

  return (
    <>
      <Modal isOpen={true} onClose={closeModal} closeOnOverlayClick={false} size={['3xl']}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={7}>
            <Formik initialValues={values}>
              {(props) => (
                <Form name="form">
                    <HStack spacing="4">
                      <Heading size="lg">Registro Personal</Heading>
                    </HStack>
                    <Stack spacing="24px" mt="8" pl="10">
                    <VStack>
                      <Field name="name">
                        {({ field, form }) => (
                          <FormControl id={"name"} onChange={updateValue}>
                            <FormLabel>Nombres</FormLabel>
                            <Input {...field} id="name" isRequired={true}/>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="surname">
                        {({ field, form }) => (
                          <FormControl id={"surname"} onChange={updateValue}>
                            <FormLabel>Apellidos</FormLabel>
                            <Input {...field} id="surname" isRequired={true}/>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="document">
                        {({ field, form}) => (
                          <FormControl id={"document"} onChange={updateValue}>
                            <FormLabel>Cédula</FormLabel>
                            <Input {...field} id="document" isRequired={true}/>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="birthdate">
                        {({ field, form}) => (
                          <FormControl id={"birthdate"} onChange={updateValue}>
                            <FormLabel htmlFor="birthdate">Fecha de Nacimiento</FormLabel>
                            <BirthDatePicker
                                {...field}
                                id="birthdate"
                                isRequired={true}
                            />
                          </FormControl>
                        )}
                      </Field>
                      <Field name="sex">
                        {({ field, form}) => (
                          <FormControl id={"sex"} onChange={updateValue}>
                            <FormLabel>Sexo</FormLabel>
                            <Select {...field}
                                    id="sex">
                              <option value="Masculino">Masculino</option>
                              <option value="Femenino">Femenino</option>
                            </Select>
                          </FormControl>
                        )}
                      </Field>
                        <Field name="departament">
                          {({ field, form}) => (
                            <FormControl id={"department"} onChange={updateValue}>
                              <FormLabel>Departamento</FormLabel>
                              <Select {...field}
                                      id="departament">
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
                          )}
                        </Field>
                        <Field name="city">
                          {({ field, form}) => (
                            <FormControl id={"city"} onChange={updateValue}>
                              <FormLabel>Ciudad</FormLabel>
                              <Input {...field} id="city"/>
                            </FormControl>
                           )}
                        </Field>
                      <Field name="email">
                        {({ field, form}) => (
                          <FormControl id={"email"} onChange={updateValue}>
                            <FormLabel>E-mail</FormLabel>
                            <Input {...field} type="email" id="email"/>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="cellphone">
                        {({ field, form}) => (
                          <FormControl id={"cellphone"} onChange={updateValue}>
                            <FormLabel>Celular</FormLabel>
                            <Input {...field} name="cellphone"/>
                          </FormControl>
                        )}
                      </Field>
                    </VStack>
                  </Stack>
                  <Box my="8">
                    <Divider></Divider>
                  </Box>
                  <HStack spacing="4">
                    <Heading size="lg" mt="4">Registro del Emprendimiento</Heading>
                  </HStack>
                  <Stack spacing="24px" mt="8" pl="10">
                    <VStack>
                      <Field name="ruc">
                        {({ field, form}) => (
                          <FormControl id={"ruc"} onChange={updateValue}>
                            <FormLabel>RUC</FormLabel>
                            <Input {...field} name="ruc" isRequired={true}/>
                            <FormHelperText>
                              El único requisito para asociarte es contar con un RUC activo.
                            </FormHelperText>
                          </FormControl>
                        )}
                      </Field>
                      <HStack spacing="4">
                        <Field name="businessName">
                          {({ field, form}) => (
                            <FormControl id={"businessName"} onChange={updateValue}>
                              <FormLabel>Razón Social</FormLabel>
                              <Input {...field} name="businessName"/>
                            </FormControl>
                          )}
                        </Field>
                        <Field name="fancyBusinessName">
                          {({ field, form}) => (
                            <FormControl id={"fancyBusinessName"} onChange={updateValue}>
                              <FormLabel>Nombre de Fantasía</FormLabel>
                              <Input {...field} name="fancyBusinessName"/>
                            </FormControl>
                          )}
                        </Field>
                      </HStack>
                      <Field name="sector">
                        {({ field, form}) => (
                          <FormControl id={"sector"} onChange={updateValue}>
                            <FormLabel>Especifique el Rubro</FormLabel>
                            <Input {...field} name="sector"/>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="numberEmployees">
                        {({ field, form}) => (
                          <FormControl id={"numberEmployees"} onChange={updateValue}>
                            <FormLabel>Cantidad de Empleados</FormLabel>
                            <Input {...field} name="numberEmployees"/>
                            <FormHelperText>
                              Cantidad de empleados (si no aplica: 0)
                            </FormHelperText>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="anualTurnover">
                        {({ field, form}) => (
                          <FormControl id={"anualTurnover"} onChange={updateValue}>
                            <FormLabel>Facturación del 2010</FormLabel>
                            <Select {...field} name="anualTurnover">
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
                        )}
                      </Field>
                      <Field name="website">
                        {({ field, form}) => (
                          <FormControl onChange={updateValue}>
                            <FormLabel>Sitio web o redes sociales</FormLabel>
                            <Input {...field} name="website"/>
                          </FormControl>
                        )}
                      </Field>
                    </VStack>
                  </Stack>
                </Form>
              )}
            </Formik>
          </ModalBody>
          <ModalFooter>
            <Button variant={"outline"}
                    mr={3}
                    onClick={closeModal}>
              Cancelar
            </Button>
            <Button variant="primary"
                    onClick={handleSubmit}
                    isLoading={isLoading}>
              Editar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
