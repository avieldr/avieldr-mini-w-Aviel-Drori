import {
    SET_UPDATE_INTERVAL
} from './types'

export const updateTimeoutInterval = (interval) => {
    return {
        payload: interval,
        type: SET_UPDATE_INTERVAL
    }
}

