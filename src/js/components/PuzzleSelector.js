import React from 'react';

export default class PuzzleSelector extends React.Component {
  render() {
    const { currentPuzzle, handlePuzzleChange } = this.props;

    return (
      <div>
        <select
          value={currentPuzzle}
          onChange={handlePuzzleChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
    );
  }
}

PuzzleSelector.propTypes = {
  currentPuzzle: React.PropTypes.number,
  handlePuzzleChange: React.PropTypes.func
};
