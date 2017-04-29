import React from 'react'
import { View, StyleSheet, TouchableOpacity, PushNotificationIOS, Alert } from 'react-native'
import IonicIcon from 'react-native-vector-icons/Ionicons'


class Notification extends React.Component {

    constructor(props, context) {
        super(props, context)       

        this._onPress = this._onPress.bind(this)
        this._renderIcon = this._renderIcon.bind(this)        
    }

    _onPress() {
        this.props.onNotificationPress(this.props.event)
    }

    _renderIcon() {
        const color = this.props.event.isSelected ? 'white' : 'black'
        
        if(this.props.event.registered) 
            return <IonicIcon name="ios-notifications" size={20} color={color}/>
        else
            return  <IonicIcon name="ios-notifications-outline" size={20} color={color}/>
    }

    render() {
        return (
            <TouchableOpacity onPress={this._onPress}>
                {this._renderIcon()}
            </TouchableOpacity>
        )
    }
}

Notification.propTypes = {
    onNotificationPress: React.PropTypes.func.isRequired,
    event: React.PropTypes.object.isRequired
}

export default Notification
