const tag = '@MediaReducer:';

const directoryInitState = {
  isFetching: false,
  files: [],
  fetched: null,
  error: null,
}

const initState = {
  temp: { ...directoryInitState, },
  media: { ...directoryInitState, },
  external: { ...directoryInitState, },
};


export default function reducer(state=initState, action) {
  switch (action.type) {
    case 'LIST_UPLOADS_PENDING': {
      const dir = action.dir;
      const { [dir]: ds } = state;
      return {
        ...state,
        [dir]: {
          ...ds,
          isFetching: true,
        },
      };
      break;
    }
    case 'LIST_UPLOADS_OK': {
      const dir = action.dir;
      const { [dir]: ds } = state;
      return {
        ...state,
        [dir]: {
          ...ds,
          isFetching: false,
          fetched: Date.now(),
          files: action.payload.files,
        },
      };
      break;
    }
    case 'LIST_UPLOADS_ERR': {
      const dir = action.dir;
      const { [dir]: ds } = state;
      return {
        ...state,
        [dir]: {
          ...ds,
          isFetching: false,
          fetched: null,
          error: action.payload,
        },
      };
      break;
    }
    default:
      return state;
      break;
  }
}
