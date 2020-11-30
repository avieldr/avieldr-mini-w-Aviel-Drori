import { combineReducers } from 'redux'
import currencies from './currency_reducer'
import user_balance from './user_balance_reducer'
import settings from './settings_reducer'

export default combineReducers({
    currencies, user_balance, settings
})