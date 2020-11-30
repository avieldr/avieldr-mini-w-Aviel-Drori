import {
    FETCH_CURRENCIES,
} from './types'

import { mockFetchCurrentRates } from '../api/_mock'
  
export const fetchCurrencies = () => async dispatch => {
    try {
        const currencies = await mockFetchCurrentRates()
        if (currencies !== null) {
            dispatch({ type: FETCH_CURRENCIES, payload: currencies })
        } else {
            // on real api call handle this with retry/ raise exception
        }
    } catch(e) {
        // on real api call handle this with retry/ raise exception
    }
}


