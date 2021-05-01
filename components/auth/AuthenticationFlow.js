import "configureAmplify";
import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import ForgotPasswordSubmit from "./ForgotPasswordSubmit";
import ConfirmSignUp from "./ConfirmSignUp";
import React from "react";
import { Flex, Text, VStack } from "@chakra-ui/layout";

function AuthenticationFlow(props) {
  const [uiState, setUiState] = useState(null);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    authCode: "",
  });
  const { email, password, authCode } = formState;
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
      await Auth.signUp({ username: email, password, attributes: { email } });
      setUiState("confirmSignUp");
    } catch (err) {
      console.log({ err });
    }
  }
  async function confirmSignUp() {
    try {
      await await Auth.confirmSignUp(email, authCode);
      await Auth.signIn(email, password);
      setUiState("signedIn");
    } catch (err) {
      console.log({ err });
    }
  }
  async function signIn() {
    try {
      await Auth.signIn(email, password);
      setUiState("signedIn");
    } catch (err) {
      console.log({ err });
    }
  }
  async function forgotPassword() {
    try {
      await Auth.forgotPassword(email);
      setUiState("forgotPasswordSubmit");
    } catch (err) {
      console.log({ err });
    }
  }
  async function forgotPasswordSubmit() {
    await Auth.forgotPasswordSubmit(email, authCode, password);
    setUiState("signIn");
  }

  if (uiState === "signedIn") {
    return React.cloneElement(props.children, {
      onSignOut: () => setUiState("signIn"),
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
          <SignUp setUiState={setUiState} onChange={onChange} signUp={signUp} />
        )}
        {uiState === "confirmSignUp" && (
          <ConfirmSignUp
            setUiState={setUiState}
            onChange={onChange}
            confirmSignUp={confirmSignUp}
          />
        )}
        {uiState === "signIn" && (
          <SignIn setUiState={setUiState} onChange={onChange} signIn={signIn} />
        )}
        {uiState === "forgotPassword" && (
          <ForgotPassword
            setUiState={setUiState}
            onChange={onChange}
            forgotPassword={forgotPassword}
          />
        )}
        {uiState === "forgotPasswordSubmit" && (
          <ForgotPasswordSubmit
            setUiState={setUiState}
            onChange={onChange}
            forgotPasswordSubmit={forgotPasswordSubmit}
          />
        )}
      </VStack>
    </Flex>
  );
}

export default AuthenticationFlow;
