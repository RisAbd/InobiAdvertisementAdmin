import React from 'react';
import PropTypes from 'prop-types';

import { URL } from '../constants';

import { jwt } from '../utils';


export default class AdThumbnailImage extends React.Component {

  render() {
    const { dir, src, ...rest } = this.props;
    const srcUrl = src ? `${ URL.thumbnail }${src}?in_temp=${dir === 'temp'}&jwt=${jwt()}` : 'images/no_src.svg';
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
