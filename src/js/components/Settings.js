import React from 'react';
import Radium from 'radium';
import ColorChangeModal from './ColorChangeModal';

import { COLOR_CHANGE } from '../constants';

class Settings extends React.Component {
  render() {
    let modal;
    if (this.props.modal === COLOR_CHANGE) {
      modal = (
        <ColorChangeModal
          appColor={this.props.appColor}
          handleAppColorChange={this.props.handleAppColorChange}
        />
      );
    }

    const settingStyle = {
      border: `1px solid ${this.props.appColor}`,
      color: this.props.appColor,
      ":hover": {
        color: "white",
        backgroundColor: this.props.appColor
      }
    };

    return (
      <div className="settings">
        <div
          key="night-mode"
          style={settingStyle}
          className="setting setting__night-mode"
          onClick={this.props.handleNightModeClick}
        >
          <i className="fa fa-moon-o"></i>
        </div>
        <div
          key="color-change"
          style={settingStyle}
          className="setting setting__color-change"
          onClick={this.props.handleShowColorModal}
        >
          <i className="fa fa-paint-brush"></i>
        </div>
        {modal}
      </div>
    );
  }
}

Settings.propTypes = {
  handleNightModeClick: React.PropTypes.func
};

export default Radium(Settings);
