import React from 'react';
import { connect } from 'react-redux';

import { login } from '../actions/loginActions';


@connect((store) => {
  return {
    login: { ...store.login },
  }
})
export default class LoginForm extends React.Component {

  login = (event) => {
    this.props.dispatch(login(event.target.admin_key.value));
    event.preventDefault();
  };

  render() {
    const { disabled } = this.props;
    return <form onSubmit={ this.login } class='ia-login-form ia-centered'>
      <input
        class='ia-login-form__text-input'
        placeholder='Admin key'
        type='password'
        name='admin_key'
        disabled={ disabled } />
      <input
        class='ia-login-form__submit-input'
        type='submit'
        value='Login'
        disabled={ disabled } />
    </form>;
  }
}
