import { PushNotificationIOS } from 'react-native'
import ActionTypes from '../index'

function scheduleLocalnotification(event) {

    PushNotificationIOS.scheduleLocalNotification({
        fireDate: this.props.event.date,
        alertBody: this.props.event.name,
        userInfo: { id: this.props.event.id }
    })
}

export function registerNotification(event) {

    PushNotificationIOS.checkPermissions((permission) => {
            
        if(!permission.alert && !permission.alert && !permission.badge) {

            PushNotificationIOS.requestPermissions()                         
            .then(() => {

                scheduleLocalnotification(event)

                return {
                    type: ActionTypes.NOTIFICATION_REGISTER_SUCCESS,
                    event
                }
            })
        } else {                

            scheduleLocalnotification(event)
            return {
                type: ActionTypes.NOTIFICATION_REGISTER_SUCCESS,
                event
            }
        }
    })

}

export function cancelNotification(event) {

    PushNotificationIOS.cancelLocalNotifications({ id: event.id })

    return {
        type: ActionTypes.NOTIFICATION_CANCEL_SUCCESS,
        event
    }
}