import React from "react";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";
import AppLayout from "components/ui/layout/AppLayout";
import Container from "components/ui/Container";
import AuthenticationFlow from "components/auth/AuthenticationFlow";
import { Heading } from "@chakra-ui/layout";

function index() {
  return (
    <AuthenticationFlow>
      <AppLayout>
        <Container>
          <Heading>Benvenido</Heading>
        </Container>
      </AppLayout>
    </AuthenticationFlow>
  );
}

export default index;
