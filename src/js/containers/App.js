import React from 'react';
import { connect } from 'react-redux';
import { modifyTile, fetchPuzzle, selectPuzzle } from '../actions';
import { HIGHLIGHTED, EMPTY, HIGHLIGHT, BLOCK } from '../constants';
import GameBoard from '../components/GameBoard';

class App extends React.Component {
  constructor() {
    super();
    this.handleTileChange = this.handleTileChange.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchPuzzle(1));
  }

  handleTileChange(puzzleId, tileCoords, currentTool, event) {
    event.preventDefault();
    console.log(currentTool);
    const { puzzles } = this.props;
    if (currentTool === BLOCK && !puzzles[puzzleId].tileStates[tileCoords]) {
      this.props.dispatch(modifyTile(puzzleId, tileCoords, BLOCK));
    } else if (!puzzles[puzzleId].tileStates[tileCoords]) {
      this.props.dispatch(modifyTile(puzzleId, tileCoords, HIGHLIGHT));
    } else {
      this.props.dispatch(modifyTile(puzzleId, tileCoords, EMPTY));
    }
  }

  render() {
    const { currentPuzzle, currentTool, puzzles } = this.props;
    let board;
    if (puzzles[currentPuzzle] && puzzles[currentPuzzle].rows.length > 0) {
      board = (
        <GameBoard
          currentPuzzle={currentPuzzle}
          currentTool={currentTool}
          puzzles={puzzles}
          handleTileChange={this.handleTileChange}
        />
      );
    }

    return (
      <div className="App">
        <div className="container">
          {board}
        </div>
      </div>
    );
  }
}

function select(state) {
  return {
    currentPuzzle: state.currentPuzzle,
    currentTool: state.currentTool,
    puzzles: state.puzzles
  };
}

export default connect(select)(App);
