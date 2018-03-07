import React from "react";
import { NavLink as Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { logout } from '../actions/loginActions';

const tag = '@NavBar:';


@withRouter
@connect((store) => ({login: store.login, fullscreen: store.stats.fullscreen }))
export default class NavBar extends React.Component {

  shouldHide = () => {
    const { location, fullscreen } = this.props;
    const hide = (fullscreen && location.pathname === '/stats');
    return hide;
  }

  logout = () => {
    this.props.dispatch(logout());
  }

  render() {

    const { loggedIn } = this.props.login;

    if (this.shouldHide()) {
      return null;
    }

    return !loggedIn ? <Redirect to='/login' /> : <div class="ia-navbar">
      <div class='ia-navbar__content'>
        <div class='ia-navbar__container--alignment-start'>
          <Link to='/' class="ia-navbar__logo">
            <img class='ia-navbar__logo-image' src='images/logo_title.png' />
          </Link>
          <Link to="/ads" class='ia-navbar__button' activeClassName='ia-navbar__button--active'>
            <span class='ia-navbar__button-text'>Ads</span>
          </Link>
          <Link to="/map" class='ia-navbar__button' activeClassName='ia-navbar__button--active'>
            <span class='ia-navbar__button-text'>Map</span>
          </Link>
          <Link to="/stats" class='ia-navbar__button' activeClassName='ia-navbar__button--active'>
            <span class='ia-navbar__button-text'>Stats</span>
          </Link>
        </div>
        <div class='ia-navbar__container--alignment-end'>
          <Link to='/test' activeClassName='' class='ia-navbar__button'>
            <span class='ia-navbar__button-text'>Test</span>
          </Link>
          <Link to='/login' activeClassName='' class='ia-navbar__button' onClick={this.logout}>
            <span class='ia-navbar__button-text'>Logout</span>
          </Link>
        </div>
      </div>
    </div>;
  }
}
