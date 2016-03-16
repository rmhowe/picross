import React from 'react';
import Radium from 'radium';
import HintNumbers from './HintNumbers';
import { HIGHLIGHT, BLOCK, HIGHLIGHTED, BLOCKED } from '../constants';
import { shadeColor } from '../util';

export default class BoardTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovering: false
    };
  }

  getStyle(tileSize, i, j, appColor) {
    const tileStyle = {
      width: `${tileSize}%`,
      height: `${tileSize}%`,
      border: `1px solid ${appColor}`
    };

    if (i % 5 !== 0) {
      tileStyle.borderTop = 'none';
    }

    if (j % 5 !== 0) {
      tileStyle.borderLeft = 'none';
    }

    return tileStyle;
  }

  handleMouseOver = (event) => {
    this.props.handleBoardDrag(event);
    this.setState({ isHovering: true });
  };

  handleMouseOut = () => {
    this.setState({ isHovering: false });
  };

  render() {
    const { i, j, appColor, tileState, boardSize, rowNumbers, columnNumbers, currentTool, handleBoardDragStart } = this.props;
    const tileSize = 100 / boardSize;

    const style = this.getStyle(tileSize, i, j, appColor);
    let classes = "board-tile";
    if (tileState === HIGHLIGHTED) {
      style.backgroundColor = shadeColor(appColor, 10);
    } else if (tileState === BLOCKED) {
      classes += " board-tile--blocked";
    }

    if (currentTool === HIGHLIGHT && this.state.isHovering) {
      style.backgroundColor = shadeColor(appColor, 10);
    }

    let hintNumbersRow;
    if (j === 0) {
      hintNumbersRow = <HintNumbers type="row" numbers={rowNumbers}/>;
    }

    let hintNumbersColumn;
    if (i === boardSize - 1) {
      hintNumbersColumn = <HintNumbers type="column" numbers={columnNumbers}/>;
    }

    return (
      <div
        className={classes}
        style={style}
        onMouseDown={handleBoardDragStart}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        {hintNumbersRow}
        {hintNumbersColumn}
      </div>
    );
  }
}

BoardTile.propTypes = {
  i: React.PropTypes.number.isRequired,
  j: React.PropTypes.number.isRequired,
  tileState: React.PropTypes.string,
  boardSize: React.PropTypes.number.isRequired,
  rowNumbers: React.PropTypes.object,
  columnNumbers: React.PropTypes.object,
  handleBoardDragStart: React.PropTypes.func.isRequired,
  handleBoardDrag: React.PropTypes.func.isRequired
};
