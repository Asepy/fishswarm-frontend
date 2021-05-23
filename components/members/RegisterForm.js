import React from 'react';

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
  useToast,
  FormErrorMessage
} from '@chakra-ui/react';
import useCreateMember from 'utils/useCreateMember';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

export default function RegisterForm() {
  const toast = useToast();
  const { isLoading, mutate: createMember } = useCreateMember();
  const initialState = {
    name: '',
    surname: '',
    document: '',
    birthdate: '',
    sexo: '',
    departamento: '',
    city: '',
    email: '',
    cellphone: '',
    razonsocial: '',
    nfantasia: '',
    ruc: '',
    rubro: '',
    empleados: 0,
    sitioweb: '',
    facturacion: '',
    tarroMiel: ''
  };

  const CreateMemberSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es requerido'),
    surname: Yup.string().required('El apellido es requerido'),
    email: Yup.string()
      .email('Email inválido')
      .required('El email es requerido'),
    birthdate: Yup.string().required('La fecha de nacimiento es requerida'),
    document: Yup.string().required('La cédula es requerida'),
    cellphone: Yup.string().required('El número de celular es requerido'),
    ruc: Yup.string().required('El RUC es requerido')
  });

  const handleSubmit = async (e) => {
    createMember(e, {
      onError: (error) => {
        console.log(error.message);
        const errorMessage =
          error.message || 'Ocurrió un error durante el registro.';
        toast({
          position: 'top',
          title: 'Error durante el registro',
          description: errorMessage,
          status: 'error',
          duration: 9000,
          isClosable: true
        });
      },
      onSuccess: () => {
        toast({
          position: 'top',
          title: 'Registro creado',
          description: 'Hemos registrado sus datos.',
          status: 'success',
          duration: 9000,
          isClosable: true
        });
      }
    });
  };

  return (
    <Formik
      initialValues={initialState}
      validationSchema={CreateMemberSchema}
      onSubmit={(values) => handleSubmit(values)}>
      {(props) => (
        <Form name="form">
          <HStack spacing="4">
            <Tag
              size="md"
              borderRadius="full"
              variant="solid"
              colorScheme="green">
              <TagLabel>1</TagLabel>
            </Tag>
            <Heading fontSize={{ base: 'lg', md: 'xl' }}>
              Registro Personal
            </Heading>
          </HStack>
          <Stack
            spacing={{ base: '12px', md: '24px' }}
            my={8}
            pl={{ md: '10' }}>
            <Box display={{ md: 'flex' }}>
              <Field name="name">
                {({ field, form }) => (
                  <FormControl
                    id="name"
                    isInvalid={form.errors.name && form.touched.name}>
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
                    isInvalid={form.errors.surname && form.touched.surname}>
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
                  isInvalid={form.errors.document && form.touched.document}>
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
                  isInvalid={form.errors.birthdate && form.touched.birthdate}>
                  <FormLabel htmlFor="birthdate">Fecha de Nacimiento</FormLabel>
                  <Input id="birthdate" type="date" {...field} />
                  <FormErrorMessage>{form.errors.birthdate}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="sexo">
              {({ field, form }) => (
                <FormControl id="sexo">
                  <FormLabel>Sexo</FormLabel>
                  <Select placeholder="Sexo" name="sexo" {...field}>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                  </Select>
                </FormControl>
              )}
            </Field>
            <Box display={{ md: 'flex' }}>
              <Field name="departamento">
                {({ field, form }) => (
                  <FormControl id="departmento">
                    <FormLabel>Departamento</FormLabel>
                    <Select
                      placeholder="Seleccione departmento"
                      name="departamento"
                      {...field}>
                      <option value={'Capital'}>Capital</option>
                      <option value={'Concepción'}>Concepción</option>
                      <option value={'San Pedro'}>Capital</option>
                      <option value={'Coordillera'}>Coordillera</option>
                      <option value={'Guairá'}>Guairá</option>
                      <option value={'Caaguazú'}>Caaguazú</option>
                      <option value={'Caazapá'}>Caazapá</option>
                      <option value={'Itapúa'}>Itapúa</option>
                      <option value={'Misiones'}>Misiones</option>
                      <option value={'Paraguarí'}>Paraguarí</option>
                      <option value={'Alto Paraná'}>Alto Paraná</option>
                      <option value={'Central'}>Central</option>
                      <option value={'Ñeembucú'}>Ñeembucú</option>
                      <option value={'Amambay'}>Amambay</option>
                      <option value={'Canindeyú'}>Canindeyú</option>
                      <option value={'Pdte. Hayes'}>Pdte. Hayes</option>
                      <option value={'Alto Paraguay'}>Alto Paraguay</option>
                    </Select>
                  </FormControl>
                )}
              </Field>
              <Field name="city">
                {({ field, form }) => (
                  <FormControl id="city" ml={{ md: 4 }} mt={{ base: 4, md: 0 }}>
                    <FormLabel>Ciudad</FormLabel>
                    <Input type="text" name="city" />
                  </FormControl>
                )}
              </Field>
            </Box>
            <Field name="email">
              {({ field, form }) => (
                <FormControl
                  id="email"
                  isInvalid={form.errors.email && form.touched.email}>
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
                  isInvalid={form.errors.cellphone && form.touched.cellphone}>
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
            <Divider></Divider>
          </Stack>
          <HStack spacing="4">
            <Tag
              size="md"
              borderRadius="full"
              variant="solid"
              colorScheme="green">
              <TagLabel>2</TagLabel>
            </Tag>
            <Heading fontSize={{ base: 'lg', md: 'xl' }} mt="4">
              Registro del Emprendimiento
            </Heading>
          </HStack>
          <Stack
            spacing={{ base: '12px', md: '24px' }}
            mt="8"
            pl={{ md: '10' }}>
            <Field name="ruc">
              {({ field, form }) => (
                <FormControl
                  id="ruc"
                  isInvalid={form.errors.ruc && form.touched.ruc}>
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
            <Box display={{ md: 'flex' }}>
              <Field name="razonsocial">
                {({ field, form }) => (
                  <FormControl id="razonsocial">
                    <FormLabel>Razón Social</FormLabel>
                    <Input type="text" name="razonsocial" {...field} />
                  </FormControl>
                )}
              </Field>
              <Field name="nfantasia">
                {({ field, form }) => (
                  <FormControl
                    id="nfantasia"
                    ml={{ md: 4 }}
                    mt={{ base: 4, md: 0 }}>
                    <FormLabel>Nombre de Fantasía</FormLabel>
                    <Input type="text" name="nfantasia" {...field} />
                  </FormControl>
                )}
              </Field>
            </Box>
            <Field name="rubro">
              {({ field, form }) => (
                <FormControl id="rubro">
                  <FormLabel>Especifique el Rubro</FormLabel>
                  <Input type="text" name="rubro" {...field} />
                </FormControl>
              )}
            </Field>
            <Field name="empleados">
              {({ field, form }) => (
                <FormControl id="empleados">
                  <FormLabel>Cantidad de Empleados</FormLabel>
                  <Input
                    type="text"
                    name="empleados"
                    placeholder="7"
                    {...field}
                  />
                  <FormHelperText>
                    Cantidad de empleados (si no aplica: 0)
                  </FormHelperText>
                </FormControl>
              )}
            </Field>
            <Field name="facturacion">
              {({ field, form }) => (
                <FormControl id="facturacion">
                  <FormLabel>Facturación del 2010</FormLabel>
                  <Select name="facturacion" {...field}>
                    <option value={'Menor o igual a 650 millones Gs.'}>
                      Menor o igual a 650 millones Gs.
                    </option>
                    <option
                      value={'Entre 650 millones y 3.250 millones de Gs.'}>
                      Entre 650 millones y 3.250 millones de Gs.
                    </option>
                    <option
                      value={'Entre 3.250 millones y 7.700 millones de Gs.'}>
                      Entre 3.250 millones y 7.700 millones de Gs.
                    </option>
                    <option value={'Mayor a 7.700 millones Gs.'}>
                      Mayor a 7.700 millones Gs.
                    </option>
                  </Select>
                </FormControl>
              )}
            </Field>
            <Field name="sitioweb">
              {({ field, form }) => (
                <FormControl id="sitioweb">
                  <FormLabel>Sitio web o redes sociales</FormLabel>
                  <Input
                    type="text"
                    name="sitioweb"
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
              isLoading={isLoading}>
              Registrarse
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
