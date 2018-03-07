import React from 'react';
import PropTypes from 'prop-types';

import ErrorView from './Error';

const tag = '@HTTPErrorMessageView:';


export default class HTTPErrorMessageView extends React.Component {
  render() {
    const { error, ...rest } = this.props;
    const { message, response } = error;
    const { status, statusText, data } = response;
    return <ErrorView 
      title={ `${message}` } 
      subtitle={ `${status} - ${statusText}` } 
      content={ data.error || data.message } 
      { ...rest } />;
  }
}

HTTPErrorMessageView.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired,
};
