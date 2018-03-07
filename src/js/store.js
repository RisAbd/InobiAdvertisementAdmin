import { createStore, applyMiddleware } from 'redux';

import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import reducer from './reducers';

const tag = '@store.js:';


const promiseTypeSuffixes = ['PENDING', 'OK', 'ERR'];
const middleware = applyMiddleware(promise({promiseTypeSuffixes}), thunk, createLogger());
const store = createStore(reducer, middleware);

export default store;