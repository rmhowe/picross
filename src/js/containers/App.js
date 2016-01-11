import React from 'react';
import { connect } from 'react-redux';
import { highlightTile, emptyTile, fetchPuzzle, selectPuzzle } from '../actions';
import { HIGHLIGHTED } from '../constants';
import GameBoard from '../components/GameBoard';

class App extends React.Component {
  constructor() {
    super();
    this.tileClick = this.tileClick.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchPuzzle(1));
  }

  tileClick(puzzleId, tileCoords) {
    const { puzzles } = this.props;
    if (!puzzles[puzzleId].tileStates[tileCoords]) {
      this.props.dispatch(highlightTile(puzzleId, tileCoords));
    } else {
      this.props.dispatch(emptyTile(puzzleId, tileCoords));
    }
  }

  render() {
    const { currentPuzzle, puzzles } = this.props;
    let board;
    if (puzzles[currentPuzzle] && puzzles[currentPuzzle].rows.length > 0) {
      board = (
        <GameBoard
          currentPuzzle={currentPuzzle}
          puzzles={puzzles}
          tileClick={this.tileClick}
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
    puzzles: state.puzzles
  };
}

export default connect(select)(App);
