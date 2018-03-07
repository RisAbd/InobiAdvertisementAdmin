import React from 'react';
import PropTypes from 'prop-types';

import MessageView from './';

const tag = '@ErrorMessageView:';


export default class ErrorMessageView extends React.Component {
  render() {
    const { error, ...rest } = this.props;
    if (!error) {
      return <MessageView { ...rest } cssModificator='type-error' />;
    } else {
      return <MessageView
        title={ error.message }
        content={ error.stack }
        { ...rest } 
        cssModificator='type-error' />;
    }
  }
}

ErrorMessageView.propTypes = {
  error: PropTypes.instanceOf(Error),
};
