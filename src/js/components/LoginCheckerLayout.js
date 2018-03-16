import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import Spinner from './LoadingIndicator';
import LoginForm from './LoginForm';

const tag = '@LoginChecker:';


@connect( (store) => ( {login: store.login} ) )
export default class LoginCheckerLayout extends React.Component {
  render() {
    const { indexRoute } = this.props;

    const { isFetching, loggedIn } = this.props.login;
    const style = {
      backgroundColor: '#ffffff',
      opacity: '0.5',
      display: (isFetching ? 'block' : 'none')
    };

    if (!loggedIn) {
      return <div class='ia-match-parent'>
        <LoginForm />
        <div class='ia-match-parent' style={style}>
          <Spinner width='100px' height='100px' hidden={ !isFetching } centered />
        </div>
      </div>;
    }
    return <Redirect to={ indexRoute || '/' } />;
  }
}
