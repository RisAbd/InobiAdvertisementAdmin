import React from 'react';
import PropTypes from 'prop-types';

import { URL } from '../constants';


export default class AdThumbnailImage extends React.Component {

  render() {
    const { dir, src, ...rest } = this.props;
    const srcUrl = src ? `${ dir === 'temp' ? URL.thumbnailTemp : URL.thumbnail }${src.split('.')[0]}.thumb` : 'images/no_src.svg';
    const type = src ? this.props.type : 'unknown';
    return <div class='ia-ad__image-container' { ...rest }>
      <img class='ia-ad__image' src={ srcUrl } />
      <div class='ia-ad__ad-type'>
        { type ? <img class='ia-ad__ad-type-image' src={ `images/icons/type_${type}.svg` } /> : null }
      </div>
    </div>;
  }
}

AdThumbnailImage.propTypes = {
  dir: PropTypes.string,
  src: PropTypes.string,
  type: PropTypes.string,
};
