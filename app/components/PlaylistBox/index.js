import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, type Dispatch } from 'redux';
import { remote } from 'electron';
import { parse } from 'path';
import * as mm from 'music-metadata';

import checksum from '../../lib/Checksum';
import * as playlistActions from '../../store/modules/playlist';

import './PlaylistBox.scss';

class PlaylistBox extends Component {
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
              .then(([hash, metadata]) => {
                const { album, artist, title, picture } = metadata.common;

                return addPlaylist({
                  title: title || parse(filepath).name,
                  artist: artist || '',
                  album: album || '',
                  duration: metadata.format.duration,
                  filepath,
                  hash,
                  picture
                });
              })
              .catch(error => {
                throw error;
              });
          });
        }
      }
    );
  };

  onDeleteClick = (e, id) => {
    const { removePlaylist } = this.props;

    removePlaylist({ id });
  };

  render() {
    const { playlist, currentSong } = this.props;

    return (
      <div className="playlist-box">
        <table>
          <tbody>
            {playlist.map((item, index) => (
              <tr
                key={index}
                onClick={() => {
                  this.onItemClick(index);
                }}
                className={currentSong === index ? 'playing' : null}
              >
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.artist}</td>
                <td>
                  {String(Math.floor(item.duration / 60)).padStart(2, '0')}:
                  {String(Math.floor(item.duration % 60)).padStart(2, '0')}
                </td>
                <td
                  onClick={e => {
                    this.onDeleteClick(e, index);
                  }}
                >
                  <i className="fas fa-times" />
                </td>
              </tr>
            ))}
            <tr className="add-song" onClick={this.onAddClick}>
              <td colSpan={5}>
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
  (dispatch: Dispatch<any>) => bindActionCreators(playlistActions, dispatch)
)(PlaylistBox);
