import {
    SET_UPDATE_INTERVAL,
    SET_LAST_MINIMIZED
} from '../actions/types'

const INITIAL_STATE = {
    updateInterval: 30000,
    lastMinimized: Date.now()
}

export default function(state=INITIAL_STATE, action) {
    switch (action.type) {
        case SET_UPDATE_INTERVAL:
            return { ...state, updateInterval: action.payload }
        case SET_LAST_MINIMIZED:
            return { ...state, lastMinimized: action.payload }
        default:
            return state
    }
}