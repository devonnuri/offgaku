// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import './TopBar.scss';

type Props = {
  playlist: [],
  currentSong: number
};

class TopBar extends Component<Props> {
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
    return '';
  }
}

export default connect(
  ({ playlist: { playlist, currentSong } }) => ({ playlist, currentSong }),
  () => ({})
)(TopBar);
