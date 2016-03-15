import React from 'react';
import Modal from './Modal';

export default class ColorChangeModal extends React.Component {
  render() {
    const colors = ['#3B9DFF', '#F44336', '#4CAF50', '#FFC107'];
    const colorBlocks = colors.map((color, index) => {
      const blockStyle = {
        backgroundColor: color
      };
      return (
        <div
          key={index}
          className="color-modal__block-container"
        >
          <div
            style={blockStyle}
            className="color-modal__block"
            onClick={this.props.handleAppColorChange.bind(this, color)}
          >
          </div>
        </div>
      );
    });

    const modalStyle = {
      border: `1px solid ${this.props.appColor}`
    };

    return (
      <Modal>
        <div
          key="modal"
          style={modalStyle}
          className="modal"
        >
          {colorBlocks}
        </div>
      </Modal>
    );
  }
}
