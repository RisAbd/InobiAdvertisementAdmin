import React from 'react';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import { login } from '../actions/loginActions';

const mapStateToProps = ({ login, locale }) => ({
  login,
  translate: getTranslate(locale),
});

const isEmail = str => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str);

@connect(mapStateToProps)
export default class LoginForm extends React.Component {

  login = (e) => {
    e.preventDefault();
    const { target } = e;
    const { login: loginCredentialEl, password: passwordEl } = target;
    const loginValue = loginCredentialEl.value;
    const passwordValue = passwordEl.value ? passwordEl.value.trim() : '';

    const credentialKey = isEmail(loginValue) ? 'email' : 'username';

    const credentials = {
      [credentialKey]: loginValue,
      pwd: passwordValue,
      login: loginValue,
    };
    this.props.dispatch(login(credentials));
  };

  render() {
    const { disabled, translate } = this.props;
    return <form onSubmit={ this.login } class='ia-login-form ia-centered'>
      <input
        class='ia-login-form__text-input'
        placeholder={ translate('login-or-email') }
        type='text'
        name='login'
        disabled={ disabled } />
      <input
        class='ia-login-form__text-input'
        placeholder={ translate('password') }
        type='password'
        name='password'
        disabled={ disabled } />
      <input
        class='ia-login-form__submit-input'
        type='submit'
        value={ translate('login') }
        disabled={ disabled } />
    </form>;
  }
}
