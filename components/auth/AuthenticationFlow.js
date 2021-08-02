import React, { useEffect, useState } from "react";
import "configureAmplify";
import { Auth } from "aws-amplify";
import { Flex, Text, VStack } from "@chakra-ui/layout";
import SignIn from "./SignIn";
import ChangePassword from "./ChangePassword";

function AuthenticationFlow(props) {
  const [uiState, setUiState] = useState(null);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    newPassword: ""
  });
  const { email, password, newPassword } = formState;
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState();
  const [signedInUser, setSignedInUser] = React.useState();

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    console.log("checking user...");
    try {
      setUiState("loading");
      await Auth.currentAuthenticatedUser();
      setUiState("signedIn");
    } catch (err) {
      setUiState("signIn");
    }
  }
  function onChange(e) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }
  async function changePassword() {
    try {
      setError(null);
      setIsLoading(true);
      await Auth.completeNewPassword(signedInUser, newPassword);
      setUiState("signedIn");
    } catch (err) {
      console.error({ err });
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }
  async function signIn() {
    try {
      setError(null);
      setIsLoading(true);
      const user = await Auth.signIn(email, password);
      setSignedInUser(user);
      if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
        setUiState("changePassword");
      } else {
        setUiState("signedIn");
      }
    } catch (err) {
      console.error({ err });
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  if (uiState === "signedIn") {
    return React.cloneElement(props.children, {
      onSignOut: () => setUiState("signIn")
    });
  }

  return (
    <Flex height="100%" alignItems="center" justifyContent={"center"}>
      <VStack
        rounded="lg"
        shadow="-16px 16px 32px #ededed, 16px -16px 32px #ffffff"
        maxW="360px"
        w="full"
        bgColor="white"
        p={8}
        spacing={4}
      >
        {!uiState ||
          (uiState === "loading" && <Text fontWeight="bold">Cargando...</Text>)}
        {uiState === "changePassword" && (
          <ChangePassword
            setUiState={setUiState}
            onChange={onChange}
            changePassword={changePassword}
            isLoading={isLoading}
            error={error}
          />
        )}

        {uiState === "signIn" && (
          <SignIn
            setUiState={setUiState}
            onChange={onChange}
            signIn={signIn}
            isLoading={isLoading}
            error={error}
          />
        )}
      </VStack>
    </Flex>
  );
}

export default AuthenticationFlow;
