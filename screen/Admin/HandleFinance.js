import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons';
const HandleFinance = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.btnContainer}>
                <Pressable style={styles.pressBtn} onPressIn={() => navigation.navigate('FineList')}>
                    <Icon name="notifications" size={30} color='#fff' />
                    <Text style={styles.fontBtn}>Fine</Text>
                </Pressable>
                <Pressable style={styles.pressBtn} onPressIn={() => navigation.navigate("FinancialAssitanceRequest")}>
                    <Icon name="notifications" size={30} color='#fff' />
                    <Text style={styles.fontBtn}>FinancialAssistance</Text>
                </Pressable>
                <Pressable style={styles.pressBtn} onPressIn={() => navigation.navigate('StudentList')} >
                    <Icon name="notifications" size={30} color='#fff' />
                    <Text style={styles.fontBtn}>Fee</Text>
                </Pressable>
            </View>
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
    },
    btnContainer:
    {
        justifyContent: 'center',
    },
    pressBtn:
    {
        backgroundColor: "#099e78",
        padding: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        marginVertical: 10,
        flexDirection: 'row',
    },
    fontBtn:
    {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        justifyContent: 'center'
    }
})