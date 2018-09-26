import React, { Component } from 'react';
import { connect } from 'react-redux';

import './TopBar.scss';

class TopBar extends Component {
  componentDidMount() {}

  render() {
    const { playlist, currentSong } = this.props;
    const song = playlist[currentSong];

    if (song) {
      return (
        <div className="top-bar">
          <div className="title">{song.title}</div>
          <div className="artist">{song.artist}</div>
        </div>
      );
    }
    return (
      <div className="top-bar">
        <div className="title">Offgaku</div>
      </div>
    );
  }
}

export default connect(
  ({ playlist: { playlist, currentSong } }) => ({ playlist, currentSong }),
  () => ({})
)(TopBar);
