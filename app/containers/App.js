import React, { Component } from 'react';

import Background from '../components/Background';
import TopBar from '../components/TopBar';
import LyricsBox from '../components/LyricsBox';
import BottomBar from '../components/BottomBar';
import PlaylistBox from '../components/PlaylistBox';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Background />
        <TopBar />
        <PlaylistBox />
        <LyricsBox />
        <BottomBar />
      </div>
    );
  }
}

export default App;
