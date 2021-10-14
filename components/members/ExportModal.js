import React from "react";
import {
  HStack,
  Icon,
  Link,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  useDisclosure,
  Text,
  Spinner,
  VStack,
  useToast
} from "@chakra-ui/react";
import { GrDocumentCsv } from "react-icons/gr";
import { useExportMembers } from "hooks/api";
import { allEmptyValues } from "utils/helpers/object.helpers";
const DEFAULT_TXT = "Preparando exportación";

export default function ExportModal({ filterValues, sortBy, ...delegated }) {
  const { onClose } = useDisclosure();
  const [content, setContent] = React.useState(DEFAULT_TXT);
  const { mutate } = useExportMembers();
  const [fileUrl, setFileUrl] = React.useState("");
  const showAddFilter = React.useMemo(
    () => allEmptyValues(filterValues),
    [filterValues]
  );
  const toast = useToast();
  const intervalRef = React.useRef();

  React.useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setContent((contentParam) =>
        contentParam === `${DEFAULT_TXT}...` ? DEFAULT_TXT : `${contentParam}.`
      );
    }, 300);

    return () => window.clearInterval(intervalRef.current);
  }, []);

  React.useEffect(() => {
    if (!showAddFilter) {
      mutate(filterValues, sortBy, {
        onSuccess: (data) => {
          setFileUrl(data.url);
        },
        onError: (error) => {
          console.error(error.message);
          const errorMessage =
            error.message ||
            "Ocurrió un error al generar el archivo. Favor volver a intentar.";
          toast({
            position: "top",
            title: "Error al generar el archivo.",
            description: errorMessage,
            status: "error",
            duration: 7000,
            isClosable: true
          });
          onClose();
        }
      });
    }
  }, []);

  return (
    <>
      <Modal
        isOpen={true}
        onClose={onClose}
        closeOnOverlayClick={false}
        {...delegated}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Exportar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack px={8} pb={8}>
              {!showAddFilter && !fileUrl && (
                <>
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                  />
                  <Text fontSize={16} textAlign="center">
                    {content}
                  </Text>
                </>
              )}
              {!showAddFilter && fileUrl && (
                <Link href={fileUrl}>
                  <HStack alignItems="center">
                    <Text>Click para descargar</Text>
                    <Icon w={6} h={6} as={GrDocumentCsv} />
                  </HStack>
                </Link>
              )}
              {showAddFilter && (
                <Text fontSize={16} textAlign="center">
                  No podemos exportar los datos conforme a los filtros que
                  seleccionaste. Ajusta los filtros y vuelve a intentarlo.
                </Text>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
