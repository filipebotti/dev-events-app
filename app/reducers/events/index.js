import initialState from '../initialState'
import ActionTypes from '../../actions'

function registerEvent(events, eventId) {   
    
    
    let event = events.find(item => item.id == eventId)    
    event.registered = true
    return [...events]
}

function unregisterEvent(events, eventId) {

    let event = events.find(item => item.id == eventId)
    event.registered = false
    return [...events]
}

export default function(state, action) {
    switch(action.type) {
        case ActionTypes.FETCH_EVENTS_REQUEST:            
            return Object.assign({}, state, { isFetching: true})
        case ActionTypes.FETCH_EVENTS_SUCCESS:
            return Object.assign({}, state, { isFetching: false, events: action.events})
        case ActionTypes.FETCH_EVENTS_FAIL:
            return Object.assign({}, state, { isFetching: false, error: action.error})
        case ActionTypes.NOTIFICATION_REGISTER_SUCCESS: 
            return Object.assign({}, state, { events: registerEvent(state.events, action.event.id)})
        case ActionTypes.NOTIFICATION_CANCEL_SUCCESS:
            return Object.assign({}, state, { events: unregisterEvent(state.events, action.event.id)})
        default:
            return state || initialState            
    }
}