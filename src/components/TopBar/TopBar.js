import React, { Component } from 'react';
import { connect } from 'react-redux';

import './TopBar.scss';

class TopBar extends Component {
  componentDidMount() {}

  render() {
    const currentSong = this.props.playlist[this.props.currentSong];

    if (currentSong) {
      return (
        <div className="top-bar">
          <div className="title">{currentSong.title}</div>
          <div className="artist">{currentSong.artist}</div>
        </div>
      );
    }
    return '';
  }
}

export default connect(
  ({ playlist: { playlist, currentSong } }) => ({ playlist, currentSong }),
  () => ({}),
)(TopBar);
