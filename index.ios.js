import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import reduxLogger from 'redux-logger'
//reducers
import events from './app/reducers/events'
//saga watchers
import eventsSaga from './app/watchers/events'
import App from './app/app'


const sagaMiddleware = createSagaMiddleware()
const store = createStore(combineReducers({ events }), 
                          applyMiddleware(sagaMiddleware), 
                          applyMiddleware(reduxLogger))

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
