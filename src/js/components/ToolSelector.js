import React from 'react';
import { HIGHLIGHT, BLOCK } from '../constants';

export default class ToolSelector extends React.Component {
  render() {
    const { currentTool } = this.props;
    return (
      <div>
        <span onClick={this.props.handleToolChange.bind(this, HIGHLIGHT)}>Highlight</span>
        <br/><span onClick={this.props.handleToolChange.bind(this, BLOCK)}>Block</span>
        <br/>Tool: {currentTool}
      </div>
    );
  }
}

ToolSelector.propTypes = {
  currentTool: React.PropTypes.string,
  handleToolChange: React.PropTypes.func
};
