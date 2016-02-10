import React from 'react';
import HintNumbers from './HintNumbers';
import { HIGHLIGHTED, BLOCKED } from '../constants';

export default class BoardTile extends React.Component {
  getStyle(tileSize, i, j) {
    const tileStyle = {
      width: `${tileSize}%`,
      height: `${tileSize}%`
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
    const { i, j, tileState, boardSize, rowNumbers, columnNumbers, handleBoardDragStart, handleBoardDrag } = this.props;
    const tileSize = 100 / boardSize;

    const style = this.getStyle(tileSize, i, j);
    let classes = "game-board__tile";
    if (tileState === HIGHLIGHTED) {
      classes += " game-board__tile--highlighted";
    } else if (tileState === BLOCKED) {
      classes += " game-board__tile--blocked";
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
