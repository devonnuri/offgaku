import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as playlistActions from '../../store/modules/playlist';

import './PlaylistBox.scss';

class PlaylistBox extends Component {
  componentDidMount() {
    this.props.player.ended(() => {
      if (this.props.playlist.length > this.props.currentSong + 1) {
        this.props.setCurrentSong({ id: this.props.currentSong + 1 });
      }
    });

    this.props.addPlaylist({
      title: 'Snow Halation',
      artist: 'μ’s',
      duration: '4:19',
      filepath: '/audio/01. Snow halation.flac',
    });
    this.props.addPlaylist({
      title: 'Sparkling Daydream',
      artist: 'ZAQ',
      duration: '3:10',
      filepath: '/audio/ZAQ - Sparkling Daydream.mp3',
    });
  }

  render() {
    return (
      <div className="playlist-box">
        <table>
          <tbody>
            {this.props.playlist.map((e, index) => (
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
    currentSong,
  }),
  dispatch => bindActionCreators(playlistActions, dispatch),
)(PlaylistBox);
