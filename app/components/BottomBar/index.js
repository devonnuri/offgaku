// @flow

import React, { Component, SyntheticInputEvent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, type Dispatch } from 'redux';
import * as playlistActions from '../../store/modules/playlist';
import type PlayerType from '../../lib/Player';

import './BottomBar.scss';

type Props = {
  player: PlayerType,
  currentSong: number,
  playlist: [],
  setCurrentSong: (payload: { id: number }) => void
};

type State = {
  prevSong: number,
  volume: number
};

class BottomBar extends Component<Props, State> {
  interval: IntervalID;

  state = {
    prevSong: -1,
    volume: 50
  };

  componentDidMount() {
    const { player } = this.props;
    const { volume } = this.state;

    player.setVolume(volume / 100);

    this.interval = setInterval(() => this.updateBar(), 100);
  }

  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval);
  }

  onProgressClick = e => {
    const { player } = this.props;

    player.setCurrentTime(
      (e.clientX / window.innerWidth) * player.getDuration()
    );
  };

  onPrevClick = () => {
    const { setCurrentSong, currentSong } = this.props;

    setCurrentSong({ id: currentSong - 1 });
  };

  onPlayClick = () => {
    const { player } = this.props;

    if (player.isPaused()) {
      player.play();
    } else {
      player.pause();
    }
  };

  onNextClick = () => {
    const { setCurrentSong, currentSong } = this.props;

    setCurrentSong({ id: currentSong + 1 });
  };

  updateBar = () => {
    const { playlist, currentSong, player } = this.props;
    const { prevSong } = this.state;

    const song = playlist[currentSong];
    if (currentSong !== prevSong && song) {
      player.setSource(song.filepath);
      player.play();
      this.setState({ ...this.state, prevSong: currentSong });
    }

    this.forceUpdate();
  };

  onVolumeChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { player } = this.props;
    const { volume } = this.state;

    this.setState({ ...this.state, volume: e.target.value });
    player.setVolume(volume / 100);
  };

  render() {
    const { currentSong, playlist, player } = this.props;
    const { volume } = this.state;

    let progressValue = player.getCurrentTime() / player.getDuration();

    if (!progressValue) {
      progressValue = 0;
    }

    return (
      <div className="bottom-bar">
        <progress
          value={progressValue}
          max="1"
          onClick={this.onProgressClick}
        />
        <div className="volume-slider">
          <input
            type="range"
            min={1}
            max={100}
            value={volume}
            className="slider volume"
            onChange={this.onVolumeChange}
          />
        </div>
        <div className="control">
          <button
            type="button"
            onClick={this.onPrevClick}
            disabled={currentSong - 1 < 0 ? 'disabled' : null}
          >
            Prev
          </button>
          <button type="button" onClick={this.onPlayClick}>
            {player.isPaused() ? 'Play' : 'Resume'}
          </button>
          <button
            type="button"
            onClick={this.onNextClick}
            disabled={currentSong + 1 >= playlist.length ? 'disabled' : null}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ player, playlist: { playlist, currentSong } }: any) => ({
    player: player.player,
    playlist,
    currentSong
  }),
  (dispatch: Dispatch<any>) => bindActionCreators(playlistActions, dispatch)
)(BottomBar);
