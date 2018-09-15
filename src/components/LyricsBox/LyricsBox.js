import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLyrics } from '../../lib/Lyrics';

import './LyricsBox.scss';

class LyricsBox extends Component {
  state = { lyrics: {}, currentLine: 0 };

  componentDidMount() {
    getLyrics({
      artist: 'ZAQ',
      title: 'Sparkling Daydream',
    }).then((lyrics) => {
      this.setState({ ...this.state, lyrics });

      this.interval = setInterval(() => this.updateLyrics(), 100);
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateLyrics = () => {
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
}

export default connect(
  ({ player }) => ({ player: player.player }),
  () => ({}),
)(LyricsBox);
