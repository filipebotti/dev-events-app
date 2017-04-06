/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import App from './app/app'


export default class DevEventsMobile extends Component {
  render() {
    return (
      <App/>
    );
  }
}

AppRegistry.registerComponent('DevEventsMobile', () => DevEventsMobile);
