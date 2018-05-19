/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './redux/configureStore';
import StroopAppContainer from './containers/StroopAppContainer';


export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <StroopAppContainer />
      </Provider>
    );
  }
}
