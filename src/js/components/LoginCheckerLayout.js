import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router';

import Spinner from './LoadingIndicator';
import LoginForm from './LoginForm';

import { checkFromStorage } from '../actions/loginActions';

import { searchParamsToObject } from '../utils';

const tag = '@LoginChecker:';


@connect( (store) => ( {login: store.login} ) )
@withRouter
export default class LoginCheckerLayout extends React.Component {

  componentWillMount() {
    this.props.dispatch(checkFromStorage());
  }

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
