import ActionTypes from '../../actions'
import LocalStorage from '../../services/localStorage'

export function fetchEvents() {    
    return { 
        type: ActionTypes.FETCH_EVENTS_REQUEST
    }
    
}