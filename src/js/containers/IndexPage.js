import React from 'react';
import { connect } from 'react-redux';
import {
  selectPuzzle,
  setModal,
  setNightMode,
  setAppColor
} from '../actions';
import { COLOR_CHANGE } from '../constants';
import PuzzleSelector from '../components/PuzzleSelector';
import Settings from '../components/Settings';

import { shadeColor } from '../util';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.handlePuzzleSelect = this.handlePuzzleSelect.bind(this);
    this.handleNightModeClick = this.handleNightModeClick.bind(this);
    this.handleShowColorModal = this.handleShowColorModal.bind(this);
    this.handleHideModal = this.handleHideModal.bind(this);
    this.handleAppColorChange = this.handleAppColorChange.bind(this);
  }

  handlePuzzleSelect(puzzleId) {
    this.props.dispatch(selectPuzzle(puzzleId));
  }

  handleNightModeClick() {
    this.props.dispatch(setNightMode(!this.props.settings.get('nightMode')));
  }

  handleShowColorModal(event) {
    event.stopPropagation();
    this.props.dispatch(setModal(COLOR_CHANGE));
  }

  handleHideModal() {
    this.props.dispatch(setModal(null));
  }

  handleAppColorChange(color) {
    this.props.dispatch(setAppColor(color));
  }

  render() {
    const titleStyle = {
      color: shadeColor(this.props.settings.get('appColor'), -0.05)
    };

    return (
      <div
        className="index-page"
        onClick={this.handleHideModal}
      >
        <h1
          style={titleStyle}
          className="index-page__title"
        >
          picross
        </h1>
        <PuzzleSelector
          appColor={this.props.settings.get('appColor')}
          puzzles={this.props.puzzles}
          handlePuzzleSelect={this.handlePuzzleSelect}
        />
        <Settings
          appColor={this.props.settings.get('appColor')}
          modal={this.props.modal}
          handleNightModeClick={this.handleNightModeClick}
          handleShowColorModal={this.handleShowColorModal}
          handleHideModal={this.handleHideModal}
          handleAppColorChange={this.handleAppColorChange}
        />
      </div>
    );
  }
}

function select(state) {
  return {
    modal: state.modal,
    puzzles: state.puzzles,
    settings: state.settings
  };
}

export default connect(select)(IndexPage);
