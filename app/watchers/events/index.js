import { call, put, takeLatest } from 'redux-saga/effects'
import LocalStorage from '../../services/localStorage'
import ActionTypes from '../../actions'
import NotificationService from '../../services/notification'

function* fetchCards(action) {    
    try {
        const events = yield call(LocalStorage.getCards);
        yield put({ type: ActionTypes.FETCH_EVENTS_SUCCESS, events: events })
    } catch(e) {
        yield put({ type: ActionTypes.FETCH_EVENTS_FAIL, error: e })
    }
}

function* checkPermission(action) {    
    
    const permissions = yield call (NotificationService.getPermissions)

    if(!permissions.alert && !permissions.alert && !permissions.badge) {

        const requested = yield call(NotificationService.requestPermissions)
        if(requested) {
            NotificationService.scheduleLocalnotification(action.event)
            yield put({ type: ActionTypes.NOTIFICATION_REGISTER_SUCCESS, event: action.event })   
        }
    } else {

        NotificationService.scheduleLocalnotification(action.event)
        yield put({ type: ActionTypes.NOTIFICATION_REGISTER_SUCCESS, event: action.event })          
    }            
}



function* watcher() {
    yield takeLatest(ActionTypes.FETCH_EVENTS_REQUEST, fetchCards)
    yield takeLatest(ActionTypes.NOTIFICATION_CHECK_PERMISSIONS_REQUESTED, checkPermission)
}

export default watcher;