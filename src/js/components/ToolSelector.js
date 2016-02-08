import React from 'react';
import { HIGHLIGHT, BLOCK } from '../constants';

export default class ToolSelector extends React.Component {
  render() {
    const { currentTool } = this.props;
    const baseToolClass = "tool-selector__tool";
    const activeToolClass = `${baseToolClass}--active`;
    const highlightToolClass = currentTool === HIGHLIGHT ? `${baseToolClass} ${activeToolClass}` : baseToolClass;
    const blockToolClass = currentTool === BLOCK ? `${baseToolClass} ${activeToolClass}` : baseToolClass;

    return (
      <div className="tool-selector">
        <div
          className={highlightToolClass}
          onClick={this.props.handleToolChange.bind(this, HIGHLIGHT)}
        >
          <i className="fa fa-pencil"></i>
        </div>
        <div
          className={blockToolClass}
          onClick={this.props.handleToolChange.bind(this, BLOCK)}
        >
          <i className="fa fa-times"></i>
        </div>
      </div>
    );
  }
}

ToolSelector.propTypes = {
  currentTool: React.PropTypes.string,
  handleToolChange: React.PropTypes.func
};
