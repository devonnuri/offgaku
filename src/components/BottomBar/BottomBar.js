import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as playerActions from '../../store/modules/player';

import './BottomBar.scss';

class BottomBar extends Component {
  componentDidMount() {
    const { setSource, setVolume, play } = this.props;

    setSource('/audio/ZAQ - Sparkling Daydream.mp3');
    setVolume(0.07);
    play();
  }

  render() {
    return (
      <div className="bottom-bar">
        <span className="progress" />
      </div>
    );
  }
}

export default connect(
  () => ({}),
  dispatch => bindActionCreators(playerActions, dispatch),
)(BottomBar);
