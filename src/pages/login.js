import React from "react";
import { Container } from "react-bootstrap";
import { connect } from 'react-redux';
import isAuthenticated from '../actions/isAuthenticated';
import Shop from '../pages/shop';

import Header from "../layouts/Header";
import LoginForm from "../partials/LoginForm";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
    };
  }

  checkAuth(bool) {
    this.props.dispatch(isAuthenticated(bool));
  }

  render() {
    if(this.props.isAuth.isAuthenticated) {
      return (<Shop />)
    }
    return (
      <>
        <Header />
        <Container fluid>
          <h2 className="border-bottom mt-4 pb-2">Log In</h2>
          <LoginForm onAuthenticate={this.checkAuth.bind(this)} />
        </Container>
      </>
    );
  }
}

function mapReduxStoreStateToComponentProps(reduxStoreGlobalState) {
  const { isAuth } = reduxStoreGlobalState;

  return { isAuth };
}

export default connect(mapReduxStoreStateToComponentProps)(LoginPage)
