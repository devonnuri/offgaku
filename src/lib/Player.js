class Player {
  constructor(options) {
    const mergedOptions = {
      playbackRate: 1,
      volume: 1,
      muted: false,
      ...options,
    };

    this.audio = new Audio();

    this.audio.defaultPlaybackRate = mergedOptions.playbackRate;
    this.audio.playbackRate = mergedOptions.playbackRate;
    this.audio.volume = mergedOptions.volume;
    this.audio.muted = mergedOptions.muted;

    this.threshold = 0.75;
    this.durationThresholdReached = false;
  }

  async play() {
    await this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  stop() {
    this.audio.pause();
  }

  mute() {
    this.audio.muted = true;
  }

  unmute() {
    this.audio.muted = false;
  }

  getAudio() {
    return this.audio;
  }

  getCurrentTime() {
    return this.audio.currentTime;
  }

  getDuration() {
    return this.audio.duration;
  }

  getVolume() {
    return this.audio.volume;
  }

  getSource() {
    return this.audio.src;
  }

  setVolume(volume) {
    this.audio.volume = volume;
  }

  setPlaybackRate(playbackRate) {
    this.audio.playbackRate = playbackRate;
    this.audio.defaultPlaybackRate = playbackRate;
  }

  setSource(src) {
    // When we change song, need to update the thresholdReached indicator.
    this.durationThresholdReached = false;
    this.audio.src = src;
  }

  setCurrentTime(currentTime) {
    this.audio.currentTime = currentTime;
  }

  isMuted() {
    return this.audio.muted;
  }

  isPaused() {
    return this.audio.paused;
  }

  isThresholdReached() {
    if (
      !this.durationThresholdReached
      && this.audio.currentTime >= this.audio.duration * this.threshold
    ) {
      this.durationThresholdReached = true;
    }

    return this.durationThresholdReached;
  }
}

export default Player;
