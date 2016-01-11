import fetch from 'isomorphic-fetch';
import {
  MODIFY_TILE,
  SELECT_PUZZLE,
  REQUEST_PUZZLE,
  RECEIVE_PUZZLE
} from '../constants';

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
