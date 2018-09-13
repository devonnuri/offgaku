import React, { Component } from 'react';
import { getLyrics } from '../../lib/Lyrics';

import './LyricsBox.scss';

class LyricsBox extends Component {
  state = { lyrics: {}, startTime: 0 };

  componentDidMount() {
    getLyrics({
      artist: 'ZAQ',
      title: 'Sparkling Daydream',
    }).then((lyrics) => {
      this.setState({ ...this.state, lyrics, startTime: new Date().getTime() - 1000 });

      this.interval = setInterval(() => this.updateLyrics(), 100);
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateLyrics = () => {
    const { lyrics, startTime } = this.state;

    // If can load next line, compare between the offset of time and timing of the line
    if (lyrics.length > 1) {
      // Check whether the time will be undefined
      if (lyrics[1][0]) {
        const offset = new Date().getTime() - startTime;

        if (lyrics[1][0].time * 10 < offset) {
          this.setState({ ...this.state, lyrics: lyrics.slice(1) });
        }
      }
    }
  };

  render() {
    const { lyrics } = this.state;

    return (
      <div className="lyrics-box">
        {lyrics[0]
          ? lyrics[0].map((line, index) => {
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

export default LyricsBox;
