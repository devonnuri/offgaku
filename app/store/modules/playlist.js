import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const ADD_PLAYLIST = 'playlist/ADD';
const REMOVE_PLAYLIST = 'playlist/REMOVE';
const EDIT_PLAYLIST = 'playlist/EDIT';
const SET_CURRENT_SONG = 'playlist/SET_CURRENT_SONG';

export const addPlaylist = createAction(ADD_PLAYLIST, payload => payload);
export const removePlaylist = createAction(REMOVE_PLAYLIST, payload => payload);
export const editPlaylist = createAction(EDIT_PLAYLIST, payload => payload);
export const setCurrentSong = createAction(
  SET_CURRENT_SONG,
  payload => payload
);

const initialState = {
  playlist: [],
  currentSong: 0
};

export default handleActions(
  {
    [ADD_PLAYLIST]: (
      state,
      { payload: { title, artist, duration, filepath, hash } }
    ) =>
      produce(state, draft => {
        draft.playlist.push({
          title,
          artist,
          duration,
          filepath,
          hash
        });
      }),
    [REMOVE_PLAYLIST]: (state, { payload: { id } }) =>
      produce(state, draft => {
        draft.playlist = draft.playlist.filter((e, index) => index !== id);
      }),
    [EDIT_PLAYLIST]: (state, { payload: { id, title, artist } }) =>
      produce(state, draft => {
        if (title) {
          draft.playlist[id].title = title;
        }
        if (artist) {
          draft.playlist[id].artist = artist;
        }
      }),
    [SET_CURRENT_SONG]: (state, { payload: { id } }) =>
      produce(state, draft => {
        draft.currentSong = id;
      })
  },
  initialState
);
