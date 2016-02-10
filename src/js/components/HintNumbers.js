import React from 'react';

export default class HintNumbers extends React.Component {
  getRowNumbers(rowNumbers) {
    const rowNumbersSpaced = rowNumbers.reduce((prev, curr) => {
      return `${prev} ${curr}`;
    }, "");
    return <span className="game-board__row-numbers">{rowNumbersSpaced}</span>;
  }

  getColumnNumbers(columnNumbers) {
    const columnNumbersSpaced = columnNumbers.reduce((prev, curr) => {
      return `${prev} ${curr}`;
    }, "");
    return <span className="game-board__column-numbers">{columnNumbersSpaced}</span>;
  }

  render() {
    const { type, numbers } = this.props;

    let numbersFormatted;
    if (type === 'row') {
      numbersFormatted = this.getRowNumbers(numbers);
    } else if (type === 'column') {
      numbersFormatted = this.getColumnNumbers(numbers);
    }

    return numbersFormatted || <span></span>;
  }
}

HintNumbers.propTypes = {
  type: React.PropTypes.string.isRequired,
  numbers: React.PropTypes.array.isRequired
};
