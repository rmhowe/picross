import React from 'react';

export default class Button extends React.Component {
  render() {
    return (
      <div
        onClick={this.props.onClick}
      >
        {this.props.children}
      </div>
    );
  }
}
