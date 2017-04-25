import { PushNotificationIOS } from 'react-native'
import ActionTypes from '../index'

function scheduleLocalnotification(event) {

    PushNotificationIOS.scheduleLocalNotification({
        fireDate: this.props.event.date,
        alertBody: this.props.event.name,
        userInfo: { id: this.props.event.id }
    })
}

function registerLocalNotification(event) {

    PushNotificationIOS.getScheduledLocalNotifications((notifications) => {
        if(notifications.length == 0) {      

            scheduleLocalnotification(event)                     
        } else {

            const notification = notifications.find(item => item.userInfo.id == this.props.event.id)
            if(notification) {

                PushNotificationIOS.cancelLocalNotifications(notification.userInfo)                            
            } else {

                scheduleLocalnotification(event)                            
            }
        }
    })
}


export function registerNotification(event) {

    PushNotificationIOS.checkPermissions((permission) => {
            
        if(!permission.alert && !permission.alert && !permission.badge) {

            PushNotificationIOS.requestPermissions()                         
            .then(() => {

                registerLocalNotification(event)

                return {
                    type: ActionTypes.NOTIFICATION_REGISTER_IOS_SUCCESS,
                    event
                }
            })
        } else {                

            registerLocalNotification(event)
            return {
                type: ActionTypes.NOTIFICATION_REGISTER_IOS_SUCCESS,
                event
            }
        }
    })

}