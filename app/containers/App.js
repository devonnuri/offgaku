// @flow
import React, { Component } from 'react';

import TopBar from '../components/TopBar';
import LyricsBox from '../components/LyricsBox';
import BottomBar from '../components/BottomBar';
import PlaylistBox from '../components/PlaylistBox';

type Props = {};

export default class HomePage extends Component<Props> {
  props: Props;

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
