import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as playerActions from '../../store/modules/player';

import './BottomBar.scss';

class BottomBar extends Component {
  componentDidMount() {
    const {
      setSource, setVolume, play, player,
    } = this.props;

    setSource('/audio/ZAQ - Sparkling Daydream.mp3');
    setVolume(0.07);
    play();

    console.log(player.getCurrentTime());

    this.interval = setInterval(() => this.forceUpdate(), 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const currentTime = this.props.player.getCurrentTime();
    const duration = this.props.player.getDuration();

    return (
      <div className="bottom-bar">
        <span className="progress" style={{ width: `${(currentTime / duration) * 100}%` }} />
      </div>
    );
  }
}

export default connect(
  ({ player }) => ({ player: player.player }),
  dispatch => bindActionCreators(playerActions, dispatch),
)(BottomBar);
