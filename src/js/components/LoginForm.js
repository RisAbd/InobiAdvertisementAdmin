import React from 'react';
import { connect } from 'react-redux';
import { getTranslate, getActiveLanguage, setActiveLanguage } from 'react-localize-redux';

import { LANGUAGES, LANGUAGE_LS_KEY } from "../constants";

import { login } from '../actions/loginActions';

import { Select } from "./Select";

const isEmail = str => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str);

const SELECTOR_LANGUAGES = LANGUAGES.map(({ code, name }) => ({
  label: name,
  value: code,
}));

const mapStateToProps = ({ login, locale }) => ({
  login,
  translate: getTranslate(locale),
  activeLanguage: getActiveLanguage(locale).code,
});

@connect(mapStateToProps)
export default class LoginForm extends React.Component {
  handleLanguageChange = ({ target }) => {
    const { value } = target;

    this.props.dispatch(setActiveLanguage(value));
    localStorage.setItem(LANGUAGE_LS_KEY, value);
  };

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
    const { disabled, translate, activeLanguage } = this.props;

    return (
      <form onSubmit={ this.login } class='ia-login-form ia-centered'>
        <Select
          style={{ margin: '0 60px'}}
          items={SELECTOR_LANGUAGES}
          currentValue={activeLanguage}
          onChange={this.handleLanguageChange}
          />
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
      </form>
    );
  }
}
