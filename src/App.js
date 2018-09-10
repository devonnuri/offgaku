import React, { Component } from "react";
import TopBar from "./components/TopBar/TopBar";
import LyricsBox from "./components/LyricsBox/LyricsBox";
import BottomBar from "./components/BottomBar/BottomBar";
import PlaylistBox from "./components/PlaylistBox/PlaylistBox";

import "./styles/main.scss";

class App extends Component {
  render() {
    return (
      <div className="container">
        <TopBar />
        <PlaylistBox />
        <LyricsBox />
        <BottomBar />
      </div>
    );
  }
}

export default App;
