import React from 'react';

export default class PuzzleSelector extends React.Component {
  render() {
    const { currentPuzzle, handlePuzzleChange } = this.props;

    const puzzleNames = [];
    for (let i = 1; i <= 10; i++) {
      puzzleNames.push(i);
    }

    return (
      <select
        className="puzzle-selector"
        value={currentPuzzle}
        onChange={handlePuzzleChange}
      >
        {puzzleNames.map((name, i) => <option key={i} value={name}>{name}</option>)}
      </select>
    );
  }
}

PuzzleSelector.propTypes = {
  currentPuzzle: React.PropTypes.number,
  handlePuzzleChange: React.PropTypes.func
};
