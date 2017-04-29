import ActionTypes from '../../actions'
import LocalStorage from '../../services/localStorage'
import * as NotificationService from '../../services/notification'
import moment from '../../libs/moment'

export function fetchEvents() {    
    return { 
        type: ActionTypes.FETCH_EVENTS_REQUEST
    }
    
}

export function registerNotification(event) {   

    return {
        type: ActionTypes.NOTIFICATION_CHECK_PERMISSIONS_REQUESTED,
        event
    }

}

export function cancelNotification(event) {

    NotificationService.cancelNotification(event)

    return {
        type: ActionTypes.NOTIFICATION_CANCEL_SUCCESS,
        event
    }
}

export function selectEvent(event) {

    return {
        type: ActionTypes.SELECT_EVENT,
        event
    }
}

