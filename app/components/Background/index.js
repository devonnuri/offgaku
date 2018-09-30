import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Background.scss';

class Background extends Component {
  state = {
    className: 'background',
    style: null
  };

  componentDidMount() {
    this.changeBackground();
  }

  component() {
    this.changeBackground();
  }

  changeBackground = () => {
    console.log('CHANGE!!');

    const { playlist, currentSong } = this.props;

    if (playlist[currentSong]) {
      const { picture } = playlist[currentSong];

      if (picture) {
        this.setState({
          style: {
            backgroundImage: `url(data:${
              picture[0].format
            };base64,${picture[0].data.toString('base64')})`
          },
          className: 'background picture'
        });
      } else {
        this.setState({ style: null, className: 'background gradient' });
      }
    }
  };

  render() {
    const { className, style } = this.state;
    return <div className={className} style={style} />;
  }
}

export default connect(
  ({ playlist: { playlist, currentSong } }) => ({
    playlist,
    currentSong
  }),
  () => {}
)(Background);
