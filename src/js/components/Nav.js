import React from "react";
import { NavLink as Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getTranslate } from 'react-localize-redux';

import { logout } from '../actions/loginActions';

const tag = '@NavBar:';

const mapStateToProps = ({ login, stats, locale }) => ({
  login,
  fullscreen: stats.fullscreen,
  translate: getTranslate(locale)
});

@withRouter
@connect(mapStateToProps)
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

    const { login: { loggedIn }, translate } = this.props;

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
            <span class='ia-navbar__button-text'>
              { translate('Pages.Ads') }
            </span>
          </Link>
          <Link to="/stats" class='ia-navbar__button' activeClassName='ia-navbar__button--active'>
            <span class='ia-navbar__button-text'>
              { translate('Pages.Stats') }
            </span>
          </Link>
        </div>
        <div class='ia-navbar__container--alignment-end'>
          <Link to='/login' activeClassName='' class='ia-navbar__button' onClick={this.logout}>
            <span class='ia-navbar__button-text'>
              { translate('Auth.logout') }
            </span>
          </Link>
        </div>
      </div>
    </div>;
  }
}
