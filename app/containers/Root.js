// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import type { Store } from 'redux';
import Routes from '../Routes';

type Props = {
  store: Store<any, any, any>
};

export default class Root extends Component<Props> {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}
