import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const ADD_PLAYLIST = 'playlist/ADD';
const REMOVE_PLAYLIST = 'playlist/REMOVE';
const SET_CURRENT_SONG = 'playlist/SET_CURRENT_SONG';

export const addPlaylist = createAction(ADD_PLAYLIST, playlist => playlist);
export const removePlaylist = createAction(REMOVE_PLAYLIST, id => id);
export const setCurrentSong = createAction(SET_CURRENT_SONG, id => id);

const initialState = {
  playlist: [],
  currentSong: 0,
};

export default handleActions(
  {
    [ADD_PLAYLIST]: (state, {
      payload: {
        title, artist, duration, filepath,
      },
    }) => produce(state, (draft) => {
      draft.playlist.push({
        title,
        artist,
        duration,
        filepath,
      });
    }),
    [REMOVE_PLAYLIST]: (state, { payload: { id } }) => produce(state, (draft) => {
      draft.playlist = draft.playlist.filter(e => e.id !== id);
    }),
    [SET_CURRENT_SONG]: (state, { payload: { id } }) => produce(state, (draft) => {
      draft.currentSong = id;
    }),
  },
  initialState,
);
