import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import Header from "../layouts/Header";

export default class SignupPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nickname: "",
      password: "",
    };
  }

  updateNickname(event) {
    this.setState({
      nickname: event.target.value,
    });
  }

  updatePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  registerUser(event) {
    event.preventDefault();
    const { nickname, password } = this.state;

    const url = `http://localhost:8000/users/signup`;
    const body = JSON.stringify({
      nickname,
      password,
      role: "customer",
    });

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then(response => {
        if (response.status !== 201) {
          response.json().then(responseBody => {
            this.setState({ error: responseBody.error });
          });

          return;
        }

      })
      .catch(error => {
        console.log(error);
      });
  
  }

  render() {
    return (
      <div>
        <Header />

        <Container fluid>
          <h2 className="border-bottom mt-4 pb-2">Sign Up</h2>

          <Form
            className="bg-light"
            onSubmit={event => this.registerUser(event)}
          >
            <Form.Group>
              <Form.Label>Nickname</Form.Label>
              <Form.Control
                type="text"
                onChange={event => this.updateNickname(event)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={event => this.updatePassword(event)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}
