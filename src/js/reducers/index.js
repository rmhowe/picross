import { combineReducers } from 'redux';

import {
  SELECT_PUZZLE,
  REQUEST_PUZZLE,
  RECEIVE_PUZZLE,
  SELECT_TOOL,
  MODIFY_TILE,
  REQUEST_TILE_STATES,
  RECEIVE_TILE_STATES,
  SET_WIN_STATE,
  HIGHLIGHTED,
  BLOCKED,
  EMPTY,
  HIGHLIGHT,
  BLOCK
} from '../constants';

function currentPuzzle(state = 1, action) {
  switch (action.type) {
    case SELECT_PUZZLE:
      return action.payload.puzzleId;
    default:
      return state;
  }
}

function currentTool(state = HIGHLIGHT, action) {
  switch (action.type) {
    case SELECT_TOOL:
      return action.payload.tool;
    default:
      return state;
  }
}

function puzzles(state = {}, action) {
  switch (action.type) {
    case REQUEST_PUZZLE:
    case RECEIVE_PUZZLE:
    case MODIFY_TILE:
    case RECEIVE_TILE_STATES:
    case SET_WIN_STATE:
      const id = action.payload.puzzleId;
      return Object.assign({}, state, {
        [id]: puzzle(state[id], action)
      });
    default:
      return state;
  }
}

function puzzle(state = {
  isFetching: false,
  rows: [],
  columns: [],
  solution: [],
  tileStates: {},
  won: false
}, action) {
  switch (action.type) {
    case REQUEST_PUZZLE:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_PUZZLE:
      return Object.assign({}, state, {
        isFetching: false,
        rows: action.payload.rows,
        columns: action.payload.columns,
        solution: action.payload.solution
      });
    case MODIFY_TILE:
      return Object.assign({}, state, {
        tileStates: tileState(state.tileStates, action)
      });
    case RECEIVE_TILE_STATES:
      return Object.assign({}, state, {
        tileStates: action.payload.tileStates
      });
    case SET_WIN_STATE:
      return Object.assign({}, state, {
        won: action.payload.winState
      });
    default:
      return state;
  }
}

function tileState(state = {}, action) {
  switch (action.payload.modification) {
    case EMPTY:
      return Object.assign({}, state, {
        [action.payload.tileCoords]: null
      });
    case HIGHLIGHT:
      return Object.assign({}, state, {
        [action.payload.tileCoords]: HIGHLIGHTED
      });
    case BLOCK:
      return Object.assign({}, state, {
        [action.payload.tileCoords]: BLOCKED
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  currentPuzzle,
  currentTool,
  puzzles
});
export default rootReducer;
