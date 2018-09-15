import handleActions from 'redux-actions/lib/handleActions';
import Player from '../../lib/Player';

const initialState = {
  player: new Player(),
};

export default handleActions({}, initialState);
