import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import loadProducts from "../actions/loadProducts";
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';

import Header from "../layouts/Header";

class ShopPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      cart: []
    };
  }

  componentDidMount() {
    this.props.dispatch(loadProducts());
    const auth = "Bearer "+sessionStorage.getItem('AT');
    console.log(auth);
    fetch('http://localhost:8000/cart', {
      headers: {
        "Authorization": auth
      }
    }).then(response => response.json().then(myCart => {
      if(myCart.products) {
        this.setState({cart: myCart.products})
      }
      if(myCart.error === "token expired") {
        const cookie = new Cookies();
        const refreshToken = cookie.get('RT');
        const body = JSON.stringify({refreshToken: refreshToken});
        fetch('http://localhost:8000/users/refresh', {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: body,
        })
        .then(response => response.json().then(body => {
          console.log(body);
          sessionStorage.setItem('AT',body.accessToken);
        }))
      }
    }))
  }

  renderCart() {
    console.log(this.state.cart);
    return this.state.cart.map(myCart => {
      return (
        <div key={myCart._id}>
          <p>Product : {myCart.product.name}</p>
          <p>Quantity : {myCart.quantity}</p>
        </div>
      )
    })
  }

  renderProducts() {
    return this.props.products.list.map(product => {
      return (
        <Card
          className="text-center mr-3 mb-3"
          key={product._id}
          style={{ width: "10rem", height: "15rem" }}
        >
          <Card.Img variant="top" src="https://via.placeholder.com/160x80" />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>{`Price: ${product.price}€`}</Card.Text>
            <Button
              variant="primary"
              data-item={product._id}
              onClick={ (e) => {
                let body = {productId: product._id, quantity:1};
                body = JSON.stringify(body);
                console.log(body);
                const auth = "Bearer "+sessionStorage.getItem('AT');
                console.log(auth);
                fetch('http://localhost:8000/cart', {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": auth
                  },
                  body,
                }).then(response => {
                  return response.json().then(cartItems => {
                      console.log(cartItems);
                      this.setState({cart: cartItems.products})

                  })
                }
                )
              }
            }
            >Add to cart</Button>
          </Card.Body>
        </Card>
      );
    });
  }

  render() {
    return (
      <div>
        <Header />

        <Container fluid>
          <h2 className="border-bottom mt-4 pb-2">Shop</h2>
          <Row>
            <Col md={8} className="d-flex">
              {this.renderProducts()}
            </Col>
            <Col md={4} className="bg-light px-4 pt-3 pb-4">
              <h3>Cart</h3>
              {this.renderCart()}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapReduxStoreStateToComponentProps(reduxStoreGlobalState) {
  const { products } = reduxStoreGlobalState;

  return { products };
}

export default connect(mapReduxStoreStateToComponentProps)(ShopPage)
