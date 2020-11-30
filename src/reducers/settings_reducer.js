import {
    SET_UPDATE_INTERVAL
} from '../actions/types'

const INITIAL_STATE = {
    updateInterval: 30000
}

export default function(state=INITIAL_STATE, action) {
    switch (action.type) {
        case SET_UPDATE_INTERVAL:
            return { updateInterval: action.payload }
        default:
            return state
    }
}