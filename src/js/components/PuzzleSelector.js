import React from 'react';

export default class PuzzleSelector extends React.Component {
  render() {
    const puzzles = [];
    for (let i = 1; i <= 10; i++) {
      puzzles.push(
        <div
          className="puzzle-selector__puzzle"
          onClick={this.props.handlePuzzleSelect.bind(this, i)}
        >
          {i}
        </div>
      );
    }

    return (
      <div className="puzzle-selector">
        {puzzles}
      </div>
    );
  }
}

PuzzleSelector.propTypes = {
  puzzles: React.PropTypes.object,
  handlePuzzleSelect: React.PropTypes.func
};
