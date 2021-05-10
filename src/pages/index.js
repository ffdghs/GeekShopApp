import React from "react";
import { Container, ToastHeader } from "react-bootstrap";

import Header from "../layouts/Header";

export default function IndexPage() {
  return (
    <>
      <Header />

      <Container fluid>
        <h2 className="border-bottom mt-4 pb-2">Welcome to Geek Shop!</h2>
      </Container>
    </>
  );
}
