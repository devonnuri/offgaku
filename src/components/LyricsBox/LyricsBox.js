import React, { Component } from "react";

import "./LyricsBox.scss";

class LyricsBox extends Component {
  render() {
    return (
      <div className="lyrics-box">
        <div className="lyrics">
          <ruby>
            夢<rt>ゆめ</rt>
          </ruby>
          ならたくさんみた
        </div>
        <div className="lyrics">유메나라 타쿠상 미타</div>
        <div className="lyrics">꿈에서 실컷 봤지만</div>
      </div>
    );
  }
}

export default LyricsBox;
