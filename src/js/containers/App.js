import React from 'react';
import { connect } from 'react-redux';
import { highlightTile, fetchPuzzle, selectPuzzle } from '../actions';
import GameBoard from '../components/GameBoard';

class App extends React.Component {
  constructor() {
    super();
    this.highlightClick = this.highlightClick.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchPuzzle(1));
  }

  highlightClick(puzzleId, tileCoords) {
    this.props.dispatch(highlightTile(puzzleId, tileCoords));
  }

  render() {
    const { currentPuzzle, puzzles } = this.props;
    let board;
    if (puzzles[currentPuzzle] && Object.keys(puzzles[currentPuzzle].puzzleData).length > 0) {
      board = (
        <GameBoard
          currentPuzzle={currentPuzzle}
          puzzles={puzzles}
          highlightClick={this.highlightClick}
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
