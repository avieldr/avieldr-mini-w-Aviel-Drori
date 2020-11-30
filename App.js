import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Icon } from 'react-native-elements'
import { Provider } from 'react-redux'
import store from './src/store'

import AppLoadingScreen from './src/screens/AppLoadingScreen'
import MainScreen from './src/screens/MainScreen'
import SettingsScreen from './src/screens/SettingsScreen'
import DetailScreen from './src/screens/DetailScreen'

const mainFlow = createStackNavigator({
  main: MainScreen,
  detail: DetailScreen
}, {
  initialRouteName: 'main',
  navigationOptions: {
    title: 'Wallet',
    tabBarIcon: ({tintColor}) => <Icon name="ios-wallet" type='ionicon' size={25} color={tintColor}/>
  }
})

const AppBodyFlow = createBottomTabNavigator({
  main: mainFlow,
  settings: SettingsScreen,
},
{
  initialRouteName: "main",
  tabBarOptions: {
    activeTintColor: '#3FDCB4',
    labelStyle: { fontSize: 12 },
  }
})

const switchNavigator = createSwitchNavigator({
  appLoading: AppLoadingScreen,
  body: AppBodyFlow,
})

const App = createAppContainer(switchNavigator)
export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}