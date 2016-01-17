import React from 'react';

export default class PuzzleSelector extends React.Component {
  render() {
    const { currentPuzzle, handlePuzzleChange } = this.props;

    const puzzleNames = [];
    for (let i = 1; i <= 10; i++) {
      puzzleNames.push(i);
    }

    return (
      <div>
        <select
          value={currentPuzzle}
          onChange={handlePuzzleChange}
        >
          {puzzleNames.map((name) => <option value={name}>{name}</option>)}
        </select>
      </div>
    );
  }
}

PuzzleSelector.propTypes = {
  currentPuzzle: React.PropTypes.number,
  handlePuzzleChange: React.PropTypes.func
};
