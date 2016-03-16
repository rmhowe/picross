import { combineReducers } from 'redux';
import Immutable from 'immutable';

import {
  SELECT_PUZZLE,
  REQUEST_PUZZLE,
  RECEIVE_PUZZLE,
  SELECT_TOOL,
  SET_MODAL,
  MODIFY_TILE,
  REQUEST_TILE_STATES,
  RECEIVE_TILE_STATES,
  SET_WIN_STATE,
  SET_NIGHT_MODE,
  SET_APP_COLOR,
  HIGHLIGHTED,
  BLOCKED,
  EMPTY,
  HIGHLIGHT,
  BLOCK
} from '../constants';

function currentPuzzle(state = null, action) {
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

// Not sure if this should be in state at this level
function modal(state = null, action) {
  switch (action.type) {
    case SET_MODAL:
      return action.payload.modal;
    default:
      return state;
  }
}

function puzzles(state = Immutable.Map(), action) {
  switch (action.type) {
    case REQUEST_PUZZLE:
    case RECEIVE_PUZZLE:
    case MODIFY_TILE:
    case RECEIVE_TILE_STATES:
    case SET_WIN_STATE:
      const id = action.payload.puzzleId;
      return state.set(id, puzzle(state.get(id), action));
    default:
      return state;
  }
}

function puzzle(state = Immutable.fromJS({
  isFetching: false,
  rows: [],
  columns: [],
  solution: [],
  tileStates: {},
  won: false
}), action) {
  switch (action.type) {
    case REQUEST_PUZZLE:
      return state.set('isFetching', true);
    case RECEIVE_PUZZLE:
      return state.merge({
        isFetching: false,
        rows: Immutable.fromJS(action.payload.rows),
        columns: Immutable.fromJS(action.payload.columns),
        solution: Immutable.fromJS(action.payload.solution)
      });
    case MODIFY_TILE:
      return state.set('tileStates', tileState(state.get('tileStates'), action));
    case RECEIVE_TILE_STATES:
      return state.set('tileStates', Immutable.fromJS(action.payload.tileStates));
    case SET_WIN_STATE:
      return state.set('won', action.payload.winState);
    default:
      return state;
  }
}

function tileState(state = Immutable.Map(), action) {
  switch (action.payload.modification) {
    case EMPTY:
      return state.set(action.payload.tileCoords, null);
    case HIGHLIGHT:
      return state.set(action.payload.tileCoords, HIGHLIGHTED);
    case BLOCK:
      return state.set(action.payload.tileCoords, BLOCKED);
    default:
      return state;
  }
}

function settings(state = Immutable.Map({
  nightMode: false,
  appColor: '#3B9DFF'
}), action) {
  switch (action.type) {
    case SET_NIGHT_MODE:
      return state.set('nightMode', action.payload.nightMode);
    case SET_APP_COLOR:
      return state.set('appColor', action.payload.color);
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  currentPuzzle,
  currentTool,
  modal,
  puzzles,
  settings
});
export default rootReducer;
