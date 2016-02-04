import fetch from 'isomorphic-fetch';
import {
  SELECT_PUZZLE,
  REQUEST_PUZZLE,
  RECEIVE_PUZZLE,
  REQUEST_TILE_STATES,
  RECEIVE_TILE_STATES,
  SELECT_TOOL,
  MODIFY_TILE
} from '../constants';

export function selectPuzzle(puzzleId) {
  return {
    type: SELECT_PUZZLE,
    payload: {
      puzzleId
    }
  };
}

export function requestPuzzle(puzzleId) {
  return {
    type: REQUEST_PUZZLE,
    payload: {
      puzzleId
    }
  };
}

export function receivePuzzle(puzzleId, title, rows, columns) {
  return {
    type: RECEIVE_PUZZLE,
    payload: {
      puzzleId,
      title,
      rows,
      columns
    }
  };
}

export function fetchPuzzle(puzzleId) {
  return (dispatch) => {
    dispatch(requestPuzzle(puzzleId));
    return fetch(`/puzzles/${puzzleId}.json`)
      .then((response) => response.json())
      .then((puzzleData) => {
        dispatch(receivePuzzle(puzzleId, puzzleData.title, puzzleData.rows, puzzleData.columns));
      });
  };
}

export function requestTileStates(puzzleId) {
  return {
    type: REQUEST_TILE_STATES,
    payload: {
      puzzleId
    }
  };
}

export function receiveTileStates(puzzleId, tileStates) {
  return {
    type: RECEIVE_TILE_STATES,
    payload: {
      puzzleId,
      tileStates
    }
  };
}

export function fetchTileStates(puzzleId) {
  return (dispatch) => {
    dispatch(requestTileStates(puzzleId));

    let tileStates;
    const savedTiles = window.localStorage.getItem(`puzzle_${puzzleId}_tiles`);
    if (savedTiles) {
      tileStates = JSON.parse(savedTiles);
    } else {
      tileStates = {};
    }

    dispatch(receiveTileStates(puzzleId, tileStates));
  };
}

export function selectTool(tool) {
  return {
    type: SELECT_TOOL,
    payload: {
      tool
    }
  };
}

export function modifyTile(puzzleId, tileCoords, modification) {
  return {
    type: MODIFY_TILE,
    payload: {
      puzzleId,
      tileCoords,
      modification
    }
  };
}

export function saveTileState(puzzleId, tileState) {
  return dispatch => {
    window.localStorage.setItem(`puzzle_${puzzleId}_tiles`, JSON.stringify(tileState));
  };
}
