import { StyleSheet, Text } from 'react-native'
import React from 'react'
import styling from '../utils/StylingUtils'

const CustomText = ({ children, style }) => {
    return <Text style={[styles.text, style]}>{children}</Text>
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: styling.colors.white,
    },
})

export default CustomText