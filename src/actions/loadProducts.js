import * as types from '../types';

export default function loadProducts() {
  return dispatch => {
    fetch(`http://localhost:8000/products`)
    .then(response => {
      response
        .json()
        .then(products => {
          dispatch({
            type: types.LOAD_PRODUCTS_SUCCESS,
            payload: {
              products: products,
            }
          })
        })
        .catch(error => {
          console.error(error);
        });
    })
    .catch(error => {
      console.error(error);
    });
  }
}
