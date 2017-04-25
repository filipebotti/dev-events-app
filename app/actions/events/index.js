import ActionTypes from '../../actions'
import LocalStorage from '../../services/localStorage'

async function requestEvents() {
    try {
        
        let events = LocalStorage.getCards();
        
        dispatch({
            type: ActionTypes.FETCH_EVENTS_SUCCESS,
            events: events
        })

    } catch(e) {
        dispatch({
            type: ActionTypes.FETCH_EVENTS_FAIL,
            error: e
        })
    }

}

export function fetchEvents() {

    dispatch({ type: ActionTypes.FETCH_EVENTS_REQUEST })

    requestEvents()
}