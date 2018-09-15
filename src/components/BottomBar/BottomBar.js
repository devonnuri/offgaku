import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as playerActions from '../../store/modules/player';

import './BottomBar.scss';

class BottomBar extends Component {
  componentDidMount() {
    const { player } = this.props;

    player.setSource('/audio/ZAQ - Sparkling Daydream.mp3');
    player.setVolume(0.04);
    player.play();

    this.interval = setInterval(() => this.forceUpdate(), 100);
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

  render() {
    const currentTime = this.props.player.getCurrentTime();
    const duration = this.props.player.getDuration();

    return (
      <div className="bottom-bar">
        <div className="progress-bar" onClick={this.onProgressClick}>
          <span className="progress-fill" style={{ width: `${(currentTime / duration) * 100}%` }} />
        </div>
        <div className="control">
          <button type="button" onClick={this.onPrevClick}>
            Prev
          </button>
          <button type="button" onClick={this.onPlayClick}>
            Play
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
  ({ player }) => ({ player: player.player }),
  () => ({}),
)(BottomBar);
