import { Container as ChackraContainer } from "@chakra-ui/react";

export default function Container({ ...props }) {
  return <ChackraContainer maxW="container.lg" {...props}></ChackraContainer>;
}
