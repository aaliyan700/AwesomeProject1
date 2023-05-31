import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';
const ParentDashboard = () => {
    const [userInfo, setUserInfo] = useState({});
    const fetchDataFromStorage = async () => {
        try {
            const data = await AsyncStorage.getItem('data'); // Retrieve data from AsyncStorage using the key
            if (data) {
                console.log('Data retrieved from AsyncStorage:', JSON.parse(data));
                setUserInfo(data);
                //setUserInfo(JSON.parse(data));
                // Do something with the retrieved data
            } else {
                console.log('No data found in AsyncStorage');
                // Handle case when no data is found in AsyncStorage
            }
        } catch (error) {
            console.error('Error retrieving data from AsyncStorage:', error);
        }
    };
    useEffect(() => {
        fetchDataFromStorage();
    }, [])
    return (
        <View style={styles.container}>
            <Button mode="contained" style={styles.btn}>Attendance</Button>
            <Button mode="contained" style={styles.btn}>Finance</Button>
            <Button mode="contained" style={styles.btn}>Results</Button>
        </View>
    )
}

export default ParentDashboard

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    btn:
    {
        backgroundColor: '#099e78',
        marginHorizontal: 20,
        marginVertical: 10
    }
})