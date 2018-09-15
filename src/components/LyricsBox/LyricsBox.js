import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLyrics } from '../../lib/Lyrics';

import './LyricsBox.scss';

class LyricsBox extends Component {
  state = { lyrics: {}, currentLine: 0, prevSong: -1 };

  componentDidMount() {
    this.interval = setInterval(() => this.updateLyrics(), 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchLyrics = ({ artist, title }) => {
    getLyrics({
      artist,
      title,
    }).then((lyrics) => {
      this.setState({ ...this.state, lyrics });
    });
  };

  updateLyrics = () => {
    const currentSong = this.props.playlist[this.props.currentSong];
    if (this.props.currentSong !== this.state.prevSong && currentSong) {
      this.fetchLyrics(currentSong);
      this.setState({ ...this.state, prevSong: this.props.currentSong });
    }

    const { lyrics } = this.state;

    const currentTime = this.props.player.getCurrentTime();

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

    if (lyrics) {
      return (
        <div className="lyrics-box">
          {lyrics[currentLine]
            ? lyrics[currentLine].map((line, index) => {
              if (line) {
                return (
                  <div className="lyrics" key={`${line.time}:${index}`}>
                    {line.str}
                  </div>
                );
              }
              return '';
            })
            : '싱크 가사 로딩중...'}
        </div>
      );
    }
    return '';
  }
}

export default connect(
  ({ player, playlist: { playlist, currentSong } }) => ({
    player: player.player,
    playlist,
    currentSong,
  }),
  () => ({}),
)(LyricsBox);
