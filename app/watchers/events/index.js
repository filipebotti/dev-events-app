import { call, put, takeLatest } from 'redux-saga/effects'
import LocalStorage from '../../services/localStorage'
import ActionTypes from '../../actions'

function* fetchCards(action) {    
    try {
        const events = yield call(LocalStorage.getCards);
        yield put({ type: ActionTypes.FETCH_EVENTS_SUCCESS, events: events })
    } catch(e) {
        yield put({ type: ActionTypes.FETCH_EVENTS_FAIL, error: e })
    }
}

function* watcher() {
    yield takeLatest(ActionTypes.FETCH_EVENTS_REQUEST, fetchCards)
}

export default watcher;