import { combineReducers } from 'redux';

import {
  HIGHLIGHT_TILE,
  SELECT_PUZZLE,
  REQUEST_PUZZLE,
  RECEIVE_PUZZLE,
  HIGHLIGHTED
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
    case HIGHLIGHT_TILE:
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
  puzzleData: {},
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
        puzzleData: action.payload.puzzleData
      });
    case HIGHLIGHT_TILE:
      return Object.assign({}, state, {
        tileStates: tileState(state.tileStates, action)
      });
    default:
      return state;
  }
}


function tileState(state = {}, action) {
  switch (action.type) {
    case HIGHLIGHT_TILE:
      return Object.assign({}, state, {
        [action.payload.tileCoords]: HIGHLIGHTED
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
