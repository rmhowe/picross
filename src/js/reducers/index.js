import { combineReducers } from 'redux';

import {
  MODIFY_TILE,
  SELECT_PUZZLE,
  REQUEST_PUZZLE,
  RECEIVE_PUZZLE,
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

function puzzles(state = {}, action) {
  switch (action.type) {
    case REQUEST_PUZZLE:
    case RECEIVE_PUZZLE:
    case MODIFY_TILE:
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
  title: "",
  rows: [],
  columns: [],
  tileStates: {}
}, action) {
  switch (action.type) {
    case REQUEST_PUZZLE:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_PUZZLE:
      return Object.assign({}, state, {
        isFetching: false,
        title: action.payload.title,
        rows: action.payload.rows,
        columns: action.payload.columns
      });
    case MODIFY_TILE:
      return Object.assign({}, state, {
        tileStates: tileState(state.tileStates, action)
      });
    default:
      return state;
  }
}


function tileState(state = {}, action) {
  switch (action.payload.modification) {
    case HIGHLIGHT:
      return Object.assign({}, state, {
        [action.payload.tileCoords]: HIGHLIGHTED
      });
    case EMPTY:
      return Object.assign({}, state, {
        [action.payload.tileCoords]: null
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
  puzzles
});
export default rootReducer;
