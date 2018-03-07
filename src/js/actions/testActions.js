import { fetch, jwt } from '../utils';
import { URL } from '../constants';


export function test(name) {
  return dispatch => {
    setTimeout(() => {
      dispatch(f(name));
    }, 2000);
  };
}

function f(name) {
  const o = {
    type: 'TEST',
    payload: name
  };
  return o;
}

export function getListUploads() {
  return {
    type: 'TEST',
    payload: fetch(URL.listUploads + 'media', { jwt: jwt() }, 'GET'),
  };
}
