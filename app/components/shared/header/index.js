import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const styles = {
    container: {
        flex: 0.08,
        backgroundColor: '#2c3e50',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: 'white'
    }
}

const Header = ({ title }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

export default Header