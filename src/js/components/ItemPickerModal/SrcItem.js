import React from 'react';
import PropTypes from 'prop-types';

import Item from './Item';

import { URL, MEDIA_TYPES_INLINE } from '../../constants';

import { jwt } from '../../utils';

const tag = '@ItemPicker.SrcItem:';


export default class SrcItem extends React.Component {

  render() {
    const { model } = this.props;
    const splitted = model.split('.');
    const name = splitted.slice(0, -1).join('.'), 
          extension = splitted.slice(-1)[0];
    if (!MEDIA_TYPES_INLINE.includes(extension)) {
      return null;
    }
    const srcUrl = `${ URL.thumbnail }${model}?in_temp=${true}&jwt=${jwt()}`; //URL.thumbnail + name + '.thumb';
    return <Item { ...this.props }>
      <img src={ srcUrl } class='ia-item-picker__ad-src-image' />
    </Item>;
  }
}
