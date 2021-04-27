import React from "react";
import Link from "next/link";
import { Flex, Box, Button, Stack, Text } from "@chakra-ui/react";
import Container from "./Container";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Logo from "./Logo";

export default function Header() {
  return (
    <>
      <Flex
        as="header"
        w="100%"
        justify="center"
        align="center"
        py={6}
        backgroundColor="screencase"
      >
        <Container>
          <Flex justify="space-between">
            <a href="https://asepy.org">
              <Logo w="160px" />
            </a>
            <MenuLinks></MenuLinks>
          </Flex>
        </Container>
      </Flex>
    </>
  );
}

const MenuLinks = () => {
  return (
    <Stack
      spacing={8}
      align="center"
      justify={["center", "space-between", "flex-end", "flex-end"]}
      direction={["column", "row", "row", "row"]}
      pt={[4, 4, 0, 0]}
    >
      <HeaderLink href="/search-member">
        <a>¿Soy Socio?</a>
      </HeaderLink>
      <HeaderLink _hover={undefined} href="/">
        <Button bg="transparent" border="1px">
          Registrarse
        </Button>
      </HeaderLink>
    </Stack>
  );
};

// This saved my day :)
// https://flaviocopes.com/nextjs-active-link/
function HeaderLink({ href, children, _hover }) {
  const router = useRouter();

  let className = children.props.className || "";
  if (router.pathname === href) {
    className = `${className} selected`;
  }

  return (
    <Link href={href} _hover={_hover}>
      {React.cloneElement(children, { className })}
    </Link>
  );
}

HeaderLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
