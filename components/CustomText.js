import { StyleSheet, Text } from 'react-native'
import React from 'react'

const CustomText = ({ children, style }) => {
    return <Text style={[styles.text, style]}>{children}</Text>
}

const styles = StyleSheet.create({})

export default CustomText