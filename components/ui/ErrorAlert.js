import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  VStack,
} from "@chakra-ui/react";

export default function ErrorAlert({ title, children, ...rest }) {
  return (
    <VStack {...rest}>
      <Alert width="400px" marginX="auto" status="error">
        <AlertIcon />
        {title && <AlertTitle mr={2}>{title}</AlertTitle>}
        <AlertDescription>{children}</AlertDescription>
        <CloseButton position="absolute" right="8px" top="8px" />
      </Alert>
    </VStack>
  );
}
