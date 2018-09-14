import { createAction } from 'redux-actions';
import handleActions from 'redux-actions/lib/handleActions';
import produce from 'immer';
import Player from '../../lib/Player';

const PLAY = 'player/PLAY';
const PAUSE = 'player/PAUSE';
const STOP = 'player/STOP';
const MUTE = 'player/MUTE';
const UNMUTE = 'player/UNMUTE';
const SET_VOLUME = 'player/SET_VOLUME';
const SET_PLAYBACK_RATE = 'player/SET_PLAYBACK_RATE';
const SET_SOURCE = 'player/SET_SOURCE';
const SET_CURRENT_TIME = 'player/SET_CURRENT_TIME';

export const play = createAction(PLAY);
export const pause = createAction(PAUSE);
export const stop = createAction(STOP);
export const mute = createAction(MUTE);
export const unmute = createAction(UNMUTE);
export const setVolume = createAction(SET_VOLUME, volume => volume);
export const setPlaybackRate = createAction(SET_PLAYBACK_RATE, playbackRate => playbackRate);
export const setSource = createAction(SET_SOURCE, filepath => filepath);
export const setCurrentTime = createAction(SET_CURRENT_TIME, currentTime => currentTime);

const initialState = {
  player: new Player(),
};

export default handleActions(
  {
    [PLAY]: state => produce(state, (draft) => {
      draft.player.play();
    }),
    [PAUSE]: state => produce(state, (draft) => {
      draft.player.pause();
    }),
    [STOP]: state => produce(state, (draft) => {
      draft.player.stop();
    }),
    [MUTE]: state => produce(state, (draft) => {
      draft.player.mute();
    }),
    [UNMUTE]: state => produce(state, (draft) => {
      draft.player.unmute();
    }),
    [SET_VOLUME]: (state, { payload: volume }) => produce(state, (draft) => {
      draft.player.setVolume(volume);
    }),
    [SET_PLAYBACK_RATE]: (state, { payload: playbackRate }) => produce(state, (draft) => {
      draft.player.setPlaybackRate(playbackRate);
    }),
    [SET_SOURCE]: (state, { payload: filepath }) => produce(state, (draft) => {
      draft.player.setSource(filepath);
    }),
    [SET_CURRENT_TIME]: (state, { payload: currentTime }) => produce(state, (draft) => {
      draft.player.setCurrentTime(currentTime);
    }),
  },
  initialState,
);
