import React from "react";
import AppLayout from "components/ui/layout/AppLayout";
import Container from "components/ui/Container";
import AuthenticationFlow from "components/auth/AuthenticationFlow";
import MemberList from "components/members/MemberList";

function index() {
  return (
    <AuthenticationFlow>
      <AppLayout>
        <Container pt={0}>
          <MemberList />
        </Container>
      </AppLayout>
    </AuthenticationFlow>
  );
}

export default index;
