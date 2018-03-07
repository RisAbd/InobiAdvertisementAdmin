import React from 'react';
import PropTypes from 'prop-types';

import MessageView from './';

const tag = '@SuccessMessageView:';


export default class SuccessMessageView extends React.Component {
  render() {
    return <MessageView
      { ...this.props }
      cssModificator='type-success' />;
  }
}