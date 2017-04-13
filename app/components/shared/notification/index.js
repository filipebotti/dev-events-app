import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import IonicIcon from 'react-native-vector-icons/Ionicons'

class Notification extends React.Component {

    render() {
        return (
            <TouchableOpacity>
                <IonicIcon name="ios-notifications-outline" size={20} color="red"/>
            </TouchableOpacity>
        )
    }
}

export default Notification