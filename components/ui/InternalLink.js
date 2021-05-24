import { Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";

// Source
// https://twitter.com/thesegunadebayo/status/1308042368701149187/photo/1
export default function InternalLink(props) {
  const { children, href, ...rest } = props;
  return (
    <NextLink passHref href={href}>
      <ChakraLink {...rest}>{children}</ChakraLink>
    </NextLink>
  );
}
