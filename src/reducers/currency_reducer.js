import {
    FETCH_CURRENCIES
} from '../actions/types'


const INITIAL_STATE = {
    updateInterval: 30000
}

export default function(state=INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_CURRENCIES:
            return { ...state, rates: action.payload }
        default:
            return state
    }
}