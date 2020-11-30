import React, { useRef, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, ScrollView, Animated } from 'react-native'
import { CURRENCY_TYPES, CURRENCY_ICONS, CURRENCY_DISPLAY_NAME, CURRENCY_CODES } from '../../assets/currencies'
import { connect } from 'react-redux'
import { fetchCurrencies, updateTimeoutInterval } from '../actions'

const COINS_TO_DISPLAY = [
    CURRENCY_TYPES.BITCOIN,
    CURRENCY_TYPES.ETHER,
    CURRENCY_TYPES.LITECOIN,
    CURRENCY_TYPES.NEO,
    CURRENCY_TYPES.COSMOS
]

const TIMEOUT_INTERVAL = 30000

const MainScreen = (props) => {

    const intervalRef = useRef()
    const { userBalance, currencies, settings, fetchCurrencies, updateTimeoutInterval, navigation } = props
    const { rates } = currencies 
    const animatedText = new Animated.ValueXY({ x: 0, y: 100 })

    useEffect(() => {
        const didBlurSubscription = navigation.addListener('didFocus', () => {
            if (settings.updateInterval !== TIMEOUT_INTERVAL) {
                updateTimeoutInterval(TIMEOUT_INTERVAL)
            }
        })
        return () => didBlurSubscription.remove()
    })

    useEffect(() => {
        setNewInterval(settings.updateInterval)
    }, [settings.updateInterval]);

    useEffect(() => {
        Animated.spring(animatedText, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false
        }).start()
    }, [currencies, userBalance])

    const setNewInterval = (intervalMS) => {
        clearInterval(intervalRef.current)
        const id = setInterval(() => {
            fetchCurrencies()
        }, intervalMS
        )
        intervalRef.current = id;   
        return () => clearInterval(intervalRef.current);
    }

    const totalAmountComponent = () => {
        const reducer = (accumulator, key) => accumulator + (userBalance[key] * rates[key])
        return <View style={styles.totalAmount}>
            <ImageBackground source={require('../../assets/images/background1.jpg')} style={styles.image}>
                <Animated.View style={animatedText.getLayout()} >
                    <Text style={styles.totalAmountText}>${Object.keys(userBalance).reduce(reducer, 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                </Animated.View>
            </ImageBackground>
        </View>
    }

    const renderCoinTile = coin => {
        return <TouchableOpacity
            activeOpacity={0.8}
            key={coin}
            style={styles.coinTile}
            onPress={() => {
                navigation.navigate('detail', { coin: coin })
                }}
        >
            <View style={styles.coinTileTitle}>
                <Image source={CURRENCY_ICONS[coin]} style={styles.tileIcon} />
                <Text>{CURRENCY_DISPLAY_NAME[coin]}</Text>
            </View>
            <View style={styles.coinTileData}>
                <Text>${parseFloat(((userBalance[coin] || 0) * rates[coin]).toFixed(2))}</Text>
                <Text>{parseFloat((userBalance[CURRENCY_TYPES[coin]] || 0).toFixed(4)) } {CURRENCY_CODES[coin]}</Text>
            </View>
        </TouchableOpacity>
    }

    const currenciesComponent = () => {
    return <View style={styles.currencies}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.contentContainerStyle}>
                {COINS_TO_DISPLAY.map((coin, index) => renderCoinTile(coin))}
            </ScrollView>
        </View>
    }

    return <View style={styles.container}>
        {totalAmountComponent()}
        {currenciesComponent()}
    </View>
}

MainScreen.navigationOptions = {
    headerShown: false
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 24
    },
    totalAmount: {
        flex: 5,
        flexDirection: "column",
    },
    totalAmountText: {
        color: "white",
        fontSize: 50,
        fontWeight: "bold",
        textAlign: "center",
    },
    currencies: {
        flex: 9,
        backgroundColor: '#F7F7F7',        
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    coinTile: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        alignItems: 'center',
        marginTop: 16,
        minHeight: 90,
        width: '90%',
        borderRadius: 20,
        backgroundColor: 'white',
        shadowColor: '#000',
        elevation: 3,
    },
    tileIcon: {
        height: 35,
        width: 35,
        marginRight: 20
    },
    coinTileTitle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    coinTileData: {
        flex: 1,
        alignItems: 'flex-end'
    },
    contentContainerStyle: {
        alignItems: 'center',
        paddingBottom: 24
    }
})

function mapStateToProps({ user_balance, currencies, settings }) {
    return { userBalance: user_balance, currencies: currencies, settings: settings }
}

export default connect(mapStateToProps, { fetchCurrencies, updateTimeoutInterval })(MainScreen)