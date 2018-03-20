import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { getActiveLanguage } from 'react-localize-redux';

import { LANGUAGES } from "./constants";

import NavBar from './components/Nav';
import LoginChecker from './components/LoginCheckerLayout';
import Ads from './pages/Ads';
import NoMatch from './pages/NoMatch';
import Stats from './pages/Stats';

const tag = '@client.js:';
const FARSI = LANGUAGES[2].code;

const mapStateToProps = ({ login, locale }) => ({ login, isLtr: getActiveLanguage(locale).code !== FARSI });
@connect(mapStateToProps)
export class App extends React.Component {
  handleRedirect = () => {
    const { login: { loggedIn } } = this.props;
    const loginPathname = '/login';
    const adsPathname = '/ads';
    const path = loggedIn ? adsPathname : loginPathname;

    return <Redirect to={path}/>
  };

  render() {
    const { isLtr } = this.props;

    return (
      <Router>
        <div class='ia-react-root' dir={isLtr ? 'ltr' : 'rtl'}>
          <NavBar />
          <Switch>
            <Route exact path='/' render={this.handleRedirect} />
            <Route path='/ads' component={ Ads } />
            <Route path='/login' component={ LoginChecker } />
            <Route path='/stats' component={ Stats } />
            <Route component={ NoMatch } />
          </Switch>
        </div>
      </Router>
    )
  }
}
