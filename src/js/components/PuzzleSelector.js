import React from 'react';
import Radium from 'radium';

class PuzzleSelector extends React.Component {
  render() {
    const puzzleStyle = {
      color: this.props.appColor,
      border: `1px solid ${this.props.appColor}`,
      ":hover": {
        color: "white",
        backgroundColor: this.props.appColor
      }
    };

    const puzzles = [];
    for (let i = 1; i <= 10; i++) {
      puzzles.push(
        <div
          key={i}
          style={puzzleStyle}
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

export default Radium(PuzzleSelector);
