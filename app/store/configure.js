import { createStore } from 'redux';
import modules from './modules';

const configure = () => {
  const store = createStore(
    modules,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
};

export default configure;
