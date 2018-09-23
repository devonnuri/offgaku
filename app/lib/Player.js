// @flow
declare function Audio(src?: string): HTMLAudioElement;

class Player {
  audio: HTMLAudioElement;

  threshold: number;

  durationThresholdReached: boolean;

  constructor(options: any) {
    const mergedOptions: {
      playbackRate: number,
      volume: number,
      muted: boolean
    } = {
      playbackRate: 1,
      volume: 1,
      muted: false,
      ...options
    };

    this.audio = new Audio();

    this.audio.defaultPlaybackRate = mergedOptions.playbackRate;
    this.audio.playbackRate = mergedOptions.playbackRate;
    this.audio.volume = mergedOptions.volume;
    this.audio.muted = mergedOptions.muted;

    this.threshold = 0.75;
    this.durationThresholdReached = false;
  }

  async play(): Promise<any> {
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

  getAudio(): HTMLAudioElement {
    return this.audio;
  }

  getCurrentTime(): number {
    return this.audio.currentTime;
  }

  getDuration(): number {
    return this.audio.duration;
  }

  getVolume(): number {
    return this.audio.volume;
  }

  getSource(): string {
    return this.audio.src;
  }

  setVolume(volume: number) {
    this.audio.volume = volume;
  }

  setPlaybackRate(playbackRate: number) {
    this.audio.playbackRate = playbackRate;
    this.audio.defaultPlaybackRate = playbackRate;
  }

  setSource(src: string) {
    // When we change song, need to update the thresholdReached indicator.
    this.durationThresholdReached = false;
    this.audio.src = src;
  }

  setCurrentTime(currentTime: number) {
    this.audio.currentTime = currentTime;
  }

  isMuted(): boolean {
    return this.audio.muted;
  }

  isPaused(): boolean {
    return this.audio.paused;
  }

  isThresholdReached(): boolean {
    if (
      !this.durationThresholdReached &&
      this.audio.currentTime >= this.audio.duration * this.threshold
    ) {
      this.durationThresholdReached = true;
    }

    return this.durationThresholdReached;
  }

  ended(callback: () => void) {
    this.audio.onended = callback;
  }
}

export default Player;
