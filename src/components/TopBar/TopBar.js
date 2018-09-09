import React, { Component } from "react";

import "./TopBar.scss";

class TopBar extends Component {
  render() {
    return (
      <div className="top-bar">
        <div className="title">Sparkling Daydream</div>
        <div className="artist">ZAQ</div>
      </div>
    );
  }
}

export default TopBar;
