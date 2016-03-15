import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Modal extends React.Component {
  render() {
    return (
      <ReactCSSTransitionGroup transitionName="modal" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        {this.props.children}
      </ReactCSSTransitionGroup>
    );
  }
}
