// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, type Dispatch } from 'redux';
import { remote } from 'electron';
import { basename } from 'path';
import * as mm from 'music-metadata';

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

  onItemClick = id => {
    const { setCurrentSong } = this.props;

    setCurrentSong({ id });
  };

  onAddClick = () => {
    const { addPlaylist } = this.props;

    remote.dialog.showOpenDialog(
      {
        properties: ['openFile', 'multiSelections']
      },
      files => {
        if (files) {
          files.forEach(filepath => {
            Promise.all([checksum(filepath), mm.parseFile(filepath)])
              .then(([hash, metadata]) =>
                addPlaylist({
                  title: basename(filepath),
                  artist: '',
                  duration: metadata.format.duration,
                  filepath,
                  hash,
                  picture: metadata.common.picture
                })
              )
              .catch(error => {
                throw error;
              });
          });
        }
      }
    );
  };

  render() {
    const { playlist } = this.props;

    return (
      <div className="playlist-box">
        <table>
          <tbody>
            {playlist.map((e, index) => (
              <tr
                key={index}
                onClick={() => {
                  this.onItemClick(index);
                }}
              >
                <td>{index + 1}</td>
                <td>{e.title}</td>
                <td>{e.artist}</td>
                <td>
                  {String(Math.floor(e.duration / 60)).padStart(2, '0')}:
                  {String(Math.floor(e.duration % 60)).padStart(2, '0')}
                </td>
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
  (dispatch: Dispatch) => bindActionCreators(playlistActions, dispatch)
)(PlaylistBox);
