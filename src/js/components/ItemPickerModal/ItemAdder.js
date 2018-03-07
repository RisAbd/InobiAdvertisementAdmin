import React from 'react';
import PropTypes from 'prop-types';

import Item from './Item';


const tag = '@ItemPicker.ItemAdder:';


export default class ItemAdder extends  React.Component {

  fetchNewItem = ({ newItemHandler, position, ...rest }) => {

    // do fetching item(s);

    const newItem = "e5100016-f7bd-42fa-90fd-2e9d9baedb85.png";

    newItemHandler(newItem);
  }

  handleClick = (e) => {
    this.fetchNewItem(this.props);
  }

  render() {
    return <div class='ia-item-picker__item ia-item-picker__item-adder'
      style={ { backgroundColor: 'pink', } }
      onClick={ this.handleClick }>
      { '+' }
    </div>;
  }
}

ItemAdder.propTypes = {
  newItemHandler: PropTypes.func.isRequired,
};
