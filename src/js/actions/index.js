import { HIGHLIGHT_TILE } from '../constants';

export function highlightTile(tileCoords) {
  return {
    type: HIGHLIGHT_TILE,
    payload: {
      tileCoords
    }
  };
}
