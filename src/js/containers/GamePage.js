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
import Button from '../components/Button';

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      dragType: null
    };

    this.handleToolChange = this.handleToolChange.bind(this);
    this.handleTabPress = this.handleTabPress.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
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
    const numPuzzles = prevProps.puzzles.size;
    for (let i = 1; i <= numPuzzles; i++) {
      const prevTileStates = prevProps.puzzles.get(i).get('tileStates');
      const newTileStates = this.props.puzzles.get(i).get('tileStates');
      if (JSON.stringify(prevTileStates) !== JSON.stringify(newTileStates)) {
        this.props.dispatch(saveTileState(i, newTileStates));
        const solution = this.props.puzzles.get(i).get('solution');
        const solved = this.checkSolution(solution, newTileStates);
        if (solved !== this.props.puzzles.get(i).get('won')) {
          this.props.dispatch(setWinState(i, solved));
        }
      }
    }
  }

  checkSolution(solution, tileStates) {
    let solutionHighlightedTiles = 0;
    const solutionHighlightedTilesFilled = solution.every((row, i) => {
      return row.every((highlightedSection) => {
        for (let j = highlightedSection.get(0); j <= highlightedSection.get(1); j++) {
          solutionHighlightedTiles++;
          if (tileStates.get(`${i},${j}`) !== HIGHLIGHTED) {
            return false;
          }
        }
        return true;
      });
    });

    let solved = false;
    if (solutionHighlightedTilesFilled) {
      let userHighlightedTiles = 0;
      tileStates.forEach((tileState) => {
        if (tileState === HIGHLIGHTED) {
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

  handleBackButton() {
    this.props.dispatch(selectPuzzle(0));
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
    const { currentPuzzle, currentTool, puzzles, settings } = this.props;
    let resetButton;
    let toolSelector;
    let backButton;
    let board;
    if (puzzles.get(currentPuzzle) && puzzles.get(currentPuzzle).get('rows').size > 0) {
      resetButton = (
        <Button
          className="reset-button"
          color={this.props.settings.get('appColor')}
          onClick={this.handleBoardReset.bind(this, currentPuzzle)}
        >
          Reset
        </Button>
      );

      toolSelector = (
        <ToolSelector
          appColor={this.props.settings.get('appColor')}
          currentTool={currentTool}
          handleToolChange={this.handleToolChange}
        />
      );

      backButton = (
        <Button
          className="back-button"
          color={this.props.settings.get('appColor')}
          onClick={this.handleBackButton}
        >
          Back
        </Button>
      );

      board = (
        <GameBoard
          appColor={this.props.settings.get('appColor')}
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
          {backButton}
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
    puzzles: state.puzzles,
    settings: state.settings
  };
}

export default connect(select)(GamePage);
