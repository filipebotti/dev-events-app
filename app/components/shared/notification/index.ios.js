import React from 'react'
import { View, StyleSheet, TouchableOpacity, PushNotificationIOS, Alert } from 'react-native'
import IonicIcon from 'react-native-vector-icons/Ionicons'


class Notification extends React.Component {

    constructor(props, context) {
        super(props, context)       

        this.state = {
            registered: false
        }        

        this._onPress = this._onPress.bind(this)
        this._renderIcon = this._renderIcon.bind(this)
        PushNotificationIOS.cancelAllLocalNotifications()
    }

    _onPress() {
        PushNotificationIOS.checkPermissions((permission) => {
            
            if(!permission.alert && !permission.alert && !permission.badge) {

                PushNotificationIOS.requestPermissions()                         
            } else {
                console.log(this.props.event)
                PushNotificationIOS.getScheduledLocalNotifications((notifications) => {
                    if(notifications.length == 0) {
                        
                        PushNotificationIOS.scheduleLocalNotification({
                            fireDate: this.props.event.date,
                            alertBody: this.props.event.name,
                            userInfo: { id: this.props.event.id }
                        })
                        this.setState({ registered: true })
                    } else {

                        const notification = notifications.find(item => item.userInfo.id == this.props.event.id)
                        if(notification) {
                            PushNotificationIOS.cancelLocalNotifications(notification.userInfo)
                            this.setState({ registered: false })
                        } else {
                            PushNotificationIOS.scheduleLocalNotification({
                                fireDate: this.props.event.date,
                                alertBody: this.props.event.name,
                                userInfo: { id: this.props.event.id }
                            })
                            this.setState({ registered: true })
                        }

                    }
                })
            }
        })
    }

    _renderIcon() {
        if(this.state.registered) 
            return <IonicIcon name="ios-notifications" size={20} color="red"/>
        else
            return  <IonicIcon name="ios-notifications-outline" size={20} color="red"/>
    }

    render() {
        return (
            <TouchableOpacity onPress={this._onPress}>
                {this._renderIcon()}
            </TouchableOpacity>
        )
    }
}

export default Notification