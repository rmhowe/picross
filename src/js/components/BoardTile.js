import React from 'react';
import Radium from 'radium';
import HintNumbers from './HintNumbers';
import { HIGHLIGHT, BLOCK, HIGHLIGHTED, BLOCKED } from '../constants';
import { shadeColor } from '../util';

class BoardTile extends React.Component {
  getStyle(tileSize, i, j, appColor) {
    const borderValue = `1px solid ${appColor}`;
    const tileStyle = {
      width: `${tileSize}%`,
      height: `${tileSize}%`,
      borderTop: borderValue,
      borderBottom: borderValue,
      borderRight: borderValue,
      borderLeft: borderValue,
      ":hover": {}
    };

    if (i % 5 !== 0) {
      tileStyle.borderTop = 'none';
    }

    if (j % 5 !== 0) {
      tileStyle.borderLeft = 'none';
    }

    return tileStyle;
  }

  render() {
    const { i, j, appColor, tileState, boardSize, rowNumbers, columnNumbers, currentTool, handleBoardDragStart, handleBoardDrag } = this.props;
    const tileSize = 100 / boardSize;

    const style = this.getStyle(tileSize, i, j, appColor);
    let classes = "board-tile";
    if (tileState === HIGHLIGHTED) {
      style.backgroundColor = shadeColor(appColor, 10);
    } else if (tileState === BLOCKED) {
      classes += " board-tile--blocked";
    }

    if (currentTool === HIGHLIGHT) {
      style[':hover'].backgroundColor = shadeColor(appColor, 10);
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
        onMouseOver={handleBoardDrag}
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
  rowNumbers: React.PropTypes.array,
  columnNumbers: React.PropTypes.array,
  handleBoardDragStart: React.PropTypes.func.isRequired,
  handleBoardDrag: React.PropTypes.func.isRequired
};

export default Radium(BoardTile);
