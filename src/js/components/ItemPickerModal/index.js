import React from 'react';
import PropTypes from 'prop-types';

import ModalView from '../ModalView';
import ItemAdder from './ItemAdder';
import {Switch} from "../Switch";

const tag = '@ItemPicker';


export default class ItemPickerModal extends React.Component {
  state = {
    items: null,
    children: null,
    deleteMode: false,
  };

  componentWillReceiveProps({ items, ItemConstructor, ...rest }) {
    const children = items.map((item, i) => <ItemConstructor
      onClick={ this.handleItemClick } model={ item } position={ i } key={ i } />);
    this.setState({
      items,
      children,
    });
  }

  handleItemClick = (item) => {
    const { onItemClick } = this.props;
    const { deleteMode: shouldDeleteSource } = this.state;

    onItemClick(item, shouldDeleteSource);
  };

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
  };

  handleSwitch = () => {
    this.setState(prevState => ({ deleteMode: !prevState.deleteMode }));
  };

  render() {
    const { items, ItemConstructor, translate, ...modalProps } = this.props;
    const { children, deleteMode } = this.state;
    const itemAdder = null; // <ItemAdder ItemConstructor={ ItemConstructor } newItemHandler={ this.newItemHandler } />
    return <ModalView { ...modalProps }>
      <div class='ia-item-picker'>
        <div className='ia-item-picker__switcher'>
          <span className='ia-item-picker__switcher-label'>
            { translate('delete-mode') }
          </span>
          <Switch onChange={this.handleSwitch} checked={deleteMode}/>
        </div>
        <div className={`ia-item-picker__list ${deleteMode && 'deletable'}`}>
          { children }
        </div>
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
