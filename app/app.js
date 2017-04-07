import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import UpcomingPage from './components/upcoming/index'

export default class App extends React.Component {

    render() {
        return (
            <View style={{flex:1}}>
                <UpcomingPage/>
            </View>
        )
    }
}