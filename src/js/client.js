import './globals';
import './styles.js';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from 'react-router';

import { addTranslation, getActiveLanguage, initialize, setActiveLanguage } from 'react-localize-redux';

import store from './store.js';

import NavBar from './components/Nav';

import LoginChecker from './components/LoginCheckerLayout';
import Ads from './pages/Ads';
import NoMatch from './pages/NoMatch';
import Stats from './pages/Stats';

const tag = '@client.js:';

const app = document.getElementById('app');

const languages = [
  { name: 'English', code: 'en' },
  { name: 'Русский', code: 'ru' },
  { name: 'فارْسِى', code: 'fa' },
];
store.dispatch(initialize(languages, { defaultLanguage: 'en' }));
store.dispatch(addTranslation(require('../translations.json')));

const isLtr = getActiveLanguage(store.getState().locale).code !== 'fa';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div class='ia-react-root' dir={isLtr ? 'ltr' : 'rtl'}>
        <NavBar />
        <Switch>
          <Route path='/login' component={ LoginChecker } />
          <Route path='/ads' component={ Ads } />
          <Route path='/stats' component={ Stats } />

          <Route exact path='/' render={
            () => <Redirect to={
              store.getState().login.loggedIn ? '/ads' : '/login'
            } />
          } />

          <Route component={ NoMatch } />
        </Switch>
      </div>
    </Router>
  </Provider>,
   app);
