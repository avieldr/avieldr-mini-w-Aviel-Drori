import {
    UPDATE_USER_BALANCE
} from '../actions/types'

const INITIAL_STATE = {}

export default function(state=INITIAL_STATE, action) {
    switch (action.type) {
        case UPDATE_USER_BALANCE:
            return action.payload
        default:
            return state
    }
}