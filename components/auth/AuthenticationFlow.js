import React, { useEffect, useState } from "react";
import "configureAmplify";
import { Auth } from "aws-amplify";
import { Flex, Text, VStack } from "@chakra-ui/layout";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import ForgotPasswordSubmit from "./ForgotPasswordSubmit";
import ConfirmSignUp from "./ConfirmSignUp";

function AuthenticationFlow(props) {
  const [uiState, setUiState] = useState(null);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    authCode: ""
  });
  const { email, password, authCode } = formState;
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState();

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
  async function signUp() {
    try {
      setError(null);
      setIsLoading(true);
      await Auth.signUp({ username: email, password, attributes: { email } });
      setUiState("confirmSignUp");
    } catch (err) {
      console.log({ err });
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }
  async function confirmSignUp() {
    try {
      setError(null);
      setIsLoading(true);
      await await Auth.confirmSignUp(email, authCode);
      await Auth.signIn(email, password);
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
      await Auth.signIn(email, password);
      setUiState("signedIn");
    } catch (err) {
      console.error({ err });
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }
  async function forgotPassword() {
    try {
      setError(null);
      setIsLoading(true);
      await Auth.forgotPassword(email);
      setUiState("forgotPasswordSubmit");
    } catch (err) {
      console.error({ err });
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }
  async function forgotPasswordSubmit() {
    try {
      setError(null);
      setIsLoading(true);
      await Auth.forgotPasswordSubmit(email, authCode, password);
      setUiState("signIn");
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
          (uiState === "loading" && (
            <Text fontWeight="bold">Cargando ...</Text>
          ))}
        {uiState === "signUp" && (
          <SignUp
            setUiState={setUiState}
            onChange={onChange}
            signUp={signUp}
            isLoading={isLoading}
            error={error}
          />
        )}
        {uiState === "confirmSignUp" && (
          <ConfirmSignUp
            setUiState={setUiState}
            onChange={onChange}
            confirmSignUp={confirmSignUp}
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
        {uiState === "forgotPassword" && (
          <ForgotPassword
            setUiState={setUiState}
            onChange={onChange}
            forgotPassword={forgotPassword}
            isLoading={isLoading}
            error={error}
          />
        )}
        {uiState === "forgotPasswordSubmit" && (
          <ForgotPasswordSubmit
            setUiState={setUiState}
            onChange={onChange}
            forgotPasswordSubmit={forgotPasswordSubmit}
            isLoading={isLoading}
            error={error}
          />
        )}
      </VStack>
    </Flex>
  );
}

export default AuthenticationFlow;
