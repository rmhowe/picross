import React from 'react';
import { HIGHLIGHTED, BLOCKED, HIGHLIGHT, BLOCK } from '../constants';
import BoardTile from './BoardTile';

export default class GameBoard extends React.Component {
  generateBoard(puzzleId, puzzle, currentTool, handleBoardDragStart, handleBoardDrag) {
    const board = [];
    const size = puzzle.get('rows').size;

    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        const tileState = puzzle.get('tileStates').get(`${i},${j}`);
        row.push(
          <BoardTile
            i={i}
            j={j}
            appColor={this.props.appColor}
            tileState={tileState}
            boardSize={size}
            rowNumbers={puzzle.get('rows').get(i)}
            columnNumbers={puzzle.get('columns').get(j)}
            currentTool={currentTool}
            handleBoardDragStart={handleBoardDragStart.bind(this, i, j, tileState, currentTool, puzzleId)}
            handleBoardDrag={handleBoardDrag.bind(this, i, j, puzzleId)}
          />
        );
      }
      board.push(row);
    }

    return board;
  }

  render() {
    const { currentPuzzle, currentTool, puzzles, handleBoardDragStart, handleBoardDrag } = this.props;
    const puzzle = puzzles.get(currentPuzzle);
    const board = this.generateBoard(currentPuzzle, puzzle, currentTool, handleBoardDragStart, handleBoardDrag);
    const boardModifier = currentTool === HIGHLIGHT ? "game-board--highlight" : "game-board--block";

    let winMessage;
    if (puzzle.get('won')) {
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
  currentPuzzle: React.PropTypes.number.isRequired,
  currentTool: React.PropTypes.string.isRequired,
  puzzles: React.PropTypes.object.isRequired,
  handleBoardDragStart: React.PropTypes.func.isRequired,
  handleBoardDrag: React.PropTypes.func.isRequired
};
