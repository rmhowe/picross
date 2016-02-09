import React from 'react';
import { HIGHLIGHTED, BLOCKED, HIGHLIGHT, BLOCK } from '../constants';

export default class GameBoard extends React.Component {
  generateBoard(puzzleId, puzzle, currentTool, handleBoardDragStart, handleBoardDrag) {
    const board = [];
    const size = puzzle.rows.length;
    const tileSize = 100 / size;

    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        const tileStyle = this.getTileStyle(tileSize, i, j);

        let rowNumbers;
        if (j === 0) {
          rowNumbers = this.getRowNumbers(puzzle.rows[i]);
        }

        let columnNumbers;
        if (i === size - 1) {
          columnNumbers = this.getColumnNumbers(puzzle.columns[j]);
        }

        const tileState = puzzle.tileStates[`${i},${j}`];
        let classes = "game-board__tile";
        if (tileState === HIGHLIGHTED) {
          classes += " game-board__tile--highlighted";
        } else if (tileState === BLOCKED) {
          classes += " game-board__tile--blocked";
        }

        row.push(
          <div
            className={classes}
            style={tileStyle}
            onMouseDown={handleBoardDragStart.bind(this, i, j, tileState, currentTool, puzzleId)}
            onMouseOver={handleBoardDrag.bind(this, i, j, puzzleId)}
          >
            {rowNumbers}
            {columnNumbers}
          </div>
        );
      }
      board.push(row);
    }

    return board;
  }

  getTileStyle(tileSize, i, j) {
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

  getRowNumbers(rowNumbers) {
    const rowNumbersSpaced = rowNumbers.reduce((prev, curr) => {
      return `${prev} ${curr}`;
    }, "");
    return <span className="game-board__row-numbers">{rowNumbersSpaced}</span>;
  }

  getColumnNumbers(columnNumbers) {
    const columnNumbersSpaced = columnNumbers.reduce((prev, curr) => {
      return `${prev} ${curr}`;
    }, "");
    return <span className="game-board__column-numbers">{columnNumbersSpaced}</span>;
  }

  render() {
    const { currentPuzzle, currentTool, puzzles, handleBoardDragStart, handleBoardDrag } = this.props;
    const puzzle = puzzles[currentPuzzle];
    const board = this.generateBoard(currentPuzzle, puzzle, currentTool, handleBoardDragStart, handleBoardDrag);
    const boardModifier = currentTool === HIGHLIGHT ? "game-board--highlight" : "game-board--block";

    let winMessage;
    if (puzzle.won) {
      winMessage = <div className="win-message">Congratulations! You solved the puzzle :)</div>;
    }

    return (
      <div
        className={`game-board ${boardModifier}`}
      >
        {winMessage}
        {board}
      </div>
    );
  }
}

GameBoard.propTypes = {
  currentPuzzle: React.PropTypes.number,
  currentTool: React.PropTypes.string,
  puzzles: React.PropTypes.object,
  handleBoardDragStart: React.PropTypes.func,
  handleBoardDrag: React.PropTypes.func
};
