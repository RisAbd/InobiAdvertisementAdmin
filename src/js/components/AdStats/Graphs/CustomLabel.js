import React from 'react';
import PropTypes from 'prop-types';

const tag = '@AdStats.GraphLabel:';


export default function Label(props) {
  const { children, viewBox } = props;
  let { width, height, x, y } = viewBox;
  let dx, dy;
  switch (children) {
    case 'views':
      x = 0, y = 0, dx = 15, dy = 20;
      break;
    case 'hours':
      x = width, dx = 20, dy = 45;
      break;
    case 'days':
      x = width, dx = 35, dy = 60; 
      break;
  }
  return <text x={x} y={y} dx={dx} dy={dy} fontSize='16'>{children}</text>;
}