import React from 'react';
import PropTypes from 'prop-types';

import ModalView from '../ModalView';
import ItemAdder from './ItemAdder';

const tag = '@ItemPicker';


export default class ItemPickerModal extends React.Component {

  handleItemClick = (item, position, component) => {
    const { onItemClick } = this.props;
    onItemClick(item, position, component);
  };

  /*constructor({ items, ItemConstructor, ...rest }) {
    super();
    const children = items.map((item, i) => <ItemConstructor
      onClick={ this.handleItemClick } model={ item } position={ i } key={ i } />);
    this.state = {
      items,
      children,
    };
  }*/

  state = {
    items: null,
    children: null,
  };

  componentWillReceiveProps({ items, ItemConstructor, ...rest }) {
    const children = items.map((item, i) => <ItemConstructor
      onClick={ this.handleItemClick } model={ item } position={ i } key={ i } />);
    this.setState({
      items,
      children,
    });
  }

  newItemHandler = (newItem) => {
    const { ItemConstructor } = this.props;
    const { length } = this.state.children;
    this.setState({
      ...this.state,
      items: [
        ...this.state.items,
        newItem,
      ],
      children: [
        ...this.state.children,
        <ItemConstructor
          onClick={ this.handleItemClick } model={ newItem } position={ length } key={ length } />
      ],
    });
  }

  render() {
    const { items, ItemConstructor, ...modalProps } = this.props;
    const { children } = this.state;
    const itemAdder = null; // <ItemAdder ItemConstructor={ ItemConstructor } newItemHandler={ this.newItemHandler } />
    return <ModalView { ...modalProps }>
      <div class='ia-item-picker'>
        { children }
      </div>
      { itemAdder }
    </ModalView>;
  }
}

ItemPickerModal.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  ItemConstructor: PropTypes.any.isRequired,
  onItemClick: PropTypes.func.isRequired,
}
