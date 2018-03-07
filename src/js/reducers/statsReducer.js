const tag = '@Reducer.Stats:';


const initState = {
  isFetching: false,
  fetched: null,
  error: null,
  stats: null,

  fullscreen: false,
};


export default function reducer(state=initState, action) {
  switch (action.type) {
    case 'FETCH_STATS_PENDING':
      return {
        ...state,
        isFetching: true,
      }
    case 'FETCH_STATS_ERR':
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      }
    case 'FETCH_STATS_OK':
      return {
        ...state, 
        error: null,
        stats: action.payload.data.stats,
        fetched: Date.now(),
        isFetching: false,
      }
    case 'SET_FULLSCREEN':
      return {
        ...state,
        fullscreen: !!action.payload,
      }
  }

  return state;
}
