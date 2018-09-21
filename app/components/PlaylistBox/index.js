// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { remote } from 'electron';

import checksum from '../../lib/Checksum';
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
    filepath: string,
    hash: string
  }) => void,
  setCurrentSong: (payload: { id: number }) => void
};

class PlaylistBox extends Component<Props> {
  componentDidMount() {
    const { player, playlist, currentSong, setCurrentSong } = this.props;

    player.ended(() => {
      if (playlist.length > currentSong + 1) {
        setCurrentSong({ id: currentSong + 1 });
      }
    });
  }

  onAddClick = () => {
    const { addPlaylist } = this.props;

    const files = remote.dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections']
    });

    files.forEach(filepath => {
      console.log(checksum(filepath));
      addPlaylist({
        title: 'asdf',
        artist: 'asdf',
        duration: 123,
        filepath,
        hash: checksum(filepath)
      });
    });
  };

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
            <tr className="add-song" onClick={this.onAddClick}>
              <td colSpan={4}>
                <i className="fas fa-plus" /> Add Song
              </td>
            </tr>
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
