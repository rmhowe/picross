import React from 'react';

export default class GameBoard extends React.Component {
  generateBoard(puzzleId, puzzle, tileClick) {
    const board = [];
    const size = puzzle.rows.length;
    const tileSize = 100 / size;

    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
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

        let rowNumbers;
        if (j === 0) {
          const rowNumbersSpaced = puzzle.rows[i].reduce((prev, curr) => {
            return `${prev} ${curr}`;
          }, "");
          rowNumbers = <span className="game-board__row-numbers">{rowNumbersSpaced}</span>;
        }

        let columnNumbers;
        if (i === size - 1) {
          const columnNumbersSpaced = puzzle.columns[j].reduce((prev, curr) => {
            return `${prev} ${curr}`;
          }, "");
          columnNumbers = <span className="game-board__column-numbers">{columnNumbersSpaced}</span>;
        }

        let classes = "game-board__tile";
        if (puzzle.tileStates[`${i},${j}`] === 'HIGHLIGHTED') {
          classes += " game-board__tile--highlighted";
        }

        row.push(
          <div
            className={classes}
            style={tileStyle}
            onClick={tileClick.bind(this, puzzleId, `${i},${j}`)}
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

  render() {
    const { currentPuzzle, puzzles, tileClick } = this.props;
    const puzzle = puzzles[currentPuzzle];
    const board = this.generateBoard(currentPuzzle, puzzle, tileClick);

    return (
      <div className="game-board">
        {board}
      </div>
    );
  }
}

GameBoard.propTypes = {
  currentPuzzle: React.PropTypes.number,
  puzzles: React.PropTypes.object,
  tileClick: React.PropTypes.func
};
