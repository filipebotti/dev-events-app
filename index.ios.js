import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
//reducers
import events from './app/reducers/events'
import notification from './app/reducers/notification'
//saga watchers
import eventsSaga from './app/watchers/events'
import App from './app/app'


const sagaMiddleware = createSagaMiddleware()
const store = createStore(combineReducers({ events, notification }), applyMiddleware(sagaMiddleware))

sagaMiddleware.run(eventsSaga)

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
