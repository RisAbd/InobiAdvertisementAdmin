import React from 'react';
import PropTypes from 'prop-types';

const tag = '@MessageView:';


export default class MessageView extends React.Component {
  render() {
    const { title, subtitle, content, cssModificator, ...rest } = this.props;
    const mod = cssModificator ? `--${cssModificator}` : '';
    return <div class={ `ia-message ia-message${mod}` } { ...rest } >
      <p class={ `ia-message__title ia-message__title${mod}` }>{ title }</p>
      { subtitle ? 
        <p class={ `ia-message__subtitle ia-message__subtitle${mod}` }>{ subtitle }</p> 
        : null }
      <p class={ `ia-message__content ia-message__content${mod}` }>{ content }</p>
    </div>;
  }
}

MessageView.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  cssModificator: PropTypes.string,
  content: PropTypes.string.isRequired,
};