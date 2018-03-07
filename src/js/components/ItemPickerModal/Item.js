import React from 'react';
import PropTypes from 'prop-types';

const tag = '@ItemPicker.Item:';


export default class Item extends React.Component {

  constructor({ isSelected, ...rest}) {
    super();
    this.state = {
      isSelected,
    }
  }

  handleItemClick = (e) => {
    const { onClick, position, model } = this.props;
    if (onClick) {
      onClick(model, position, this);
    } else {
      const { position } = this.props;
      print(tag, `position: ${position}, on click`);
    }
    /*this.setState({
      ...this.state,
      isSelected: !this.state.isSelected,
    });*/
  }

  render() {
    const { model, position } = this.props;
    const { isSelected } = this.state;
    const style = null && { backgroundColor: randomColor(), };
    return <div class={ 'ia-item-picker__item' + (isSelected ? ' ia-item-picker__item__selected' : '') }
      style={ style }
      title={ model }
      onClick={ this.handleItemClick }>
      { this.props.children }
    </div>;
  }
}

Item.propTypes = {
  position: PropTypes.number.isRequired,
  model: PropTypes.node.isRequired,
};
