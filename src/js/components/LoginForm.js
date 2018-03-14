import React from 'react';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import { login } from '../actions/loginActions';

const mapStateToProps = ({ login, locale }) => ({
  login,
  translate: getTranslate(locale),
});

@connect(mapStateToProps)
export default class LoginForm extends React.Component {

  login = (event) => {
    this.props.dispatch(login(event.target.admin_key.value));
    event.preventDefault();
  };

  render() {
    const { disabled, translate } = this.props;
    return <form onSubmit={ this.login } class='ia-login-form ia-centered'>
      <input
        class='ia-login-form__text-input'
        placeholder={ translate('password') }
        type='password'
        name='admin_key'
        disabled={ disabled } />
      <input
        class='ia-login-form__submit-input'
        type='submit'
        value={ translate('login') }
        disabled={ disabled } />
    </form>;
  }
}
