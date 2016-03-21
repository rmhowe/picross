import React from 'react';
import { connect } from 'react-redux';
import {
  fetchPuzzle,
  fetchTileStates,
} from '../actions';
import IndexPage from './IndexPage';
import GamePage from './GamePage';

class App extends React.Component {
  componentDidMount() {
    for (let i = 1; i <= 10; i++) {
      this.props.dispatch(fetchPuzzle(i));
      this.props.dispatch(fetchTileStates(i));
    }
  }

  render() {
    const { currentPuzzle, puzzles, settings } = this.props;

    let page;
    if (currentPuzzle && puzzles.get(currentPuzzle) && puzzles.get(currentPuzzle).get('rows').size > 0) {
      page = <GamePage/>;
    } else {
      page = <IndexPage/>;
    }

    let classNames = "app";
    if (settings.get('nightMode')) {
      classNames += " app--night-mode";
    }

    return (
      <div className={classNames}>
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
    puzzles: state.puzzles,
    settings: state.settings
  };
}

export default connect(select)(App);
