import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    UPDATE_USER_BALANCE
} from './types'

export const setBalance = (balance) => async dispatch => {
    try {
        await AsyncStorage.setItem('balance', JSON.stringify(balance))
        dispatch({ type: UPDATE_USER_BALANCE, payload: balance })
    } catch (e) {
        throw e
    }
}


