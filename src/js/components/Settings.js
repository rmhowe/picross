import React from 'react';

export default class Settings extends React.Component {
  render() {
    return (
      <div className="settings">
        <div
          className="setting night-mode"
          onClick={this.props.handleNightModeClick}
        >
          <i className="fa fa-moon-o"></i>
        </div>
        <div className="setting color-change">

        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  handleNightModeClick: React.PropTypes.func
};
