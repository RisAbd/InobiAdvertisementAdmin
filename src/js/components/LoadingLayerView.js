import React from 'react';
import PropTypes from 'prop-types';

import Spinner from './LoadingIndicator';

const tag = '@LoadingLayerView:';


export default class LoadingLayerView extends React.Component {

  render () {
    const { hidden, spinnerProps, ...rest } = this.props;
    if (hidden) {
      return null;
    }
    return <div class='ia-loading-shim' { ...rest } >
      <Spinner { ...spinnerProps } />
    </div>;
  }
}


LoadingLayerView.propTypes = {
  hidden: PropTypes.bool.isRequired,
};