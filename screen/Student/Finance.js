import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
const Finance = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.btnContainer}>
                <Button style={styles.btn} color='white' onPress={() => navigation.navigate("FineDetail")}>Fine</Button>
                <Button style={styles.btn} color='white' onPress={() => navigation.navigate("FeeDetails")}>Fee</Button>
                <Button style={styles.btn} color='white' onPress={() => navigation.navigate("FinancialAssistance")}>Financial Assistance</Button>
            </View>
        </View>
    )
}

export default Finance

const styles = StyleSheet.create({
    btn:
    {
        marginHorizontal: 50,
        marginTop: 10,
        padding: 10,
        backgroundColor: '#099e78',
        borderRadius: 5
    },
    btnText:
    {
        textAlign: 'center',
        fontSize: 20,
        color: 'white',

    },
    container:
    {
        flex: 1,
        backgroundColor: 'white'
    },
    btnContainer:
    {
        justifyContent: 'center',
        marginTop: '50%'
    }
})

