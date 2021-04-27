import React from "react";
import Container from "../components/ui/Container";
import RegisterForm from "../components/register/RegisterForm";

export default function index() {
  return (
    <Container mt="8">
      <RegisterForm />
    </Container>
  );
}