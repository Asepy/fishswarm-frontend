import React from "react";
import { Auth } from "aws-amplify";
import Router from "next/router";
import { Flex, Button, Stack } from "@chakra-ui/react";
import Container from "components/ui/Container";
import Logo from "components/ui/Logo";

const Header = () => {
  const [isSigningOut, setIsSigningOut] = React.useState(false);

  const handleSignOut = () => {
    setIsSigningOut(true);
    setTimeout(() => {
      Auth.signOut()
        .then(() => {
          console.log("success");
          Router.reload(window.location.pathname);
        })
        .catch((error) => {
          console.log("error signing out: ", error);
          setIsSigningOut(false);
        });
    }, 3000);
  };
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
            <Stack
              spacing={8}
              align="center"
              justify={["center", "space-between", "flex-end", "flex-end"]}
              direction={["column", "row", "row", "row"]}
              pt={[4, 4, 0, 0]}
            >
              <Button
                bg="transparent"
                border="1px"
                isLoading={isSigningOut}
                onClick={handleSignOut}
              >
                Salir
              </Button>
            </Stack>
          </Flex>
        </Container>
      </Flex>
    </>
  );
};

function AppLayout({ children, onSignOut }) {
  return (
    <>
      <Header onSignOut={onSignOut}></Header>
      {children}
    </>
  );
}

export default AppLayout;
