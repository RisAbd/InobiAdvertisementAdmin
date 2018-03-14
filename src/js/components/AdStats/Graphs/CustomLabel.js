import React from 'react';
import PropTypes from 'prop-types';
import { localize } from 'react-localize-redux';
const tag = '@AdStats.GraphLabel:';


export function Label(props) {
  const { children, viewBox, translate } = props;
  let { width, height, x, y } = viewBox;
  let dx, dy;
  switch (children) {
    case translate('views'):
      x = 0, y = 0, dx = 15, dy = 20;
      break;
    case translate('hours'):
      x = height, y = height, dx = 45, dy = 75;
      break;
    case translate('days'):
      x = width, dx = 35, dy = 60;
      break;
  }
  return <text x={x} y={y} dx={dx} dy={dy} fontSize='14'>{children}</text>;
}

export default localize(Label, 'locale');
