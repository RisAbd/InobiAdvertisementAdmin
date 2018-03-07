import React from 'react';
import PropTypes from 'prop-types';

const tag = '@ModalView:';


export default class ModalView extends React.Component {

  constructor() {
    super();
    this.state = {
      level: ModalView.raise(this),
    };
  }

  componentWillUnmount() {
    ModalView.lower(this);
  }

  handleCloseClick = (e) => {
    print(tag, 'close clicked');

    const { onCloseClick } = this.props;
    if (onCloseClick) {
      onCloseClick(e, 'close');
    }

    e.stopPropagation();
  };

  handleShimClick = (e) => {
    print(tag, 'shim clicked');

    const { onCloseClick } = this.props;
    if (onCloseClick) {
      onCloseClick(e, 'shim');
    }

    e.stopPropagation();
  }

  handleModalClick = (e) => {
    //print(tag, 'modal clicked');

    const { onModalClick } = this.props;
    if (onModalClick) {
      onModalClick(e);
    }

    e.stopPropagation();
  }

  render() {
    const { level } = this.state;

    const { isOpen, onCloseClick, title } = this.props;
    const shimStyle = {
      display: isOpen ? 'block' : 'none',
      zIndex: level*100,
    };

    return <div class='ia-modal-shim' onClick={ this.handleShimClick } style={ shimStyle } >
      <div class='ia-modal' onClick={ this.handleModalClick } style={ { zIndex: shimStyle.zIndex+1, }}>
        <h4 class='ia-modal__title'>{ title }</h4>
        <button class='ia-modal__close-button' onClick={ this.handleCloseClick } />
        { this.props.children }
      </div>
    </div>
  }
}

ModalView._modalsStack = [];

ModalView.raise = (modal) => {
  if (!ModalView._modalsStack.includes(modal)) {
    ModalView._modalsStack.push(modal);
  }
  return ModalView._modalsStack.indexOf(modal)+1;
}

ModalView.lower = (modal) => {
  if (ModalView._modalsStack.includes(modal)) {
    ModalView._modalsStack.splice(ModalView._modalsStack.indexOf(modal), 1);
  }
}

ModalView.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
