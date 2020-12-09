import React, { useRef, useState, useEffect } from "react"
import { AppState, StyleSheet, Text, View } from "react-native"
import { Button } from 'react-native-elements'

const Blocker = (props) => {
  
    const { onButtonPress } = props

    return (
        <View style={styles.container}>
            <Button 
                title='press'
                onPress={onButtonPress}
            />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: '#3FDCB4',
    justifyContent: "center",
    alignItems: "center",
  },
})

export default Blocker