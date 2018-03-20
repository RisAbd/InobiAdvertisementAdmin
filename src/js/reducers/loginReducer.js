const initState = {
  loggedIn: false,
  isFetching: false,
  token: null,
  error: null,
};

export default function reducer(state=initState, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
      break;
    case 'CHECK_TOKEN_OK':
      const response = action.data;
      return {
        ...state,
        loggedIn: true,
        isFetching: false,
      };
      break;
    case 'CHECK_TOKEN_PENDING':
      return {
        ...state,
        isFetching: true,
      };
      break;
    case 'CHECK_TOKEN_ERR':
      return {
        ...state,
        isFetching: false,
        loggedIn: false,
        token: null,
        error: action.payload,
      }
      break;
    case 'LOGIN_PENDING':
      return {
        ...state,
        isFetching: true,
      }
      break;
    case 'LOGIN_ERR':
      return {
        ...state,
        isFetching: false,
        loggedIn: false,
        token: null,
        error: action.payload,
      }
      break;
    case 'LOGIN_OK':
      const jwt = action.payload.data.token;
      localStorage.setItem('jwt', jwt);
      return {
        ...state,
        loggedIn: true,
        isFetching: false,
        token: jwt,
        error: null,
      }
      break;
    case 'LOGOUT':
      localStorage.removeItem('jwt')
      return {
        ...initState,
      }
  }

  return state;
}
