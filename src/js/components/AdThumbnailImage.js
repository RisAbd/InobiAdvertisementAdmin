import React from 'react';
import PropTypes from 'prop-types';

import { URL } from '../constants';

import { jwt } from '../utils';


export default class AdThumbnailImage extends React.Component {

  render() {
    const { dir, src, children, ...rest } = this.props;
    const srcUrl = src ? `${ URL.thumbnail }${src}?in_temp=${dir === 'temp'}&jwt=${jwt()}` : 'images/no_src.svg';
    const type = src ? this.props.type : 'unknown';
    const style = { background: `url(${srcUrl}) center no-repeat`, backgroundSize: 'cover'};

    return (
      <div class='ia-ad__image-container' { ...rest } style={style}>
        {children && children }
      </div>
    );
  }
}

AdThumbnailImage.propTypes = {
  dir: PropTypes.string,
  src: PropTypes.string,
  type: PropTypes.string,
};
