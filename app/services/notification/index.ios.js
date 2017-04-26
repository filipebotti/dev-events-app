import { PushNotificationIOS } from 'react-native'
import moment from '../../libs/moment'

export function scheduleLocalnotification(event) {

    var momentDate = moment(event.date)

    PushNotificationIOS.scheduleLocalNotification({
        fireDate: momentDate.subtract(1, 'days'),
        alertBody: `Don't forget the ${event.name} is tomorrow`,
        userInfo: { id: event.id }
    })

    PushNotificationIOS.scheduleLocalNotification({
        fireDate: momentDate.subtract(1, 'hours'),
        alertBody: `Don't forget the ${event.name} is in an hour`,
        userInfo: { id: event.id }
    })

    PushNotificationIOS.scheduleLocalNotification({
        fireDate: momentDate.subtract(10, 'minutes'),
        alertBody: `10 minutes to start the ${event.name}`,
        userInfo: { id: event.id }
    })
}

export async function getPermissions() {
    return new Promise((resolve, reject) => {
        PushNotificationIOS.checkPermissions((permission) => {
            resolve(permission)
        })
    })
}

export async function requestPermissions() {

    return new Promise((resolve, reject) => {
        PushNotificationIOS.requestPermissions()                         
        .then(() => resolve(true))
    })
    
}

export function cancelNotification(event) {
    PushNotificationIOS.cancelLocalNotifications({ id: event.id })
}

export default {
    scheduleLocalnotification : scheduleLocalnotification,
    getPermissions: getPermissions,
    requestPermissions: requestPermissions,
    cancelNotification: cancelAnimationFrame
}