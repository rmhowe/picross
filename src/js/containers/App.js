import React from 'react';
import { connect } from 'react-redux';
import { modifyTile, fetchPuzzle, selectPuzzle, selectTool } from '../actions';
import { HIGHLIGHTED, EMPTY, HIGHLIGHT, BLOCK } from '../constants';
import GameBoard from '../components/GameBoard';
import ToolSelector from '../components/ToolSelector';

class App extends React.Component {
  constructor() {
    super();
    this.handleToolChange = this.handleToolChange.bind(this);
    this.handleTileChange = this.handleTileChange.bind(this);
    this.handleTabPress = this.handleTabPress.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchPuzzle(1));
  }

  handleToolChange(newTool) {
    if (typeof newTool === 'undefined') {
      if (this.props.currentTool === HIGHLIGHT) {
        newTool = BLOCK;
      } else {
        newTool = HIGHLIGHT;
      }
    }
    this.props.dispatch(selectTool(newTool));
  }

  handleTabPress(event) {
    if (event.keyCode === 9) {
      event.preventDefault();
      this.handleToolChange();
    }
  }

  handleTileChange(puzzleId, tileCoords, currentTool, event) {
    event.preventDefault();
    const { puzzles, dispatch } = this.props;
    if (currentTool === BLOCK && !puzzles[puzzleId].tileStates[tileCoords]) {
      dispatch(modifyTile(puzzleId, tileCoords, BLOCK));
    } else if (!puzzles[puzzleId].tileStates[tileCoords]) {
      dispatch(modifyTile(puzzleId, tileCoords, HIGHLIGHT));
    } else {
      dispatch(modifyTile(puzzleId, tileCoords, EMPTY));
    }
  }

  render() {
    const { currentPuzzle, currentTool, puzzles } = this.props;
    let board;
    let toolSelector;
    if (puzzles[currentPuzzle] && puzzles[currentPuzzle].rows.length > 0) {
      toolSelector = (
        <ToolSelector
          currentTool={currentTool}
          handleToolChange={this.handleToolChange}
        />
      );

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
      <div className="App"
        onKeyDown={this.handleTabPress}
        tabIndex={0}
      >
        <div className="container">
          {toolSelector}
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
