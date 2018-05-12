/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './reducers/AppReducer';
import StroopApp from './actions/AppAction';

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <StroopApp />
      </Provider>
    );
  }
}
