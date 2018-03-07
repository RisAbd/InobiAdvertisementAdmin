import React from 'react';
import PropTypes from 'prop-types';

const tag = '@Spinner:';


export default class LoadingIndicator extends React.Component {

  render () {
    const { hidden, centered, withShim, ...rest } = this.props;
    const shimStyle = withShim ? {
      backgroundColor: 'rgba(255,255,255,0.3)',
    } : null;
    const style = {
      display: (hidden ? 'none' : 'block'),
      position: 'absolute',
      borderRadius: '5px',
      zIndex: 3,
      ...shimStyle,
    };
    return <div style={ style }
      class={ 'ia-spinner'+(centered ? ' ia-centered' : '')+(withShim ? ' ia-match-parent' : '') } { ...rest } >
      <img src='images/spinner.png' class='ia-spinner__image'/>
    </div>;
  }
}

PropTypes.LoadingIndicator = {
  hidden: PropTypes.bool,
  centered: PropTypes.bool,
  withShim: PropTypes. bool,
  width: PropTypes.string,
  height: PropTypes.string,
};

PropTypes.defaultProps = {
  hidden: false,
  width: '150px',
  height: '150px',
};