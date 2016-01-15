import React from 'react';
import { HIGHLIGHTED, BLOCKED } from '../constants';

export default class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dragging: false };
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener('mouseup', this.handleDragEnd);
  }

  componentWillUnmount() {
    document.body.removeEventListener('mouseup', this.handleDragEnd);
  }

  handleDragStart(i, j, event) {
    this.setState({ dragging: true });
    
    const { currentPuzzle, puzzles, handleTileChange } = this.props;
    handleTileChange(currentPuzzle, `${i},${j}`, false, event);
  }

  handleDragEnd() {
    this.setState({ dragging: false });
  }

  handleDrag(i, j, event) {
    const { currentPuzzle, puzzles, handleTileChange } = this.props;
    if (this.state.dragging) {
      handleTileChange(currentPuzzle, `${i},${j}`, false, event);
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
            onClick={handleTileChange.bind(this, puzzleId, `${i},${j}`, false)}
            onContextMenu={handleTileChange.bind(this, puzzleId, `${i},${j}`, true)}
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
    const { currentPuzzle, puzzles, handleTileChange } = this.props;
    const puzzle = puzzles[currentPuzzle];
    const board = this.generateBoard(currentPuzzle, puzzle, handleTileChange);

    return (
      <div
        className="game-board"
      >
        {board}
      </div>
    );
  }
}

GameBoard.propTypes = {
  currentPuzzle: React.PropTypes.number,
  puzzles: React.PropTypes.object,
  handleTileChange: React.PropTypes.func
};
