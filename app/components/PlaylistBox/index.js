// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as playlistActions from '../../store/modules/playlist';
import type PlayerType from '../../lib/Player';

import './PlaylistBox.scss';

type Props = {
  player: PlayerType,
  playlist: [],
  currentSong: number,
  addPlaylist: (payload: {
    title: string,
    artist: string,
    duration: number,
    filepath: string
  }) => void,
  setCurrentSong: (payload: { id: number }) => void
};

class PlaylistBox extends Component<Props> {
  componentDidMount() {
    const {
      player,
      playlist,
      currentSong,
      addPlaylist,
      setCurrentSong
    } = this.props;

    player.ended(() => {
      if (playlist.length > currentSong + 1) {
        setCurrentSong({ id: currentSong + 1 });
      }
    });

    addPlaylist({
      title: 'Snow Halation',
      artist: 'μ’s',
      duration: 259,
      filepath: '/audio/01. Snow halation.flac'
    });
    addPlaylist({
      title: 'Sparkling Daydream',
      artist: 'ZAQ',
      duration: 100,
      filepath: '/audio/ZAQ - Sparkling Daydream.mp3'
    });
  }

  render() {
    const { playlist } = this.props;

    return (
      <div className="playlist-box">
        <table>
          <tbody>
            {playlist.map((e, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{e.title}</td>
                <td>{e.artist}</td>
                <td>{e.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  ({ player, playlist: { playlist, currentSong } }) => ({
    player: player.player,
    playlist,
    currentSong
  }),
  (dispatch: any) => bindActionCreators(playlistActions, dispatch)
)(PlaylistBox);
