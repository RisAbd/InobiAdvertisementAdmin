import { fetch as myFetch, sleep } from '../utils';
import axios from 'axios';
import { URL } from '../constants';


export function login(credentials) {
  return {
    type: 'LOGIN',
    payload: myFetch(URL.login, credentials, 'POST')
  };
}

export function logout() {
  return {
    type: 'LOGOUT',
  }
}

export function checkFromStorage() {
  return (dispatch) => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      dispatch({type: 'SET_TOKEN', payload: jwt});
      dispatch(checkToken(jwt));
    }
  };
}

export function checkToken(jwt) {
  return {
    type: 'CHECK_TOKEN',
    payload: myFetch(URL.checkToken, { jwt }, 'GET'),
  };
}
