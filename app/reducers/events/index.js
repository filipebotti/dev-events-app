import initialState from '../initialState'
import ActionTypes from '../../actions'

export default function(state = initialState, action) {
    
    switch(action.type) {
        case ActionTypes.FETCH_EVENTS_REQUEST:            
            return Object.assign({}, state, { isFetching: true})
        case ActionTypes.FETCH_EVENTS_SUCCESS:
            return Object.assign({}, state, { isFetching: false, events: action.events})
        case ActionTypes.FETCH_EVENTS_FAIL:
            return Object.assign({}, state, { isFetching: false, error: action.error})
        default:
            return state
    }
}