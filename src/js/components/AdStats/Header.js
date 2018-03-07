import React from 'react';
import PropTypes from 'prop-types';

const tag = '@AdStats.Header:';


export default class Header extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
  };

  static defaultProps = {
    description: 'Statistics for inobi ads',
  };

  state = {
    title: this.props.title,
  };

  render() {
    return <div class='ia-ad-stats-fullscreen-header'>
      <h1 ref={function(e){if(e != null) e.contentEditable=true;}} spellCheck={false}>&laquo;{this.state.title}&raquo;</h1>
      <h2>{this.props.description}</h2>
      <div class='ia-ad-stats-fullscreen-header__logo' />
    </div>;
  }
}