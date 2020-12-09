import React, { useState, useEffect } from 'react'
import { Appearance, useColorScheme } from 'react-native'
import { getTheme } from '../../assets/theme'


// set default colour scheme from OS
const osTheme = Appearance.getColorScheme()

// initiate context
export const ManageThemeContext = React.createContext()

// define useTheme hook for functional components
export const useTheme = () => React.useContext(ManageThemeContext);

// initiate context provider

export const ThemeManager = ({ children }) => {

    const [state, setState] = useState({ themeType: 'light', modeManual: false })
    const osTheme = useColorScheme()

    const toggleSelectionMode = () => {
      setState({ ...state, modeManual: !state.modeManual })
    }

    const toggleTheme = async () => {
        if (!state.modeManual) return
        state.themeType === 'light'
        ? setState({ ...state, themeType: 'dark' })
        : setState({ ...state, themeType: 'light' })
    }

    const selectedTheme = state.modeManual ? state.themeType : osTheme

    return (
      <ManageThemeContext.Provider value={{
        themeType: selectedTheme,
        themeValue: getTheme(selectedTheme),
        toggleSelectionMode: toggleSelectionMode,
        toggleTheme: toggleTheme,
        selectionMode: state.themeType
      }}>
        {children}
      </ManageThemeContext.Provider>
    )
}

export default ThemeManager;