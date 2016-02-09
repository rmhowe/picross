import React from 'react';
import { connect } from 'react-redux';
import {
  fetchPuzzle,
  fetchTileStates,
} from '../actions';
import GamePage from './GamePage';

class App extends React.Component {
  componentDidMount() {
    for (let i = 1; i <= 10; i++) {
      this.props.dispatch(fetchPuzzle(i));
      this.props.dispatch(fetchTileStates(i));
    }
  }

  render() {
    const { currentPuzzle, puzzles } = this.props;
    let page;
    if (puzzles[currentPuzzle] && puzzles[currentPuzzle].rows.length > 0) {
      page = (
        <GamePage/>
      );
    }

    return (
      <div className="App">
        <div className="container">
          {page}
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
