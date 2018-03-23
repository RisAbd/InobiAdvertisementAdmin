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
    case 'UPLOAD_AD_SOURCE_OK':
      return {
        ...state,
        temp: {
          ...state.temp,
          files: state.temp.files.concat([action.payload.data.uploaded.filename])
        }
      };

    case 'DELETE_AD_SOURCE_OK':
      const { data } = action.payload;
      return {
        ...state,
        temp: {
          ...state.temp,
          files: state.temp.files.filter(file => file !== data.filename)
        }
      };
    default:
      return state;
      break;
  }
}
