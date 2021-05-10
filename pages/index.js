import React from "react";
import Container from "components/ui/Container";
import RegisterForm from "components/members/RegisterForm";
import PublicLayout from "components/ui/layout/PublicLayout";

export default function index() {
  return (
    <PublicLayout>
      <Container>
        <RegisterForm />
      </Container>
    </PublicLayout>
  );
}
