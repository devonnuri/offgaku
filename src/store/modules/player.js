import { createAction } from 'redux-actions';
import handleActions from 'redux-actions/lib/handleActions';
import produce from 'immer';
import Player from '../../lib/Player';

const PLAY = 'player/PLAY';
const PAUSE = 'player/PAUSE';
const STOP = 'player/STOP';
const MUTE = 'player/MUTE';
const UNMUTE = 'player/UNMUTE';
const GET_AUDIO = 'player/GET_AUDIO';
const GET_CURRENT_TIME = 'player/GET_CURRENT_TIME';
const GET_VOLUME = 'player/GET_VOLUME';
const GET_SOURCE = 'player/GET_SOURCE';
const SET_VOLUME = 'player/SET_VOLUME';
const SET_PLAYBACK_RATE = 'player/SET_PLAYBACK_RATE';
const SET_SOURCE = 'player/SET_SOURCE';
const SET_CURRENT_TIME = 'player/SET_CURRENT_TIME';
const IS_MUTED = 'player/IS_MUTED';
const IS_PAUSED = 'player/IS_PAUSED';
const IS_THRESHOLD_REACHED = 'player/IS_THRESHOLD_REACHED';

export const play = createAction(PLAY);
export const pause = createAction(PAUSE);
export const stop = createAction(STOP);
export const mute = createAction(MUTE);
export const unmute = createAction(UNMUTE);
export const getAudio = createAction(GET_AUDIO);
export const getCurrentTime = createAction(GET_CURRENT_TIME);
export const getVolume = createAction(GET_VOLUME);
export const getSource = createAction(GET_SOURCE);
export const setVolume = createAction(SET_VOLUME, volume => volume);
export const setPlaybackRate = createAction(SET_PLAYBACK_RATE, playbackRate => playbackRate);
export const setSource = createAction(SET_SOURCE, filepath => filepath);
export const setCurrentTime = createAction(SET_CURRENT_TIME, currentTime => currentTime);
export const isMuted = createAction(IS_MUTED);
export const isPaused = createAction(IS_PAUSED);
export const isThresholdReached = createAction(IS_THRESHOLD_REACHED);

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
    [GET_AUDIO]: state => produce(state, draft => draft.player.getAudio()),
    [GET_CURRENT_TIME]: state => produce(state, draft => draft.player.getCurrentTime()),
    [GET_VOLUME]: state => produce(state, draft => draft.player.getVolume()),
    [GET_SOURCE]: state => produce(state, draft => draft.player.getSource()),
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
    [IS_MUTED]: state => state.player.isMuted(),
    [IS_PAUSED]: state => state.player.isPaused(),
    [IS_THRESHOLD_REACHED]: state => state.player.isThresholdReached(),
  },
  initialState,
);
