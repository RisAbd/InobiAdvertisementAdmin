import React from 'react';
import PropTypes from 'prop-types';

const tag = '@AdStatsInfoChunk:';


export default class AdStatsInfoChunk extends React.Component {

  render() {
    const { title, children, ...rest } = this.props;
    return <div class='ia-ad-stats-info-chunk' { ...rest }>
      <h3 class='ia-ad-stats-info-chunk__title'>{ title }</h3>
      { children }
    </div>;
  }
}

AdStatsInfoChunk.propTypes = {
  title: PropTypes.string.isRequired,
};