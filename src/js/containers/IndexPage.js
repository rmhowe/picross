import React from 'react';
import { connect } from 'react-redux';
import {
  selectPuzzle
} from '../actions';
import PuzzleSelector from '../components/PuzzleSelector';
import Settings from '../components/Settings';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.handlePuzzleSelect = this.handlePuzzleSelect.bind(this);
  }

  handlePuzzleSelect(puzzleId) {
    this.props.dispatch(selectPuzzle(puzzleId));
  }

  render() {
    return (
      <div className="index-page">
        <h1 className="index-page__title">picross</h1>
        <PuzzleSelector
          puzzles={this.props.puzzles}
          handlePuzzleSelect={this.handlePuzzleSelect}
        />
        <Settings
        />
      </div>
    );
  }
}

function select(state) {
  return {
    puzzles: state.puzzles
  };
}

export default connect(select)(IndexPage);
