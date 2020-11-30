import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, Image, ActivityIndicator } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { updateTimeoutInterval, setBalance } from '../actions'
import { mockRequestSell, mockRequestBuy } from '../api/_mock'
import DialogInput from '../components/DialogInput'
import { CURRENCY_CODES, CURRENCY_ICONS, CURRENCY_TYPES } from '../../assets/currencies'
import { SELL,
    BUY,
    SELL_DIALOG_MESSAGE,
    BUY_DIALOG_MESSAGE,
    SUCCESS_TITLE,
    FAILURE_TITLE,
    SELL_SUCCESS_MSG,
    SELL_FAILED_MSG,
    BUY_SUCCESS_MSG,
    BUY_FAILED_MSG,
    NEGATIVE_INPUT_MSG,
    NAN_INPUT_MSG
} from '../../assets/strings'

const ERR_NEGATIVE_INPUT = 1
const ERR_BALANCE_OVERFLOW_INPUT = 2
const ERR_NAN_INPUT = 3

const INITIAL_STATE = {
    isDialogVisible: false,
    op: '',
    message: '',
    dialogErrMessage: 0,
    waiting: false
}

const TIMEOUT_INTERVAL = 10000

const DetailScreen = (props) => {

    const { userBalance, currencies, updateTimeoutInterval, settings, setBalance, navigation } = props
    const [state, setState] = useState(INITIAL_STATE)
    
    useEffect(() => {
        const didBlurSubscription = navigation.addListener('didFocus', () => {
            if (settings.updateInterval !== TIMEOUT_INTERVAL) {
                updateTimeoutInterval(TIMEOUT_INTERVAL)
            }
        })
        return () => didBlurSubscription.remove()
    })
      
    const coinType = navigation.getParam('coin')
    const coinCode = CURRENCY_CODES[coinType]
    const balance = userBalance[coinType] || 0
    const rate = currencies.rates[coinType]
    const balanceDollars = rate * balance

    const getErrorMessage = (coinCode, balanceDollars) => {
        switch (state.dialogErrMessage) {
            case ERR_NEGATIVE_INPUT:
                return NEGATIVE_INPUT_MSG
            case ERR_BALANCE_OVERFLOW_INPUT:
                return `Selling amount cannot be higher than your current ${coinCode} balance:  $${balanceDollars.toFixed(4)}`
            case ERR_NAN_INPUT:
                return NAN_INPUT_MSG
            default:
                return ''
        }
    }

    const showAlertMessage = (title, message) => {
        Alert.alert(title, message, [{text: "OK"}], { cancelable: false })
    }

    const onSubmitPressed = async (inputText) => {
        const amount = Number(inputText)
        const cryptoAmount = amount / rate
        if (isNaN(amount)) {
            setState({ ...state, dialogErrMessage: ERR_NAN_INPUT })
        }
        else if (amount <= 0) {
            setState({ ...state, dialogErrMessage: ERR_NEGATIVE_INPUT })
        }
        else if (state.op === SELL && amount > balanceDollars){
            setState({ ...state, dialogErrMessage: ERR_BALANCE_OVERFLOW_INPUT})
        }
        else {
            setState({ ...state, isDialogVisible: false, dialogErrMessage: 0, waiting: true })
            try {
                const callback = state.op === SELL ? mockRequestSell : mockRequestBuy
                await callback(coinType, amount)
                const obj = Object.assign({}, userBalance)
                obj[coinType] = (userBalance[coinType] || 0) + (state.op === SELL ? -cryptoAmount : cryptoAmount)
                setBalance(obj)
                showAlertMessage(SUCCESS_TITLE, state.op === SELL ? SELL_SUCCESS_MSG : BUY_SUCCESS_MSG)
            }
            catch (e) {
                showAlertMessage(FAILURE_TITLE, (state.op === SELL ? SELL_FAILED_MSG : BUY_FAILED_MSG) + e)
            }
            setState({ ...state, waiting: false, isDialogVisible: false, dialogErrMessage: 0 })
        } 
    }

    return <View style={{flex: 1}}>
        <View style={styles.contentContainer}>
            <View style={styles.iconsContainer}>
                <Image source={CURRENCY_ICONS[coinType]} style={styles.icon}  />
                <Icon name='compare-arrows' type='material' size={70} color='#858787' containerStyle={styles.iconContainer}/>
                <Image source={CURRENCY_ICONS[CURRENCY_TYPES.DOLLAR]} style={styles.icon}  />
            </View>
            
            <Text style={styles.title}>Trade {coinCode}</Text>

            <View style={styles.infoContainer}>
                <Text style={styles.rate}>Rate: 1 {coinCode} @ ${rate.toFixed(2)}</Text>
                <Text style={styles.balance}>Your Balance: {balance.toFixed(2)} {coinCode} ~ ${balanceDollars.toFixed(2)}</Text>
            </View>
           
            <View style={styles.buttonsContainer}>
                <Button
                    buttonStyle={[styles.button, { backgroundColor: '#256299'}]} 
                    title={BUY}
                    icon={{ type: 'feather', name: 'arrow-up', color: 'white'}}
                    onPress={() => setState({ ...state, isDialogVisible: true, op: BUY, message: BUY_DIALOG_MESSAGE })}
                />
                <Button 
                    buttonStyle={[styles.button, { backgroundColor: '#8EA8C0' }]} 
                    title={SELL}
                    icon={{ type: 'feather', name: 'arrow-down', color: 'white'}}
                    onPress={() => setState({ ...state, isDialogVisible: true, op: SELL, message: SELL_DIALOG_MESSAGE })}
                />
            </View>
        </View>
        
        {state.waiting && <View style={styles.loadingIndicator}>
            <ActivityIndicator animating={state.waiting} size="large" color='#39C1A8'/>
        </View>}
        
        <DialogInput isDialogVisible={state.isDialogVisible}
            title={`${state.op} ${coinCode}`}
            errMessage={() => getErrorMessage(coinCode, balanceDollars)}
            hintInput ={state.message}
            submitInput={onSubmitPressed}
            closeDialog={ () => {setState({ ...state, isDialogVisible: false, dialogErrMessage: 0 })}}
            textInputProps={{keyboardType: 'number-pad'}}
            errMessageColor='red'
        />
    </View>
}

const styles = StyleSheet.create({
    button: {
        width: '80%',
        alignSelf: 'center',
        minHeight: 60
    },
    iconsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B7D5F0',
        margin: 20,
        borderRadius: 50
    },
    icon: {
        height: 70,
        width: 70,
        backgroundColor: 'transparent',
        marginHorizontal: 10
    },
    infoContainer: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center'
    },
    contentContainer: { 
        flex: 1,
    },
    title: {
        fontSize: 45,
        textAlign: 'center',
        color: 'black',
        marginVertical: 10,
        fontWeight: 'bold'
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: 20
    },
    iconContainer: {
        alignSelf: 'center'
    },
    balance: {
        fontSize: 18,
        color: '#2B6EAD'
    },
    rate: {
        fontSize: 18,
        color: '#858787',
    },
    loadingIndicator: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
        opacity: 0.6,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

DetailScreen.navigationOptions = ({
    title: 'Buy / Sell Crypto',
})

function mapStateToProps({ user_balance, currencies, settings }) {
    return { userBalance: user_balance, currencies: currencies, settings: settings }
}

export default connect(mapStateToProps, { updateTimeoutInterval, setBalance })(DetailScreen)