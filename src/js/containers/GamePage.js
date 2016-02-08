import React from 'react';
import { connect } from 'react-redux';
import {
  modifyTile,
  fetchPuzzle,
  receiveTileStates,
  fetchTileStates,
  saveTileState,
  selectPuzzle,
  selectTool
} from '../actions';
import { HIGHLIGHTED, EMPTY, HIGHLIGHT, BLOCK } from '../constants';
import GameBoard from '../components/GameBoard';
import ToolSelector from '../components/ToolSelector';
import PuzzleSelector from '../components/PuzzleSelector';

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.handleToolChange = this.handleToolChange.bind(this);
    this.handlePuzzleChange = this.handlePuzzleChange.bind(this);
    this.handleTileChange = this.handleTileChange.bind(this);
    this.handleBoardReset = this.handleBoardReset.bind(this);
    this.handleTabPress = this.handleTabPress.bind(this);
  }

  componentDidUpdate(prevProps) {
    const numPuzzles = Object.keys(prevProps.puzzles).length;
    for (let i = 1; i <= numPuzzles; i++) {
      if (JSON.stringify(prevProps.puzzles[i].tileStates) !== JSON.stringify(this.props.puzzles[i].tileStates)) {
        this.props.dispatch(saveTileState(i, this.props.puzzles[i].tileStates));
      }
    }
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

  handlePuzzleChange(event) {
    const { puzzles, dispatch } = this.props;
    const newPuzzle = parseInt(event.target.value);
    if (!puzzles[newPuzzle]) {
      dispatch(fetchPuzzle(newPuzzle));
      dispatch(fetchTileStates(newPuzzle));
    }
    dispatch(selectPuzzle(newPuzzle));
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

  handleBoardReset(puzzleId) {
    this.props.dispatch(receiveTileStates(puzzleId, {}));
  }

  render() {
    const { currentPuzzle, currentTool, puzzles } = this.props;
    let resetButton;
    let toolSelector;
    let puzzleSelector;
    let board;
    if (puzzles[currentPuzzle] && puzzles[currentPuzzle].rows.length > 0) {
      resetButton = (
        <div
          className="button reset-button"
          onClick={this.handleBoardReset.bind(this, currentPuzzle)}
        >
          Reset
        </div>
      );

      toolSelector = (
        <ToolSelector
          currentTool={currentTool}
          handleToolChange={this.handleToolChange}
        />
      );

      puzzleSelector = (
        <PuzzleSelector
          currentPuzzle={currentPuzzle}
          handlePuzzleChange={this.handlePuzzleChange}
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
      <div
        className="game-page"
        onKeyDown={this.handleTabPress}
        tabIndex={0}
      >
        <div className="game-page__nav">
          {toolSelector}
          {puzzleSelector}
          {resetButton}
        </div>
        {board}
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

export default connect(select)(GamePage);
