const initState = {
  views: [],
  fetching: false,
  fetched: 0.0,
  error: null,
};

export default function reducer(state=initState, action) {

  switch (action.type) {
    case 'FETCH_VIEWS_PENDING':
      return {
        ...state,
        fetching: true,
      }
      break;
    case 'FETCH_VIEWS_ERR':
      return {
        ...state,
        fetching: false,
        error: action.payload,
      }
      break;
    case 'FETCH_VIEWS_OK':
      return {
        ...state,
        views: action.payload.data,
        fetched: Date.now(),
        fetching: false,
      }
      break;
    case '':
      break;
    case '':
      break;
  }

  return state;
}
