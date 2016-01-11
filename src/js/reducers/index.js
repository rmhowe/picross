import { combineReducers } from 'redux';
import Immutable from 'immutable';

import { HIGHLIGHT_TILE } from '../constants';

function puzzle(state = null, action) {
  switch (action.type) {
    default:
      return state;
  }
}

function tileStates(state = new Immutable.Map(), action) {
  switch (action.type) {
    case HIGHLIGHT_TILE:
      return state.set(action.payload.tileCoords, 'HIGHLIGHTED');
    default:
      return state;
  }
}

const picrossApp = combineReducers({
  puzzle,
  tileStates
});
export default picrossApp;
