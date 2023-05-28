import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const InstallmentDetail = ({ route }) => {
    const { item } = route.params;
    console.log("data", item);
    return (
        <View>
            <Text>InstallmentDetail</Text>
        </View>
    )
}

export default InstallmentDetail

const styles = StyleSheet.create({})