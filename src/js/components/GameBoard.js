import React from 'react';

export default class GameBoard extends React.Component {
  generateBoard(size) {
    const board = [];
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

        row.push(<div className="game-board__tile" style={tileStyle}></div>);
      }
      board.push(row);
    }

    return board;
  }

  render() {
    const { size } = this.props;
    const board = this.generateBoard(size);

    return (
      <div className="game-board">
        {board}
      </div>
    );
  }
}

GameBoard.propTypes = {
  size: React.PropTypes.number
};
