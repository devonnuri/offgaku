import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as playlistActions from '../../store/modules/playlist';

import './PlaylistBox.scss';

class PlaylistBox extends Component {
  componentDidMount() {
    this.props.addPlaylist({ title: 'Sparkling Daydream', artist: 'ZAQ', duration: '3:10' });
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
  ({ playlist }) => ({ playlist: playlist.playlist }),
  dispatch => bindActionCreators(playlistActions, dispatch),
)(PlaylistBox);
