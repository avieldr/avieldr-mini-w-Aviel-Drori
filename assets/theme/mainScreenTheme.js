const mainScreenDefaultTheme = {
    coinTileColors: {
        backgroundColor: 'white',
        shadowColor: '#000',
    },
    totalAmountTextColors: {
        color: 'white'
    },
    currenciesColors: {
        backgroundColor: '#F7F7F7',  
    },
    tilesText: {
        color: 'black'
    }
    
}

const mainScreenDarkTheme = {
    coinTileColors: {
        backgroundColor: '#A7A7A7',
        shadowColor: 'white',
    },
    totalAmountTextColors: {
        color: '#222222',
    },
    currenciesColors: {
        backgroundColor: '#646160',  
    },
    tilesText: {
        color: 'white'
    }
}

 
export default {
    light: mainScreenDefaultTheme,
    dark: mainScreenDarkTheme
}