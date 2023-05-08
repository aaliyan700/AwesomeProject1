import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
const ParentDashboard = () => {
    const fetchDataFromStorage = async () => {
        try {
            const data = await AsyncStorage.getItem('data'); // Retrieve data from AsyncStorage using the key
            if (data) {
                console.log('Data retrieved from AsyncStorage:', JSON.parse(data));
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
        <View>
            <Text>ParentDashboard</Text>
        </View>
    )
}

export default ParentDashboard

const styles = StyleSheet.create({})