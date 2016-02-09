import React from 'react';
import { connect } from 'react-redux';
import {
  modifyTile,
  fetchPuzzle,
  receiveTileStates,
  fetchTileStates,
  saveTileState,
  selectPuzzle,
  selectTool,
  setWinState
} from '../actions';
import { HIGHLIGHTED, BLOCKED, EMPTY, HIGHLIGHT, BLOCK } from '../constants';
import GameBoard from '../components/GameBoard';
import ToolSelector from '../components/ToolSelector';
import PuzzleSelector from '../components/PuzzleSelector';

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      dragType: null
    };

    this.handleToolChange = this.handleToolChange.bind(this);
    this.handleTabPress = this.handleTabPress.bind(this);
    this.handlePuzzleChange = this.handlePuzzleChange.bind(this);
    this.handleBoardReset = this.handleBoardReset.bind(this);
    this.handleBoardDragStart = this.handleBoardDragStart.bind(this);
    this.handleBoardDrag = this.handleBoardDrag.bind(this);
    this.handleBoardDragEnd = this.handleBoardDragEnd.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.handleBoardDragEnd);
    document.addEventListener('mouseleave', this.handleBoardDragEnd);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleBoardDragEnd);
    document.removeEventListener('mouseleave', this.handleBoardDragEnd);
  }

  componentDidUpdate(prevProps) {
    const numPuzzles = Object.keys(prevProps.puzzles).length;
    for (let i = 1; i <= numPuzzles; i++) {
      const prevTileStates = prevProps.puzzles[i].tileStates;
      const newTileStates = this.props.puzzles[i].tileStates;
      if (JSON.stringify(prevTileStates) !== JSON.stringify(newTileStates)) {
        this.props.dispatch(saveTileState(i, newTileStates));
        const solution = this.props.puzzles[i].solution;
        const solved = this.checkSolution(solution, newTileStates);
        if (solved !== this.props.puzzles[i].won) {
          this.props.dispatch(setWinState(i, solved));
        }
      }
    }
  }

  checkSolution(solution, tileStates) {
    let solutionHighlightedTiles = 0;
    const solutionHighlightedTilesFilled = solution.every((row, i) => {
      return row.every((highlightedSection) => {
        for (let j = highlightedSection[0]; j <= highlightedSection[1]; j++) {
          solutionHighlightedTiles++;
          if (tileStates[`${i},${j}`] !== HIGHLIGHTED) {
            return false;
          }
        }
        return true;
      });
    });

    let solved = false;
    if (solutionHighlightedTilesFilled) {
      let userHighlightedTiles = 0;
      Object.keys(tileStates).forEach((key) => {
        if (tileStates[key] === HIGHLIGHTED) {
          userHighlightedTiles++;
        }
      });

      if (solutionHighlightedTiles === userHighlightedTiles) {
        solved = true;
      }
    }

    return solved;
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

  handleBoardReset(puzzleId) {
    this.props.dispatch(receiveTileStates(puzzleId, {}));
  }

  handleBoardDragStart(i, j, tileState, currentTool, puzzleId, event) {
    event.preventDefault();

    let tileChange;
    if (currentTool === BLOCK && (!tileState || tileState === HIGHLIGHTED)) {
      tileChange = BLOCK;
    } else if (currentTool === HIGHLIGHT && (!tileState || tileState === BLOCKED)) {
      tileChange = HIGHLIGHT;
    } else {
      tileChange = EMPTY;
    }

    const tileCoords = `${i},${j}`;
    this.props.dispatch(modifyTile(puzzleId, tileCoords, tileChange));
    this.setState({
      dragging: true,
      dragType: tileChange
    });
  }

  handleBoardDrag(i, j, puzzleId, event) {
    event.preventDefault();
    const { currentPuzzle, currentTool, puzzles } = this.props;
    if (this.state.dragging) {
      const tileCoords = `${i},${j}`;
      const tileChange = this.state.dragType;
      this.props.dispatch(modifyTile(puzzleId, tileCoords, tileChange));
    }
  }

  handleBoardDragEnd() {
    this.setState({
      dragging: false,
      dragType: null
    });
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
          handleBoardDragStart={this.handleBoardDragStart}
          handleBoardDrag={this.handleBoardDrag}
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
