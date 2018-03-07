import React from 'react';
import { connect } from 'react-redux';

import * as viewsActions from '../actions/viewsActions';
import Map from '../components/Map';


@connect( (store) => store.views )
export default class Layout extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <div class='ia-match-parent'>
      <Map />
    </div>;
  }
}
