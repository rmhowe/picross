import React from 'react';
import Radium from 'radium';
import { HIGHLIGHT, BLOCK } from '../constants';
import { shadeColor } from '../util';

class ToolSelector extends React.Component {
  render() {
    const { currentTool } = this.props;
    const toolClass = "tool-selector__tool";

    const toolStyle = {
      color: this.props.appColor,
      border: `1px solid ${this.props.appColor}`,
      ":hover": {
        color: "white",
        backgroundColor: shadeColor(this.props.appColor, 8)
      }
    };

    const activeToolStyle = {
      backgroundColor: shadeColor(this.props.appColor, 8),
      color: "white"
    };

    const highlightToolStyle = currentTool === HIGHLIGHT ? [toolStyle, activeToolStyle] : toolStyle;
    const blockToolStyle = currentTool === BLOCK ? [toolStyle, activeToolStyle] : toolStyle;

    return (
      <div className="tool-selector">
        <div
          key="highlight"
          style={highlightToolStyle}
          className={toolClass}
          onClick={this.props.handleToolChange.bind(this, HIGHLIGHT)}
        >
          <i className="fa fa-pencil"></i>
        </div>
        <div
          key="block"
          style={blockToolStyle}
          className={toolClass}
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

export default Radium(ToolSelector);
