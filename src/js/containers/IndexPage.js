import React from 'react';
import { connect } from 'react-redux';
import {
  selectPuzzle,
  setNightMode
} from '../actions';
import PuzzleSelector from '../components/PuzzleSelector';
import Settings from '../components/Settings';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.handlePuzzleSelect = this.handlePuzzleSelect.bind(this);
    this.handleNightModeClick = this.handleNightModeClick.bind(this);
  }

  handlePuzzleSelect(puzzleId) {
    this.props.dispatch(selectPuzzle(puzzleId));
  }

  handleNightModeClick() {
    this.props.dispatch(setNightMode(!this.props.settings.nightMode));
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
          handleNightModeClick={this.handleNightModeClick}
        />
      </div>
    );
  }
}

function select(state) {
  return {
    puzzles: state.puzzles,
    settings: state.settings
  };
}

export default connect(select)(IndexPage);
