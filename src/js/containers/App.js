import React from 'react';
import { connect } from 'react-redux';
import { modifyTile, fetchPuzzle, selectPuzzle } from '../actions';
import { HIGHLIGHTED, EMPTY, HIGHLIGHT, BLOCK } from '../constants';
import GameBoard from '../components/GameBoard';

class App extends React.Component {
  constructor() {
    super();
    this.tileChange = this.tileChange.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchPuzzle(1));
  }

  tileChange(puzzleId, tileCoords, rightClick, event) {
    event.preventDefault();
    const { puzzles } = this.props;
    if (rightClick && !puzzles[puzzleId].tileStates[tileCoords]) {
      this.props.dispatch(modifyTile(puzzleId, tileCoords, BLOCK));
    } else if (!puzzles[puzzleId].tileStates[tileCoords]) {
      this.props.dispatch(modifyTile(puzzleId, tileCoords, HIGHLIGHT));
    } else {
      this.props.dispatch(modifyTile(puzzleId, tileCoords, EMPTY));
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
          tileChange={this.tileChange}
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
