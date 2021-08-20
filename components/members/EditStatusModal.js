import React from "react";
import {
  Button,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  Heading,
  Stack,
  Flex,
  Text,
  Tooltip,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  useDisclosure
} from "@chakra-ui/react";
import Auth from "@aws-amplify/auth";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { formatDistance, parseISO } from "date-fns";
import { es } from "date-fns/locale";

import MemberStatusTag from "./MemberStatusTag";
import MembershipType from "./MembershipType";
import PageSection from "components/ui/PageSection";
import { formatISODate } from "utils/helpers/date.helpers";
import {
  useSelectMemberStatus,
  useSelectMembershipType
} from "hooks/components";
import { useUpdateMemberStatus, useUpdateMembershipType } from "hooks/api";
import { paymentMethodToLabel } from "utils/constants";

export default function EditStatusModal({ onClose, member }) {
  const [currentStatus, setCurrentStatus] = React.useState(member.status);
  const [currentMembership, setCurrentMembership] = React.useState(
    member.membershipType
  );

  return (
    <Modal isOpen={true} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent py={4}>
        <ModalHeader>
          Cambiar Estado <span>&#183;</span> {member.name} {member.surname}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <PageSection spacing={6} p={4}>
            <HStack>
              <Heading size="sm">Registro</Heading>
              <MemberStatusTag status={currentStatus} />
            </HStack>
            <Flex fontSize="sm" color="gray.400" flexWrap="wrap">
              <Box as="span">Registrado</Box>
              &nbsp;
              <Box as="span" cursor="pointer" fontWeight="semibold">
                {member.startDate ? (
                  <Tooltip
                    label={formatISODate(member.startDate, "dd-MM-yyyy HH:mm")}
                    aria-label="Fecha de registro"
                  >
                    {formatDistance(parseISO(member.startDate), new Date(), {
                      addSuffix: true,
                      locale: es
                    })}
                  </Tooltip>
                ) : null}
              </Box>
            </Flex>
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
              <MemberStatusSelect member={member} onChange={setCurrentStatus} />
            </Stack>
          </PageSection>
          <PageSection spacing={6} mt={4} p={4}>
            <HStack>
              <Heading size="sm">Membresía</Heading>
              <MembershipType membershipType={currentMembership} />
            </HStack>
            <Stack>
              <Flex justify="space-between">
                <Text>Modalidad de Pago:</Text>
                <Text>{paymentMethodToLabel(member?.plusPaymentMethod)}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text>Dirección de Facturación:</Text>
                <Text>{member?.plusBillingAddress}</Text>
              </Flex>
            </Stack>
            <Stack as="form" spacing={6}>
              <MembershipTypeSelect
                member={member}
                onChange={setCurrentMembership}
              />
            </Stack>
          </PageSection>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

function MemberStatusSelect({ member, onChange }) {
  const toast = useToast();
  const [backOfficerEmail, setBackOfficerEmail] = React.useState();
  const { statusOptions, selectedStatus, updateSelectedStatus } =
    useSelectMemberStatus(member.status);
  const [savingValue, setSavingValue] = React.useState(null);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { isLoading, mutate } = useUpdateMemberStatus();

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

  function handleSave(statusValue) {
    const values = {
      status: statusValue,
      backOfficerEmail
    };
    setSavingValue(statusValue);
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
          onClose();
          setSavingValue(null);
        },
        onSuccess: () => {
          onClose();
          updateSelectedStatus(statusValue);
          setSavingValue(null);
          onChange(statusValue);
        }
      }
    );
  }
  return (
    <Menu matchWidth onClose={onClose} isOpen={isOpen} closeOnSelect={false}>
      <MenuButton
        onClick={onOpen}
        textAlign="left"
        fontWeight="normal"
        variant="outline"
        color="gray.400"
        as={Button}
        rightIcon={<ChevronDownIcon fontSize="xl" />}
      >
        <MemberStatusTag
          selected={true}
          status={selectedStatus ? selectedStatus : member.status}
        />
      </MenuButton>
      <MenuList>
        {statusOptions.map((statusOption) => (
          <MenuItem
            isDisabled={isLoading && savingValue === statusOption.value}
            value={statusOption.value}
            key={statusOption.value}
            onClick={() => {
              handleSave(statusOption.value);
            }}
          >
            <MemberStatusTag
              loading={isLoading && savingValue === statusOption.value}
              selected={statusOption.selected}
              status={statusOption.value}
            />
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

function MembershipTypeSelect({ member, onChange }) {
  const toast = useToast();
  const {
    membershipTypeOptions,
    selectedMembershipType,
    updateMembershipType
  } = useSelectMembershipType(member.membershipType);
  const [savingValue, setSavingValue] = React.useState(null);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { isLoading, mutate } = useUpdateMembershipType();

  function handleSave(membershipValue) {
    const values = {
      membershipType: membershipValue
    };
    setSavingValue(membershipValue);
    mutate(
      { idNumber: member.id_number, values },
      {
        onError: (error) => {
          console.error(error.message);
          const errorMessage = error.message || "Ocurrió un error inesperado";
          toast({
            position: "top",
            title: "Error al cambiar la membresía",
            description: errorMessage,
            status: "error",
            duration: 7000,
            isClosable: true
          });
          onClose();
          setSavingValue(null);
        },
        onSuccess: () => {
          onClose();
          updateMembershipType(membershipValue);
          setSavingValue(null);
          onChange(membershipValue);
        }
      }
    );
  }
  return (
    <Menu matchWidth onClose={onClose} isOpen={isOpen} closeOnSelect={false}>
      <MenuButton
        onClick={onOpen}
        textAlign="left"
        fontWeight="normal"
        variant="outline"
        color="gray.400"
        as={Button}
        rightIcon={<ChevronDownIcon fontSize="xl" />}
      >
        <MembershipType
          selected={true}
          membershipType={
            selectedMembershipType
              ? selectedMembershipType
              : member.membershipType
          }
        />
      </MenuButton>
      <MenuList>
        {membershipTypeOptions.map((mtOption) => (
          <MenuItem
            isDisabled={isLoading && savingValue === mtOption.value}
            value={mtOption.value}
            key={mtOption.value}
            onClick={() => {
              handleSave(mtOption.value);
            }}
          >
            <MembershipType
              loading={isLoading && savingValue === mtOption.value}
              selected={mtOption.selected}
              membershipType={mtOption.value}
            />
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
