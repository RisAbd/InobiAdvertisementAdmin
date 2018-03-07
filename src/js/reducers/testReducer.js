const initState = {}

export default function reducer(state=initState, action) {
  switch (action.type) {
    case 'TEST':
      return { ...state, testing: action.payload };
      break;
    case 'TEST_PENDING':
      return { ...state }
      break;
    case 'TEST_OK':
      return { ...state }
      break;
    case 'TEST_ERR':
      return { ...state }
      break;
    default:
      return state;
  }
}
