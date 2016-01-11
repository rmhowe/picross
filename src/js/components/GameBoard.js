import React from 'react';

export default class GameBoard extends React.Component {
  generateBoard(puzzle, tileStates, highlightClick) {
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

        let classes = "game-board__tile";
        if (tileStates.get(`${i},${j}`) === 'HIGHLIGHTED') {
          classes += " game-board__tile--highlighted";
        }

        row.push(
          <div
            className={classes}
            style={tileStyle}
            onClick={highlightClick.bind(this, `${i},${j}`)}
          ></div>
        );
      }
      board.push(row);
    }

    return board;
  }

  render() {
    const { puzzle, tileStates, highlightClick } = this.props;
    const board = this.generateBoard(puzzle, tileStates, highlightClick);

    return (
      <div className="game-board">
        {board}
      </div>
    );
  }
}

GameBoard.propTypes = {
  puzzle: React.PropTypes.object,
  highlightedTiles: React.PropTypes.object
};
