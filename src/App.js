import React from 'react';
import TopBar from './components/TopBar/TopBar';
import LyricsBox from './components/LyricsBox/LyricsBox';
import BottomBar from './components/BottomBar/BottomBar';
import PlaylistBox from './components/PlaylistBox/PlaylistBox';

import './styles/main.scss';

const App = () => (
  <div className="container">
    <div className="background" />
    <TopBar />
    <PlaylistBox />
    <LyricsBox />
    <BottomBar />
  </div>
);

export default App;
