<<<<<<< HEAD
import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const ADD_PLAYLIST = 'playlist/ADD';
const REMOVE_PLAYLIST = 'playlist/REMOVE';
const SET_CURRENT_SONG = 'playlist/SET_CURRENT_SONG';
=======
import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import * as mm from "music-metadata";

const ADD_PLAYLIST = "playlist/ADD";
const REMOVE_PLAYLIST = "playlist/REMOVE";
const SET_CURRENT_SONG = "playlist/SET_CURRENT_SONG";
>>>>>>> Copy previous code

export const addPlaylist = createAction(ADD_PLAYLIST, playlist => playlist);
export const removePlaylist = createAction(REMOVE_PLAYLIST, id => id);
export const setCurrentSong = createAction(SET_CURRENT_SONG, id => id);

const initialState = {
  playlist: [],
<<<<<<< HEAD
  currentSong: 0,
=======
  currentSong: 0
>>>>>>> Copy previous code
};

export default handleActions(
  {
<<<<<<< HEAD
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
=======
    [ADD_PLAYLIST]: (
      state,
      { payload: { title, artist, duration, filepath } }
    ) =>
      produce(state, draft => {
        mm.parseFile(filepath, { native: true }).then(metadata => {
          console.log(
            require("util").inspect(metadata, {
              showHidden: false,
              depth: null
            })
          );
        });

        draft.playlist.push({
          title,
          artist,
          duration,
          filepath
        });
      }),
    [REMOVE_PLAYLIST]: (state, { payload: { id } }) =>
      produce(state, draft => {
        draft.playlist = draft.playlist.filter(e => e.id !== id);
      }),
    [SET_CURRENT_SONG]: (state, { payload: { id } }) =>
      produce(state, draft => {
        draft.currentSong = id;
      })
  },
  initialState
>>>>>>> Copy previous code
);
