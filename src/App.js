import React, { Component } from 'react';
import TopBar from './components/TopBar/TopBar';
import LyricsBox from './components/LyricsBox/LyricsBox';
import BottomBar from './components/BottomBar/BottomBar';
import PlaylistBox from './components/PlaylistBox/PlaylistBox';

import './styles/main.scss';
import Player from './lib/Player';

class App extends Component {
  componentDidMount() {
    const player = new Player();
    player.setAudioSrc('/audio/ZAQ - Sparkling Daydream.mp3');
    player.setAudioVolume(0.07);
    player.play();
  }

  render() {
    return (
      <div className="container">
        <div className="background" />
        <TopBar />
        <PlaylistBox />
        <LyricsBox />
        <BottomBar />
      </div>
    );
  }
}

export default App;
