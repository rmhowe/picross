import React from 'react';
import { HIGHLIGHTED, BLOCKED, HIGHLIGHT, BLOCK } from '../constants';

export default class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dragging: false };
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.handleDragEnd);
    document.addEventListener('mouseleave', this.handleDragEnd);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleDragEnd);
    document.removeEventListener('mouseleave', this.handleDragEnd);
  }

  handleDragStart(i, j, event) {
    this.setState({ dragging: true });

    const { currentPuzzle, currentTool, puzzles, handleTileChange } = this.props;
    handleTileChange(currentPuzzle, `${i},${j}`, currentTool, event);
  }

  handleDragEnd() {
    this.setState({ dragging: false });
  }

  handleDrag(i, j, event) {
    const { currentPuzzle, currentTool, puzzles, handleTileChange } = this.props;
    if (this.state.dragging) {
      handleTileChange(currentPuzzle, `${i},${j}`, currentTool, event);
    }
  }

  generateBoard(puzzleId, puzzle, handleTileChange) {
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

        let classes = "game-board__tile";
        if (puzzle.tileStates[`${i},${j}`] === HIGHLIGHTED) {
          classes += " game-board__tile--highlighted";
        } else if (puzzle.tileStates[`${i},${j}`] === BLOCKED) {
          classes += " game-board__tile--blocked";
        }

        row.push(
          <div
            className={classes}
            style={tileStyle}
            onMouseOver={this.handleDrag.bind(this, i, j)}
            onMouseDown={this.handleDragStart.bind(this, i, j)}
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
    const { currentPuzzle, currentTool, puzzles, handleTileChange } = this.props;
    const puzzle = puzzles[currentPuzzle];
    const board = this.generateBoard(currentPuzzle, puzzle, handleTileChange);
    const boardModifier = currentTool === HIGHLIGHT ? "game-board--highlight" : "game-board--block";

    return (
      <div
        className={`game-board ${boardModifier}`}
      >
        {board}
      </div>
    );
  }
}

GameBoard.propTypes = {
  currentPuzzle: React.PropTypes.number,
  currentTool: React.PropTypes.string,
  puzzles: React.PropTypes.object,
  handleTileChange: React.PropTypes.func
};
