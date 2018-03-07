import React from 'react';
import { connect } from 'react-redux';

import ItemPickerModal from '../components/ItemPickerModal';
import Item from '../components/ItemPickerModal/Item';

import * as utils from '../utils';
import * as Constants from '../constants';

import * as mediaActions from '../actions/mediaActions';

const tag = '@TestPage:';


@connect((store) => ({ store }))
export default class Test extends React.Component {

  state = {
    isItemPickerShown: false,
  };

  showItemPicker = (e) => {
    this.setState({
      ...this.state,
      isItemPickerShown: true,
    });
  };

  handleModalCloseClick = (e) => {
    this.setState({
      ...this.state,
      isItemPickerShown: false
    });
  }

  componentWillMount() {
    const dir = 'temp';
    const { [dir]: ds } = this.props.store.mediaLists;
    if (!ds.isFetching && Date.now() - ds.fetched > Constants.INTERVAL.oneMinute) {
      this.props.dispatch(mediaActions.fetchList(dir));
    }
  }

  onItemClick = (item) => {

  }

  render() {
    return <div class='ia-test-tab'>
      <button onClick={ this.showItemPicker }>Show Item Picker</button>
    </div>
  }
}
