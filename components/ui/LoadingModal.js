import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Text,
  CircularProgress,
  VStack,
} from "@chakra-ui/react";

export default function LoadingModal({ speed = 300, text = "Cargando" }) {
  const { onClose } = useDisclosure();
  const [content, setContent] = React.useState(text);
  const intervalRef = React.useRef();

  React.useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setContent((contentParam) =>
        contentParam === `${text}...` ? text : `${contentParam}.`
      );
    }, speed);

    return () => window.clearInterval(intervalRef.current);
  }, [speed, text]);
  return (
    <>
      <Modal isOpen={true} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <VStack p={12}>
              <CircularProgress isIndeterminate></CircularProgress>
              <Text fontSize={18} fontWeight="bold" textAlign="center">
                {content}
              </Text>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
