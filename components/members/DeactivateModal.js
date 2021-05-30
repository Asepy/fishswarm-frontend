import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  VStack,
  Button,
  Text,
  useToast
} from "@chakra-ui/react";
import useDeactivateMember from "/utils/useDeactivateMember";

export default function DeactivateModal({
  associate,
  closeModal,
  text = "¿Está seguro que desea desactivar al usuario?"
}) {
  const toast = useToast();
  const [content] = React.useState(text);
  const { isLoading, mutate: deactivateMember } = useDeactivateMember();

  const handleDeactivate = async (e) => {
    e.preventDefault();
    deactivateMember(associate.id_number, {
      onError: (error) => {
        const errorMessage =
          error.message || "Ocurrió un error al desactivar al usuario.";
        toast({
          position: "top",
          title: "Error al desactivar al usuario.",
          description: errorMessage,
          status: "error",
          duration: 5000,
          isClosable: true
        });
      },
      onSuccess: () => {
        toast({
          position: "top",
          title: "Usuario desactivado",
          description:
            "Se ha desactivado al socio con CI " + `${associate.national_id}`,
          status: "success",
          duration: 5000,
          isClosable: true
        });
        closeModal();
      }
    });
  };

  return (
    <>
      <Modal isOpen={true} onClose={closeModal} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <VStack p={12}>
              <Text fontSize={18} fontWeight="bold" textAlign="center">
                {content}
              </Text>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant={"outline"} mr={3} onClick={closeModal}>
              Cancelar
            </Button>
            <Button
              colorScheme={"red"}
              onClick={handleDeactivate}
              isLoading={isLoading}
            >
              Desactivar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
