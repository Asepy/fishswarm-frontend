import React from "react";
import {
  Button,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
  Heading,
  Stack,
  Textarea,
  Flex,
  Text,
  Tooltip,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast
} from "@chakra-ui/react";
import Auth from "@aws-amplify/auth";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { formatDistance, parseISO } from "date-fns";
import { es } from "date-fns/locale";

import MemberStatusTag from "./MemberStatusTag";
import { formatISODate } from "utils/helpers/date.helpers";
import { useSelectMemberStatus } from "hooks/components";
import { useUpdateMemberStatus } from "hooks/api";

export default function EditStatusModal({ onClose, member }) {
  const toast = useToast();
  const { isLoading, mutate } = useUpdateMemberStatus();
  const [message, setMessage] = React.useState();
  const [backOfficerEmail, setBackOfficerEmail] = React.useState();
  const { statusOptions, selectedStatus } = useSelectMemberStatus({
    currentStatus: member.status
  });

  React.useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      setBackOfficerEmail(currentUser.attributes.email);
    } catch (err) {
      console.error({ err });
    }
  }

  const handleSave = () => {
    const values = {
      status: selectedStatus,
      message,
      backOfficerEmail
    };
    mutate(
      { idNumber: member.id_number, values },
      {
        onError: (error) => {
          console.error(error.message);
          const errorMessage = error.message || "Ocurrió un error inesperado";
          toast({
            position: "top",
            title: "Error al cambiar el estado",
            description: errorMessage,
            status: "error",
            duration: 7000,
            isClosable: true
          });
        },
        onSuccess: () => {
          toast({
            position: "top",
            description: "Estado modificado correctamente",
            status: "success",
            duration: 7000,
            isClosable: true
          });
          setTimeout(onClose, 2000);
        }
      }
    );
  };
  return (
    <Modal isOpen={true} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent px={4}>
        <ModalHeader>Cambiar Estado</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={6}>
            <Stack>
              <HStack>
                <Heading size="md">
                  {member.name} {member.surname}
                </Heading>
                <MemberStatusTag status={member.status} />
              </HStack>

              <Flex fontSize="sm" color="gray.400" flexWrap="wrap">
                <Box as="span">Registrado</Box>
                &nbsp;
                <Box as="span" cursor="pointer" fontWeight="semibold">
                  <Tooltip
                    label={formatISODate(member.startDate, "dd-MM-yyyy HH:mm")}
                    aria-label="Fecha de registro"
                  >
                    {formatDistance(parseISO(member.startDate), new Date(), {
                      addSuffix: true,
                      locale: es
                    })}
                  </Tooltip>
                </Box>
              </Flex>
            </Stack>
            <Stack>
              <Flex justify="space-between">
                <Text>Cédula:</Text>
                <Text>{member.national_id}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text>Fecha de Nacimiento:</Text>
                <Text>{formatISODate(member.birthdate)}</Text>
              </Flex>
            </Stack>
            <Stack as="form" spacing={6}>
              <Menu matchWidth>
                <MenuButton
                  textAlign="left"
                  fontWeight="normal"
                  variant="outline"
                  color="gray.400"
                  as={Button}
                  rightIcon={<ChevronDownIcon fontSize="xl" />}
                >
                  {!selectedStatus ? (
                    "Seleccione el nuevo Estado"
                  ) : (
                    <MemberStatusTag selected={true} status={selectedStatus} />
                  )}
                </MenuButton>
                <MenuList>
                  {statusOptions.map((statusOption) => (
                    <MenuItem
                      value={statusOption.value}
                      key={statusOption.value}
                      onClick={statusOption.onClick}
                    >
                      <MemberStatusTag
                        selected={statusOption.selected}
                        status={statusOption.value}
                      />
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>

              <Textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="(Opcional) Mensaje adicional. Ejemplo: El socio no reúne los requisitos actuales."
              />
            </Stack>
          </Stack>
        </ModalBody>

        <ModalFooter mt={4}>
          <Button onClick={onClose} variant="ghost" mr={3}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            isLoading={isLoading}
            onClick={handleSave}
            isDisabled={!selectedStatus}
          >
            Guardar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
