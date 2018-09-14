import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

import TopBar from './components/TopBar/TopBar';
import LyricsBox from './components/LyricsBox/LyricsBox';
import BottomBar from './components/BottomBar/BottomBar';
import PlaylistBox from './components/PlaylistBox/PlaylistBox';

import './styles/main.scss';

const App = () => (
  <Provider store={store}>
    <div className="container">
      <div className="background" />
      <TopBar />
      <PlaylistBox />
      <LyricsBox />
      <BottomBar />
    </div>
  </Provider>
);

export default App;
