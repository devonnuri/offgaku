import React, { Component } from 'react';
import { parseXML } from '../../lib/XMLParser';
import { getLyrics } from '../../lib/Lyrics';

import './LyricsBox.scss';

class LyricsBox extends Component {
  state = { lyrics: '' };

  componentDidMount() {
    getLyrics({
      artist: 'ZAQ',
      title: 'Sparkling Daydream',
    }).then((response) => {
      this.setState({ lyrics: response.data });
      const data = parseXML(response.data);
      console.log(data);
    });
  }

  render() {
    const { lyrics } = this.state;

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
      </div>
    );
  }
}

export default LyricsBox;
