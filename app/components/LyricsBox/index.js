import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, type Dispatch } from 'redux';
import DOMPurify from 'dompurify';

import { getInfo } from '../../lib/SongInfo';
import * as playlistActions from '../../store/modules/playlist';

import './LyricsBox.scss';

class LyricsBox extends Component {
  state = { lyrics: [], currentLine: -1, prevSong: -1 };

  componentDidMount() {
    this.interval = setInterval(() => this.updateLyrics(), 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchInfo = ({ artist, title, hash }) => {
    getInfo({ artist, title, hash })
      .then(({ lyrics }) => this.setState({ ...this.state, lyrics }))
      .catch(error => {
        console.error(error);
      });
  };

  updateLyrics = () => {
    const { playlist, currentSong, player } = this.props;
    const { lyrics, prevSong } = this.state;

    const song = playlist[currentSong];
    if (currentSong !== prevSong && song) {
      this.fetchInfo(song);
      this.setState({ ...this.state, prevSong: currentSong });
    }

    const currentTime = player.getCurrentTime();

    for (let i = lyrics.length; i >= 0; i -= 1) {
      if (lyrics[i] && lyrics[i][0]) {
        if (lyrics[i][0].time <= currentTime * 100) {
          this.setState({ ...this.state, currentLine: i });
          break;
        }
      }
    }
  };

  render() {
    const { lyrics, currentLine } = this.state;

    if (lyrics.length > 0) {
      if (currentLine > -1) {
        return (
          <div className="lyrics-box">
            {lyrics[currentLine]
              ? lyrics[currentLine].map((line, index) => {
                  if (line) {
                    return (
                      <div
                        className="lyrics"
                        key={`${line.time}:${index}`}
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(line.str)
                        }}
                      />
                    );
                  }
                  return '';
                })
              : '싱크 가사 로딩중...'}
          </div>
        );
      }
      return <div className="lyrics-box" />;
    }

    return '';
  }
}

export default connect(
  ({ player, playlist: { playlist, currentSong } }) => ({
    player: player.player,
    playlist,
    currentSong
  }),
  (dispatch: Dispatch<any>) => bindActionCreators(playlistActions, dispatch)
)(LyricsBox);
