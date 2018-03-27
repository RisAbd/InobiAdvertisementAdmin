import { createSelector } from 'reselect';

const tag = '@adsReducer:';

const initState = {
  shouldReset: false,
  isFetching: false,
  ads: [],
  fetched: null,
  error: null,
  sortKey: 'created',
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
        ads: action.payload.data.ads,
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
    case 'UPDATE_AD':
      return {
        ...state,
        isFetching: true,
      };
    case 'UPDATE_AD_OK':
      const updatedAd = action.payload.data.updated_ad;
      return {
        ...state,
        ads: [...state.ads.filter(ad => ad.id !== updatedAd.id), updatedAd],
        isFetching: false,
      }
    case 'DELETE_AD_OK':
      const deleted_id = action.payload.data.disabled_ad.id;
      return {
        ...state,
        ads: [
          ...state.ads.filter(ad => ad.id !== deleted_id)
        ]
      }
    default:
      return state;
  }
}

const getAds = state => state.ads.ads;
const getSortKey = state => state.ads.sortKey;
const getAdFilter = state => state.ads.filter;

const getSortedAds = createSelector(
  [
    getAds,
    getSortKey,
  ],
  (ads, sortKey) => ads.sort((a, b) => b[sortKey] - a[sortKey])
);

export const selectors = {
  getAds,
  getSortedAds
};
