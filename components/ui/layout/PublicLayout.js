import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import {
  Flex,
  Stack,
  useDisclosure,
  IconButton,
  Collapse,
  useColorModeValue
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import Container from "components/ui/Container";
import Logo from "components/ui/Logo";
import InternalLink from "../InternalLink";
import Footer from "./Footer";

export default function PublicLayout({ children }) {
  const { isOpen, onToggle } = useDisclosure();

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
            <DesktopNav></DesktopNav>
            <Flex ml={{ base: -2 }} display={{ base: "flex", md: "none" }}>
              <IconButton
                onClick={onToggle}
                icon={
                  isOpen ? (
                    <CloseIcon w={3} h={3} />
                  ) : (
                    <HamburgerIcon w={5} h={5} />
                  )
                }
                variant={"ghost"}
                aria-label={"Toggle Navigation"}
              />
            </Flex>
          </Flex>
          <Collapse in={isOpen} animateOpacity>
            <MobileNav />
          </Collapse>
        </Container>
      </Flex>
      {children}
      <Footer bg="alabaster.500" />
    </>
  );
}

function MobileNav() {
  return (
    <Stack p={2} display={{ base: "flex", md: "none" }} alignItems="flex-end">
      <Stack alignItems="center" spacing={4}>
        <Flex
          as={HeaderLink}
          href={"/"}
          justify={"space-between"}
          align={"left"}
          _hover={{
            textDecoration: "none"
          }}
        >
          Asociáte
        </Flex>
        <Flex
          as={HeaderLink}
          href={"/search-member"}
          justify={"space-between"}
          align={"left"}
          _hover={{
            textDecoration: "none"
          }}
        >
          ¿Ya Soy Socio?
        </Flex>
      </Stack>
    </Stack>
  );
}

const DesktopNav = () => {
  return (
    <Stack
      spacing={4}
      align="center"
      justify={["center", "space-between", "flex-end", "flex-end"]}
      direction={["column", "row", "row", "row"]}
      display={{ base: "none", md: "flex" }}
      pt={[4, 4, 0, 0]}
    >
      <HeaderLink href="/">Asociáte</HeaderLink>
      <HeaderLink href="/search-member">¿Soy Socio?</HeaderLink>
    </Stack>
  );
};

// This saved my day :)
// https://flaviocopes.com/nextjs-active-link/
function HeaderLink({ href, children, ...rest }) {
  const router = useRouter();

  const selected = router.pathname === href;
  return (
    <InternalLink
      href={href}
      py="2"
      px="4"
      _hover={{
        bg: useColorModeValue("gray.100", "gray.900")
      }}
      borderRadius="md"
      bg={selected ? useColorModeValue("gray.100", "gray.900") : "inherit"}
      {...rest}
    >
      {children}
    </InternalLink>
  );
}

HeaderLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};
