import React from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  MenuDivider,
  Heading
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from "@chakra-ui/icons";
import { Auth } from "aws-amplify";
import Router, { useRouter } from "next/router";
import Container from "components/ui/Container";
import LoadingModal from "../LoadingModal";
import InternalLink from "../InternalLink";

export default function AppLayout({ children }) {
  const { isOpen, onToggle } = useDisclosure();
  const [user, setUser] = React.useState();
  const [showLoadingModal, setShowLoadingModal] = React.useState(false);

  React.useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      setUser(currentUser);
    } catch (err) {
      console.error({ err });
    }
  }

  const handleSignOut = () => {
    setShowLoadingModal(true);
    setTimeout(() => {
      Auth.signOut()
        .then(() => {
          Router.reload(window.location.pathname);
        })
        .catch((error) => {
          console.error("error signing out: ", error);
          setShowLoadingModal(false);
        });
    }, 2000);
  };

  return (
    <Box>
      <Box as="header" position="relative" zIndex="999" py={4}>
        <Container>
          <Flex
            bg={useColorModeValue("white", "gray.800")}
            color={useColorModeValue("gray.600", "white")}
            minH={"60px"}
            pb={{ base: 4 }}
            borderBottom={1}
            borderStyle={"solid"}
            borderColor={useColorModeValue("gray.200", "gray.900")}
            align={"center"}
          >
            <Flex
              flex={{ base: 1, md: "auto" }}
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
            <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
              <Heading
                textAlign={useBreakpointValue({ base: "center", md: "left" })}
                color={useColorModeValue("gray.800", "white")}
                size="base"
              >
                Asepy FishSwarm
              </Heading>
            </Flex>
            <Stack
              flex={{ base: 1, md: 0 }}
              justify={"flex-end"}
              direction={"row"}
              spacing={6}
            >
              <Box
                as={InternalLink}
                href="/"
                p={2}
                fontSize={"sm"}
                fontWeight={500}
                color={useColorModeValue("gray.600", "gray.200")}
                _hover={{
                  textDecoration: "none",
                  color: useColorModeValue("gray.800", "white")
                }}
              >
                Asociáte
              </Box>
              <Flex alignItems={"center"}>
                <Menu placement="bottom-end">
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                  >
                    <Avatar size="sm" />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>
                      <Text color="gray.500">
                        {user && user.attributes.email}
                      </Text>
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={handleSignOut}>Salir</MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </Stack>
          </Flex>
          <Flex
            bg={useColorModeValue("white", "gray.800")}
            color={useColorModeValue("gray.600", "white")}
            minH={"60px"}
            align={"center"}
            display={{ base: "none", md: "flex" }}
          >
            <DesktopNav />
          </Flex>
          <Collapse in={isOpen} animateOpacity>
            <MobileNav />
          </Collapse>
        </Container>
      </Box>
      <Box
        as="main"
        _before={{
          background: "white",
          content: '" "',
          display: "block",
          height: "264px",
          left: 0,
          position: "absolute",
          top: 0,
          width: "100%",
          zIndex: 0,
          borderBottom: 1,
          borderStyle: "solid",
          borderColor: useColorModeValue("gray.200", "gray.900")
        }}
      >
        <Box position="relative">{children}</Box>
      </Box>
      {showLoadingModal && <LoadingModal text="Cerrando sesión"></LoadingModal>}
      <style jsx global>{`
        body {
          background-color: var(--chakra-colors-alabaster-500);
        }
      `}</style>
    </Box>
  );
}

const DesktopNav = () => {
  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <HeaderLink href={navItem.href ?? "#"}>
                {navItem.label}
              </HeaderLink>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={useColorModeValue("white", "gray.800")}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

function HeaderLink({ href, children, ...rest }) {
  const router = useRouter();

  const selected = router.pathname === href;
  return (
    <InternalLink
      href={href}
      py="2"
      px="4"
      fontSize="md"
      fontWeight={500}
      color={
        selected
          ? useColorModeValue("gray.800", "white")
          : useColorModeValue("gray.600", "gray.200")
      }
      _hover={{
        textDecoration: "none",
        color: useColorModeValue("gray.800", "white"),
        bg: useColorModeValue("gray.50", "gray.900")
      }}
      borderRadius="md"
      bg={selected ? useColorModeValue("gray.50", "gray.900") : "inherit"}
      {...rest}
    >
      {children}
    </InternalLink>
  );
}

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("gray.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "gray.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"gray.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <HeaderLink href={href ?? "#"}>
        {label}
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </HeaderLink>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Miembros",
    href: "/app"
  }
];
