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
      console.log(lyrics);
      this.setState({ lyrics, startTime: new Date().getTime() });

      this.interval = setInterval(() => this.forceUpdate(), 100);
    });
  }

  render() {
    const { lyrics, startTime } = this.state;

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
          ? lyrics[0].map((line, index) => (
            <div className="lyrics" key={`${line.time}:${index}`}>
              {line.str}
            </div>
          ))
          : '싱크 가사 로딩중...'}
      </div>
    );
  }
}

export default LyricsBox;
