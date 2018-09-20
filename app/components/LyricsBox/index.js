// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLyrics } from '../../lib/Lyrics';
import type PlayerType from '../../lib/Player';

import './LyricsBox.scss';

type Props = {
  player: PlayerType,
  playlist: [],
  currentSong: number
};

type State = {
  lyrics: [],
  currentLine: number,
  prevSong: number
};

class LyricsBox extends Component<Props, State> {
  interval: IntervalID;

  componentDidMount() {
    this.state = { lyrics: [], currentLine: 0, prevSong: -1 };

    this.interval = setInterval(() => this.updateLyrics(), 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchLyrics = ({ artist, title }) => {
    getLyrics({
      artist,
      title
    })
      .then(lyrics => this.setState({ ...this.state, lyrics }))
      .catch(error => {
        console.error(error);
      });
  };

  updateLyrics = () => {
    const { playlist, currentSong, player } = this.props;
    const { lyrics, prevSong } = this.state;

    const song = playlist[currentSong];
    if (currentSong !== prevSong && song) {
      this.fetchLyrics(song);
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
    currentSong
  }),
  () => ({})
)(LyricsBox);
