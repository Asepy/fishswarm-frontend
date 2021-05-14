import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import {
  Flex,
  Button,
  Stack,
  useDisclosure,
  IconButton,
  Collapse,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import Container from "components/ui/Container";
import Logo from "components/ui/Logo";

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
            <Flex
              // flex={{ base: 1, md: "auto" }}
              ml={{ base: -2 }}
              display={{ base: "flex", md: "none" }}
            >
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
    </>
  );
}

function MobileNav() {
  return (
    <Stack py={2} display={{ base: "flex", md: "none" }} alignItems="flex-end">
      <Stack alignItems="center" spacing={4}>
        <Flex
          as={Link}
          href={"/search-member"}
          justify={"space-between"}
          align={"left"}
          _hover={{
            textDecoration: "none",
          }}
        >
          <a>¿Ya Soy Socio?</a>
        </Flex>
        <Flex
          as={Link}
          href={"/"}
          justify={"space-between"}
          align={"left"}
          _hover={{
            textDecoration: "none",
          }}
        >
          <a>Asociáte</a>
        </Flex>
        <Flex
          as={Link}
          href="/app"
          justify={"space-between"}
          align={"center"}
          _hover={{
            textDecoration: "none",
          }}
        >
          <Button bg="transparent" border="1px">
            Ingresar
          </Button>
        </Flex>
      </Stack>
    </Stack>
  );
}

const DesktopNav = () => {
  return (
    <Stack
      spacing={8}
      align="center"
      justify={["center", "space-between", "flex-end", "flex-end"]}
      direction={["column", "row", "row", "row"]}
      display={{ base: "none", md: "flex" }}
      pt={[4, 4, 0, 0]}
    >
      <HeaderLink href="/search-member">
        <a>¿Soy Socio?</a>
      </HeaderLink>
      <HeaderLink href="/">
        <a>Asociáte</a>
      </HeaderLink>
      <HeaderLink _hover={undefined} href="/app">
        <Button bg="transparent" border="1px">
          Ingresar
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
