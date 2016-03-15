import React from 'react';
import Radium from 'radium';

import { shadeColor } from '../util';

class Button extends React.Component {
  render() {
    const { className, color, ...otherProps } = this.props;

    const buttonStyle = {
      color,
      border: `1px solid ${color}`,
      ':hover': {
        color: 'white',
        backgroundColor: shadeColor(color, 15)
      }
    };

    return (
      <div
        style={buttonStyle}
        className={`button ${className}`}
        {...otherProps}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Radium(Button);
