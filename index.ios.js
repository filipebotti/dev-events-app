import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import events from './app/reducers/events'
import notification from './app/reducers/notification'
import App from './app/app'

let store = createStore(combineReducers({ events, notification }))


export default class DevEventsMobile extends Component {
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('DevEventsMobile', () => DevEventsMobile);
