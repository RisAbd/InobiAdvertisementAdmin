import './globals';
import './styles.js';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router} from "react-router-dom";

import { addTranslation, initialize } from 'react-localize-redux';

import store from './store.js';

import { LANGUAGES, LANGUAGE_LS_KEY } from "./constants";

import { App } from './App';

import {checkFromStorage} from "./actions/loginActions";

const tag = '@client.js:';

const app = document.getElementById('app');

const [en] = LANGUAGES.map(lang => lang.code);
const currentLang = localStorage.getItem(LANGUAGE_LS_KEY) || en;

store.dispatch(initialize(LANGUAGES, { defaultLanguage: currentLang }));
store.dispatch(addTranslation(require('../translations.json')));
store.dispatch(checkFromStorage());

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
 app);
