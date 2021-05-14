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

  const { values } = useForm({
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

  const initialValues = {
    name: member.name != undefined ? member.name : "",
    surname: member.surname != undefined ? member.surname : "",
    document: member.national_id != undefined ? member.national_id : "",
    birthdate: member.birthdate != undefined ? member.birthdate : "",
    sexo: member.sex != undefined ? member.sex : "",
    departamento: member.department != undefined ? member.department : "",
    city: member.city != undefined ? member.city : "",
    email: member.mail_id != undefined ? member.mail_id : "",
    cellphone: member.cellphone != undefined ? member.cellphone : "",
    razonsocial: member.businessName != undefined ? member.businessName : "",
    nfantasia: member.fancyBusinessName != undefined ? member.fancyBusinessName : "",
    ruc: member.ruc != undefined ? member.ruc : "",
    sector: member.sector != undefined ? member.sector : "",
    empleados: member.numberEmployees != undefined ? member.numberEmployees : "",
    sitioweb: member.website != undefined ? member.website : "",
    facturacion: member.anualTurnover != undefined ? member.anualTurnover : "",
  };

  const setNewFormValues = (form) => {
    values.name = form.name;
    values.surname = form.surname;
    values.email = form.email;
    values.document = form.document;
    values.birthdate = form.birthdate
    values.sexo = form.sexo;
    values.departamento = form.departamento;
    values.city = form.city;
    values.cellphone = form.cellphone;
    values.razonsocial = form.razonsocial;
    values.nfantasia = form.nfantasia;
    values.ruc = form.ruc;
    values.rubro = form.rubro;
    values.empleados = form.empleados;
    values.sitioweb = form.sitioweb;
    values.facturacion = form.facturacion;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    editMember(values, {
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
            <Formik initialValues={initialValues}>
              {(props) => (
                <Form name="form" onChange={() => setNewFormValues(props.values)}>
                    <HStack spacing="4">
                      <Heading size="lg">Registro Personal</Heading>
                    </HStack>
                    <Stack spacing="24px" mt="8" pl="10">
                    <VStack>
                      <Field name="name">
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel>Nombres</FormLabel>
                            <Input {...field} id="name" isRequired={true}/>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="surname">
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel>Apellidos</FormLabel>
                            <Input {...field} id="surname" isRequired={true}/>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="document">
                        {({ field, form}) => (
                          <FormControl>
                            <FormLabel>Cédula</FormLabel>
                            <Input {...field} id="document" isRequired={true}/>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="birthdate">
                        {({ field, form}) => (
                          <FormControl>
                            <FormLabel htmlFor="birthdate">Fecha de Nacimiento</FormLabel>
                            <BirthDatePicker
                                {...field}
                                id="birthdate"
                                isRequired={true}
                            />
                          </FormControl>
                        )}
                      </Field>
                      <Field name="sexo">
                        {({ field, form}) => (
                          <FormControl>
                            <FormLabel>Sexo</FormLabel>
                            <Select {...field}
                                    id="sexo">
                              <option value="Masculino">Masculino</option>
                              <option value="Femenino">Femenino</option>
                            </Select>
                          </FormControl>
                        )}
                      </Field>
                        <Field name="departamento">
                          {({ field, form}) => (
                            <FormControl>
                              <FormLabel>Departamento</FormLabel>
                              <Select {...field}
                                      id="departamento">
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
                            <FormControl>
                              <FormLabel>Ciudad</FormLabel>
                              <Input {...field} id="city"/>
                            </FormControl>
                           )}
                        </Field>
                      <Field name="email">
                        {({ field, form}) => (
                          <FormControl>
                            <FormLabel>E-mail</FormLabel>
                            <Input {...field} type="email" id="email"/>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="cellphone">
                        {({ field, form}) => (
                          <FormControl>
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
                          <FormControl id="ruc">
                            <FormLabel>RUC</FormLabel>
                            <Input {...field} name="ruc" isRequired={true}/>
                            <FormHelperText>
                              El único requisito para asociarte es contar con un RUC activo.
                            </FormHelperText>
                          </FormControl>
                        )}
                      </Field>
                      <HStack spacing="4">
                        <Field name="razonsocial">
                          {({ field, form}) => (
                            <FormControl id="razonsocial">
                              <FormLabel>Razón Social</FormLabel>
                              <Input {...field} name="razonsocial"/>
                            </FormControl>
                          )}
                        </Field>
                        <Field name="nfantasia">
                          {({ field, form}) => (
                            <FormControl id="nfantasia">
                              <FormLabel>Nombre de Fantasía</FormLabel>
                              <Input {...field} name="nfantasia"/>
                            </FormControl>
                          )}
                        </Field>
                      </HStack>
                      <Field name="rubro">
                        {({ field, form}) => (
                          <FormControl>
                            <FormLabel>Especifique el Rubro</FormLabel>
                            <Input {...field} name="rubro"/>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="empleados">
                        {({ field, form}) => (
                          <FormControl>
                            <FormLabel>Cantidad de Empleados</FormLabel>
                            <Input {...field} name="empleados"/>
                            <FormHelperText>
                              Cantidad de empleados (si no aplica: 0)
                            </FormHelperText>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="facturacion">
                        {({ field, form}) => (
                          <FormControl >
                            <FormLabel>Facturación del 2010</FormLabel>
                            <Select {...field} name="facturacion">
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
                      <Field name="sitioweb">
                        {({ field, form}) => (
                          <FormControl>
                            <FormLabel>Sitio web o redes sociales</FormLabel>
                            <Input {...field} name="sitioweb"/>
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
