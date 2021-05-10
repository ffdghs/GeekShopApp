import React from "react";
import { Button, Form } from "react-bootstrap";
import Cookies from 'universal-cookie';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nickname: "",
      password: "",
      mustRemember: false,
      error: null,
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

  updateMustRemember(event) {
    this.setState({
      mustRemember: event.target.checked,
    });
  }

  submitForm(event) {
    event.preventDefault();
    this.setState({ error: null });
    const { nickname, password, mustRemember } = this.state;
    const url = `http://localhost:8000/users/login`;
    const body = JSON.stringify({ nickname, password });

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then(response => {
        response
          .json()
          .then(responseBody => {
            if (response.status !== 200) {
              this.setState({ error: responseBody.error });

              return;
            }

            sessionStorage.setItem('AT',responseBody.accessToken);
            const cookie = new Cookies();
            const today = new Date();
            const calcDate = today.getTime() + 2592000000;
            const expireDate = new Date(calcDate);
            console.log(`AT : ${responseBody.accessToken}, RT : ${responseBody.refreshToken} `);
            cookie.set('RT',responseBody.refreshToken, { expires : expireDate});
            this.props.onAuthenticate(true);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { error } = this.state;

    return (
      <Form
        className="bg-light px-4 pt-3 pb-4"
        onSubmit={event => this.submitForm(event)}
      >
        <Form.Group controlId="formBasicnickname">
          <Form.Label>Nickname</Form.Label>
          <Form.Control onChange={event => this.updateNickname(event)} />
          {error !== null && (
            <Form.Text className="text-danger">{error}</Form.Text>
          )}
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={event => this.updatePassword(event)}
            type="password"
          />
        </Form.Group>
        <Form.Group className="pl-1 pb-4" controlId="formBasicCheckbox">
          <Form.Check
            onChange={event => this.updateMustRemember(event)}
            type="checkbox"
            label="Remember me"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Log In
        </Button>
      </Form>
    );
  }
}
