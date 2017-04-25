import initialState from '../initialState'
import ActionTypes from '../../actions'

function registerEvent(events, eventId) {
    
    let event = events.find(item => item.id == eventId)
    event.registered = true

    return events
}

function unregisterEvent(events, eventId) {

    let event = events.find(item => item.id == eventId)
    event.registered = false

    return events
}

export default function (state = initialState, action) {

    switch(action.type) {
        case ActionTypes.NOTIFICATION_REGISTER_SUCCESS: 
            return Object.assign({}, state, registerEvent(state.events, action.event))
        case ActionTypes.NOTIFICATION_CANCEL_SUCCESS:
            return Object.assign({}, state, unregisterEvent(state.events, action.event))
        default:
            return state

    }
}
