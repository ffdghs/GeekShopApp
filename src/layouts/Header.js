import React from "react";
import { Nav, Navbar, NavDropdown, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import isAuthenticated from '../actions/isAuthenticated';
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';

class Header extends React.Component {
  constructor(props) {
    super(props);

    // ???

    this.state = {};
  }

  componentDidMount() {
    // ???
  }

  // eslint-disable-next-line class-methods-use-this
  logOut() {
    this.props.dispatch(isAuthenticated(false));
  }

  renderAuthentication() {
    const cookie = new Cookies();
    const nickname = jwtDecode(cookie.get('RT')).nickname;
    if (!this.props.isAuth.isAuthenticated) {
      return (
        <Nav>
          <NavItem href="/login">
            <Nav.Link as={Link} to="/login">
              Log In
            </Nav.Link>
          </NavItem>
          <NavItem href="/signup">
            <Nav.Link as={Link} to="/signup">
              Sign Up
            </Nav.Link>
          </NavItem>
        </Nav>
      );
    }

    return (
      <NavDropdown title={nickname}>
        <NavDropdown.Item onClick={() => this.logOut()}>
          Log Out
        </NavDropdown.Item>
      </NavDropdown>
    );
  }

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">Geek Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <NavItem href="/">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
            </NavItem>
            <NavItem href="/shop">
              <Nav.Link as={Link} to="/shop">
                Shop
              </Nav.Link>
            </NavItem>
          </Nav>
          {this.renderAuthentication()}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

function mapReduxStoreStateToComponentProps(reduxStoreGlobalState) {
  const { isAuth } = reduxStoreGlobalState;

  return { isAuth };
}

export default connect(mapReduxStoreStateToComponentProps)(Header)

