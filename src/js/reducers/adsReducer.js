
const tag = '@adsReducer:';

const initState = {
  shouldReset: false,
  isFetching: false,
  ads: [],
  fetched: null,
  error: null,
  create: {
    isPosting: false,
    shouldReset: false,
    error: null,
  }
};

export default function reducer(state=initState, action) {
  switch (action.type) {
    case 'FETCH_ADS_OK':
      return {
        ...state,
        ads: action.payload.data.ads.sort((ad1, ad2) => ad2.created-ad1.created),
        isFetching: false,
        fetched: Date.now(),
      }
    case 'FETCH_ADS_PENDING':
      return {
        ...state,
        isFetching: true,
      }
    case 'FETCH_ADS_ERR':
      return {
        ...state,
        isFetching: true,
        error: action.payload,
      }
    case 'SET_SHOULD_REFRESH_ADS':
      return {
        ...state,
        shouldRefresh: action.payload,
      }
    case 'SET_SHOULD_RESET_CREATE':
      return {
        ...state,
        create: {
          ...state.create,
          shouldReset: action.payload,
        }
      }
    case 'CREATE_AD_PENDING':
      return {
        ...state,
        create: {
          ...state.create,
          isPosting: true,
        },
      };
    case 'CREATE_AD_OK':
      return {
        ...state,
        create: {
          ...state.create,
          isPosting: false,
          shouldReset: true,
          error: null,
        },
      };
    case 'CREATE_AD_ERR':
      return {
        ...state,
        create: {
          ...state.create,
          isPosting: false,
          error: action.payload,
        },
      };
    case 'CREATE_AD_RESET':
      return {
        ...state,
        create: {
          ...state.create,
          shouldReset: false,
        },
      };
    default:
      return state;
  }
}
