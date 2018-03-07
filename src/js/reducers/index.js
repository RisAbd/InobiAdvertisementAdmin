import { combineReducers } from 'redux';

import test from './testReducer';
import login from './loginReducer';
import ads from './adsReducer';
import views from './viewsReducer';
import mediaLists from './mediaReducer';
import stats from './statsReducer';


export default combineReducers({
  test,
  login,
  ads,
  views,
  mediaLists,
  stats,
});
