import React from 'react'
import { AppLoading } from 'expo';
import { connect } from 'react-redux'
import { fetchCurrencies, setBalance } from '../actions'
import AsyncStorage from '@react-native-async-storage/async-storage'


const AppLoadingScreen = (props) => {

    const { fetchCurrencies, setBalance } = props

    const getUserBalance = async () => {
        try {
            const balance = await AsyncStorage.getItem('balance')
            if (balance !== null) {
                parsedObj = JSON.parse(balance)
                setBalance(parsedObj)
            }
        } catch(e) {
            console.log(e)
        }
    }

    const _loadAssetsAsync = async () => {
        await fetchCurrencies()
        await getUserBalance()
    }

    return (
        <AppLoading
        startAsync={_loadAssetsAsync}
        onFinish={() => props.navigation.navigate('body')}
        onError={console.warn}
        />
    )
}

export default connect(null, { fetchCurrencies, setBalance })(AppLoadingScreen)
