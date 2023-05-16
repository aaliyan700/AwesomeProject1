import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
const Finance = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <View style={styles.btnContainer}>
                <Pressable style={styles.pressBtn} onPressIn={() => navigation.navigate("FineDetail")}>
                    <Icon name="notifications" size={30} color='#fff' />
                    <Text style={styles.fontBtn}>Fine</Text>
                </Pressable>
                <Pressable style={styles.pressBtn} onPressIn={() => navigation.navigate("FinancialAssistance")}>
                    <Icon name="notifications" size={30} color='#fff' />
                    <Text style={styles.fontBtn}>FinancialAssistance</Text>
                </Pressable>
                <Pressable style={styles.pressBtn} onPressIn={() => navigation.navigate("FeeDetails")} >
                    <Icon name="notifications" size={30} color='#fff' />
                    <Text style={styles.fontBtn}>Fee</Text>
                </Pressable>
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
    },
    pressBtn:
    {
        backgroundColor: "#099e78",
        padding: 20,
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

