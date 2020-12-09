import {
    SET_UPDATE_INTERVAL,
    SET_LAST_MINIMIZED
} from './types'

export const updateTimeoutInterval = (interval) => {
    return {
        payload: interval,
        type: SET_UPDATE_INTERVAL
    }
}

export const updateLastMinimized = (date) => {
    return {
        payload: date,
        type: SET_LAST_MINIMIZED
    }
}

