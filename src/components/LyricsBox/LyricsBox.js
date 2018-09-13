import React, { Component } from 'react';
import { getLyrics } from '../../lib/Lyrics';

import './LyricsBox.scss';

class LyricsBox extends Component {
  state = { lyrics: {}, startTime: 0, end: false };

  componentDidMount() {
    getLyrics({
      artist: 'ZAQ',
      title: 'Sparkling Daydream',
    }).then((lyrics) => {
      this.setState({ ...this.state, lyrics, startTime: new Date().getTime() });

      this.interval = setInterval(() => this.updateLyrics(), 100);
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateLyrics = () => {
    const { lyrics, startTime, end } = this.state;

    if (lyrics[0] && !end) {
      if (!lyrics[0][0]) {
        this.setState({ ...this.state, lyrics: lyrics.slice(1) });

        if (this.state.lyrics.length < 1) {
          this.setState({ ...this.state, end: true });
        }
      } else {
        const offset = new Date().getTime() - startTime;
        if (lyrics[0][0].time * 10 < offset) {
          this.setState({ ...this.state, lyrics: lyrics.slice(1) });

          if (this.state.lyrics.length < 1) {
            this.setState({ ...this.state, end: true });
          }
        }
      }
    }
  };

  render() {
    const { lyrics, end } = this.state;

    if (end) {
      return <div className="lyrics-box">끝!</div>;
    }

    return (
      <div className="lyrics-box">
        {/* <div className="lyrics">
          <ruby>
            夢<rt>ゆめ</rt>
          </ruby>
          ならたくさんみた
        </div>
        <div className="lyrics">유메나라 타쿠상 미타</div>
        <div className="lyrics">꿈에서 실컷 봤지만</div> */}
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
