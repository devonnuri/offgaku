import React, { Component } from 'react';
import { connect } from 'react-redux';

import './BottomBar.scss';

class BottomBar extends Component {
  state = {
    prevSong: -1,
  };

  componentDidMount() {
    this.props.player.setVolume(0.04);

    this.interval = setInterval(() => this.updateBar(), 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onProgressClick = (e) => {
    const windowWidth = window.innerWidth;
    const cursorX = e.clientX;
    this.props.player.setCurrentTime((cursorX / windowWidth) * this.props.player.getDuration());
  };

  onPrevClick = (e) => {};

  onPlayClick = () => {
    const { player } = this.props;

    if (player.isPaused()) {
      player.play();
    } else {
      player.pause();
    }
  };

  onNextClick = (e) => {};

  updateBar = () => {
    const currentSong = this.props.playlist[this.props.currentSong];
    if (this.props.currentSong !== this.state.prevSong && currentSong) {
      const { player } = this.props;
      player.setSource(currentSong.filepath);
      player.play();
      this.setState({ ...this.state, prevSong: this.props.currentSong });
    }

    this.forceUpdate();
  };

  render() {
    const currentTime = this.props.player.getCurrentTime();
    const duration = this.props.player.getDuration();

    return (
      <div className="bottom-bar">
        <progress value={currentTime / duration} max="1" onClick={this.onProgressClick} />
        <div className="control">
          <button type="button" onClick={this.onPrevClick}>
            Prev
          </button>
          <button type="button" onClick={this.onPlayClick}>
            {this.props.player.isPaused() ? 'Play' : 'Resume'}
          </button>
          <button type="button" onClick={this.onNextClick}>
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ player, playlist: { playlist, currentSong } }) => ({
    player: player.player,
    playlist,
    currentSong,
  }),
  () => ({}),
)(BottomBar);
