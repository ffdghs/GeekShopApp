import * as types from '../types';

export default function isAuthenticated(bool) {
  return (
    {
      type: types.IS_AUTH,
      payload: {
        auth: bool,
      }
    }
  )
}


