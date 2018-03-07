import './globals';
import './styles.js';



import './test';



import React from 'react';



import Ripple from './ripple/Ripple';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from 'react-router';
import createHistory from 'history/createHashHistory';

import store from './store.js';

import NavBar from './components/Nav';
import Footer from './components/Footer';

import LoginChecker from './components/LoginCheckerLayout';
import Map from './pages/Map';
import Ads from './pages/Ads';
import Views from './pages/Views';
import BoxUpdates from './pages/BoxUpdates';
import NoMatch from './pages/NoMatch';
import Stats from './pages/Stats';

import Test from './pages/Test';

const tag = '@client.js:';


const app = document.getElementById('app');
const history = createHistory();


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div class='ia-react-root'>
        <NavBar />
        <Switch>
          <Route path='/login' component={ LoginChecker } />
          <Route path='/ads' component={ Ads } />
          <Route path='/map' component={ Map } />
          <Route path='/views' component={ Views } />
          <Route path='/box_updates' component={ BoxUpdates } />
          <Route path='/test' component={ Test } />
          <Route path='/stats' component={ Stats } />

          <Route exact path='/' render={ 
            () => <Redirect from='/' to={
              store.getState().login.loggedIn ? '/stats' : '/login'
            } /> 
          } />

          <Route component={ NoMatch } />
        </Switch>
      </div>
    </Router>
  </Provider>,
   app);
