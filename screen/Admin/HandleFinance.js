import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
const HandleFinance = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Button mode="contained" color='#099e78' style={{ padding: 10, margin: 10 }} onPress={() => navigation.navigate('StudentList')}>Fee</Button>
            <Button mode="contained" color='#099e78' style={{ padding: 10, margin: 10 }} onPress={() => navigation.navigate("FinancialAssitanceRequest")} >Financial Assistance</Button>
            <Button mode="contained" color='#099e78' style={{ padding: 10, margin: 10 }} onPress={() => navigation.navigate("FineList")}>Fine</Button>
        </View>
    )
}

export default HandleFinance

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center'
    }
})