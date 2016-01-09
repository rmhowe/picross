import React from 'react';

import GameBoard from '../components/GameBoard';

import { httpGet } from '../util/ajax';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      puzzle: null
    };
  }

  componentDidMount() {
    httpGet('/puzzles/easy/1.json').then((puzzleData) => {
      const puzzle = JSON.parse(puzzleData);
      this.setState({ puzzle });
    });
  }

  render() {
    let board;
    if (this.state.puzzle) {
      board = <GameBoard size={this.state.puzzle.rows.length}/>;
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
