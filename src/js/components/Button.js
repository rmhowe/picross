import React from 'react';

export default class Button extends React.Component {
  render() {
    const { className, ...otherProps } = this.props;
    return (
      <div
        className={`button ${className}`}
        {...otherProps}
      >
        {this.props.children}
      </div>
    );
  }
}
