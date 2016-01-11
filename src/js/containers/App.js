import React from 'react';
import { connect } from 'react-redux';
import { highlightTile } from '../actions';
import GameBoard from '../components/GameBoard';
import { httpGet } from '../util/ajax';

class App extends React.Component {
  constructor() {
    super();
    this.state = { puzzle: null };

    this.highlightClick = this.highlightClick.bind(this);
  }

  componentDidMount() {
    httpGet('/puzzles/easy/1.json').then((puzzleData) => {
      const puzzle = JSON.parse(puzzleData);
      this.setState({ puzzle });
    });
  }

  highlightClick(tileCoords) {
    this.props.dispatch(highlightTile(tileCoords));
  }

  render() {
    const { tileStates } = this.props;
    let board;
    if (this.state.puzzle) {
      board = (
        <GameBoard
          puzzle={this.state.puzzle}
          tileStates={tileStates}
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
    puzzle: state.puzzle,
    tileStates: state.tileStates
  };
}

export default connect(select)(App);
